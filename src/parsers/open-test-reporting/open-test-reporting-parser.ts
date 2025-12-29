import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {
  OtrDocument,
  OtrHierarchyDocument,
  OtrEventsDocument,
  OtrHierarchyNode,
  OtrStartedEvent,
  OtrFinishedEvent,
  OtrResult,
  OtrStatus
} from './open-test-reporting-types'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

/**
 * Parser for Open Test Reporting format (https://github.com/ota4j-team/open-test-reporting)
 * Supports both hierarchical and event-based XML formats with auto-detection.
 */
export class OpenTestReportingParser implements TestParser {
  constructor(readonly options: ParseOptions) {}

  async parse(filePath: string, content: string): Promise<TestRunResult> {
    const report = await this.parseXml(filePath, content)

    // Auto-detect format based on root element
    if (this.isHierarchyDocument(report)) {
      return this.parseHierarchy(filePath, report)
    } else if (this.isEventsDocument(report)) {
      return this.parseEvents(filePath, report)
    }

    throw new Error(
      `Unknown open-test-reporting format at ${filePath}. Expected root element 'execution' (hierarchy) or 'events' (event-based).`
    )
  }

  private async parseXml(filePath: string, content: string): Promise<OtrDocument> {
    try {
      // xml2js options to handle namespaced elements
      return await parseStringPromise(content, {
        explicitArray: true,
        tagNameProcessors: [this.stripNamespacePrefix]
      })
    } catch (e) {
      throw new Error(`Invalid XML at ${filePath}\n\n${e}`)
    }
  }

  // Strip namespace prefixes (e.g., "h:execution" -> "execution")
  private stripNamespacePrefix(name: string): string {
    const colonIndex = name.indexOf(':')
    return colonIndex !== -1 ? name.substring(colonIndex + 1) : name
  }

  private isHierarchyDocument(doc: OtrDocument): doc is OtrHierarchyDocument {
    return 'execution' in doc
  }

  private isEventsDocument(doc: OtrDocument): doc is OtrEventsDocument {
    return 'events' in doc
  }

  // ============================================================================
  // Hierarchy Format Parsing
  // ============================================================================

  private parseHierarchy(filePath: string, doc: OtrHierarchyDocument): TestRunResult {
    const execution = doc.execution
    const roots = execution.root ?? []

    // Each root node becomes a test suite
    const suites = roots.map(root => this.parseHierarchyRoot(root))

    // Calculate total time from all roots
    const totalTime = roots.reduce((sum, root) => sum + this.parseDuration(root.$.duration), 0)

    return new TestRunResult(filePath, suites, totalTime)
  }

  private parseHierarchyRoot(node: OtrHierarchyNode): TestSuiteResult {
    const name = node.$.name
    const time = this.parseDuration(node.$.duration)
    const children = node.child ?? []

    // Convert children to groups
    // If all children are leaf nodes (no further children), create single group
    // Otherwise, children with their own children become groups
    const groups = this.buildGroups(children)

    return new TestSuiteResult(name, groups, time)
  }

  private buildGroups(nodes: OtrHierarchyNode[]): TestGroupResult[] {
    if (nodes.length === 0) {
      return []
    }

    // Check if any node has children
    const hasNestedNodes = nodes.some(n => n.child && n.child.length > 0)

    if (!hasNestedNodes) {
      // All nodes are leaf tests - create a single unnamed group
      const tests = nodes.map(n => this.nodeToTestCase(n))
      return [new TestGroupResult('', tests)]
    }

    // Nodes with children become groups, leaf nodes go to default group
    const groups: TestGroupResult[] = []
    const defaultGroupTests: TestCaseResult[] = []

    for (const node of nodes) {
      if (node.child && node.child.length > 0) {
        // This node is a group - collect all leaf descendants as test cases
        const tests = this.collectLeafNodes(node.child).map(n => this.nodeToTestCase(n))
        groups.push(new TestGroupResult(node.$.name, tests))
      } else {
        // Leaf node goes to default group
        defaultGroupTests.push(this.nodeToTestCase(node))
      }
    }

    if (defaultGroupTests.length > 0) {
      groups.unshift(new TestGroupResult('', defaultGroupTests))
    }

    return groups
  }

  private collectLeafNodes(nodes: OtrHierarchyNode[]): OtrHierarchyNode[] {
    const leaves: OtrHierarchyNode[] = []
    for (const node of nodes) {
      if (node.child && node.child.length > 0) {
        leaves.push(...this.collectLeafNodes(node.child))
      } else {
        leaves.push(node)
      }
    }
    return leaves
  }

  private nodeToTestCase(node: OtrHierarchyNode): TestCaseResult {
    const name = node.$.name
    const time = this.parseDuration(node.$.duration)
    const result = this.getExecutionResult(node.result)
    const error = this.getTestCaseError(node.result)

    return new TestCaseResult(name, result, time, error)
  }

  // ============================================================================
  // Event-Based Format Parsing
  // ============================================================================

  private parseEvents(filePath: string, doc: OtrEventsDocument): TestRunResult {
    const events = doc.events
    const startedEvents = events.started ?? []
    const finishedEvents = events.finished ?? []

    // Build a map of id -> started event
    const startedMap = new Map<string, OtrStartedEvent>()
    for (const started of startedEvents) {
      startedMap.set(started.$.id, started)
    }

    // Build a map of id -> finished event
    const finishedMap = new Map<string, OtrFinishedEvent>()
    for (const finished of finishedEvents) {
      finishedMap.set(finished.$.id, finished)
    }

    // Build tree structure from events
    const tree = this.buildEventTree(startedEvents, finishedMap)

    // Convert tree to hierarchy and parse
    const suites = tree.map(node => this.eventNodeToSuite(node, startedMap, finishedMap))

    // Calculate total time
    const totalTime = suites.reduce((sum, suite) => sum + suite.time, 0)

    return new TestRunResult(filePath, suites, totalTime)
  }

  private buildEventTree(
    startedEvents: OtrStartedEvent[],
    finishedMap: Map<string, OtrFinishedEvent>
  ): EventTreeNode[] {
    // Find root events (no parentId)
    const roots: EventTreeNode[] = []
    const nodeMap = new Map<string, EventTreeNode>()

    // Create all nodes
    for (const started of startedEvents) {
      const finished = finishedMap.get(started.$.id)
      nodeMap.set(started.$.id, {
        id: started.$.id,
        name: started.$.name,
        startTime: started.$.time,
        endTime: finished?.$.time,
        parentId: started.$.parentId,
        result: finished?.result,
        children: []
      })
    }

    // Build parent-child relationships
    for (const node of nodeMap.values()) {
      if (node.parentId) {
        const parent = nodeMap.get(node.parentId)
        if (parent) {
          parent.children.push(node)
        }
      } else {
        roots.push(node)
      }
    }

    return roots
  }

  private eventNodeToSuite(
    node: EventTreeNode,
    startedMap: Map<string, OtrStartedEvent>,
    finishedMap: Map<string, OtrFinishedEvent>
  ): TestSuiteResult {
    const time = this.calculateEventNodeDuration(node)
    const groups = this.buildGroupsFromEventTree(node.children)

    return new TestSuiteResult(node.name, groups, time)
  }

  private buildGroupsFromEventTree(nodes: EventTreeNode[]): TestGroupResult[] {
    if (nodes.length === 0) {
      return []
    }

    const hasNestedNodes = nodes.some(n => n.children.length > 0)

    if (!hasNestedNodes) {
      const tests = nodes.map(n => this.eventNodeToTestCase(n))
      return [new TestGroupResult('', tests)]
    }

    const groups: TestGroupResult[] = []
    const defaultGroupTests: TestCaseResult[] = []

    for (const node of nodes) {
      if (node.children.length > 0) {
        const tests = this.collectLeafEventNodes(node.children).map(n => this.eventNodeToTestCase(n))
        groups.push(new TestGroupResult(node.name, tests))
      } else {
        defaultGroupTests.push(this.eventNodeToTestCase(node))
      }
    }

    if (defaultGroupTests.length > 0) {
      groups.unshift(new TestGroupResult('', defaultGroupTests))
    }

    return groups
  }

  private collectLeafEventNodes(nodes: EventTreeNode[]): EventTreeNode[] {
    const leaves: EventTreeNode[] = []
    for (const node of nodes) {
      if (node.children.length > 0) {
        leaves.push(...this.collectLeafEventNodes(node.children))
      } else {
        leaves.push(node)
      }
    }
    return leaves
  }

  private eventNodeToTestCase(node: EventTreeNode): TestCaseResult {
    const time = this.calculateEventNodeDuration(node)
    const result = this.getExecutionResult(node.result)
    const error = this.getTestCaseError(node.result)

    return new TestCaseResult(node.name, result, time, error)
  }

  private calculateEventNodeDuration(node: EventTreeNode): number {
    if (!node.startTime || !node.endTime) {
      return 0
    }
    const start = new Date(node.startTime).getTime()
    const end = new Date(node.endTime).getTime()
    return Math.max(0, end - start)
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * Parse ISO 8601 duration string to milliseconds.
   * Format: PT[n]H[n]M[n]S or PT[n]S (e.g., "PT0.013404S", "PT1H30M45.5S")
   */
  private parseDuration(duration?: string): number {
    if (!duration) {
      return 0
    }

    // Match ISO 8601 duration: PT0H0M0.123S or PT0.123S
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/)
    if (!match) {
      return 0
    }

    const hours = parseFloat(match[1] || '0')
    const minutes = parseFloat(match[2] || '0')
    const seconds = parseFloat(match[3] || '0')

    return (hours * 3600 + minutes * 60 + seconds) * 1000
  }

  /**
   * Map OTR status to TestExecutionResult
   */
  private getExecutionResult(results?: OtrResult[]): TestExecutionResult {
    if (!results || results.length === 0) {
      return undefined
    }

    const status = results[0].$?.status
    switch (status) {
      case 'SUCCESSFUL':
        return 'success'
      case 'SKIPPED':
        return 'skipped'
      case 'ABORTED':
      case 'FAILED':
      case 'ERRORED':
        return 'failed'
      default:
        return undefined
    }
  }

  /**
   * Extract error information from result
   */
  private getTestCaseError(results?: OtrResult[]): TestCaseError | undefined {
    if (!this.options.parseErrors) {
      return undefined
    }

    if (!results || results.length === 0) {
      return undefined
    }

    const result = results[0]
    const status = result.$?.status

    // Only extract error for failure statuses
    if (status !== 'FAILED' && status !== 'ERRORED' && status !== 'ABORTED') {
      return undefined
    }

    const reason = result.reason?.[0]
    if (!reason) {
      return undefined
    }

    return {
      message: reason,
      details: reason
    }
  }
}

// Internal type for building event tree
interface EventTreeNode {
  id: string
  name: string
  startTime: string
  endTime?: string
  parentId?: string
  result?: OtrResult[]
  children: EventTreeNode[]
}
