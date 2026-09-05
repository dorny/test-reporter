import {ParseOptions, TestParser} from '../../test-parser.js'
import * as core from '@actions/core'
import {
  TestCaseError,
  TestCaseResult,
  TestExecutionResult,
  TestGroupResult,
  TestRunResult,
  TestSuiteResult
} from '../../test-results.js'
import {UnrealReport, UnrealTest} from './unreal-json-types.js'
import {getBasePath, normalizeFilePath} from '../../utils/path-utils.js'

export const EMPTY_SUITE_NAME = 'EMPTY_SUITE_NAME'
export const EMPTY_GROUP_NAME = 'EMPTY_GROUP_NAME'
export const EMPTY_TEST_NAME = 'EMPTY_TEST_NAME'

export function convertUnrealState(unrealState: UnrealTest['state']): TestExecutionResult | undefined {
  if (['Success', 'Skipped', 'Fail'].indexOf(unrealState) === -1) {
    throw new Error(`Got unexpected state in Unreal test: "${unrealState}"`)
  }
  switch (unrealState) {
    case 'Success':
      return 'success'
    case 'Skipped':
      return 'skipped'
    case 'Fail':
      return 'failed'
  }
}

function convertUnrealTest(unrealTest: UnrealTest): TestCaseResult {
  const {testDisplayName, duration, state, entries} = unrealTest
  let error: TestCaseError | undefined
  if (unrealTest.errors > 0 && entries.length > 0) {
    const errorEntries = entries.filter(e => e.event.type === 'Error')
    const { filename: path, lineNumber: line, event: { message }, timestamp } = errorEntries[0];
    error = {
      path,
      line,
      message,
      details: `${timestamp} - Error: ${message}`
    }
  }
  return new TestCaseResult(testDisplayName, convertUnrealState(state), duration, error)
}

class TestSuite {
  constructor(
    readonly suiteName: string,
    readonly pathMap: TestPathsMapElement,
    readonly groups?: TestGroup[]
  ) {}
  getResults(): TestGroupResult[] {
    const results: TestGroupResult[] = []
    if (this.groups) {
      for (const g of this.groups) {
        results.push(new TestGroupResult(g.groupName, g.testCaseResults))
      }
    } else {
      // If the test run has a single test, like "MyTest" with no "." separators,
      // then the suite will have a test with "MyTest" as the name
      if (this.pathMap.isLeaf() && this.pathMap.test) {
        const t = convertUnrealTest(this.pathMap.test)
        results.push(new TestGroupResult('DEFAULT', [t]))
      }
    }
    return results
  }
}

class TestGroup {
  private _groupName: string
  constructor(
    groupName: string,
    readonly pathMap: TestPathsMapElement
  ) {
    this._groupName = groupName
  }
  get groupName(): string {
    return this._groupName
  }
  set groupName(newName: string) {
    this._groupName = newName
  }
  get tests(): TestCase[] {
    return this.pathMap.childElements
      .filter(el => el.test !== undefined)
      .map((el: TestPathsMapElement) => {
        return new TestCase(el.elementName, <UnrealTest>el.test)
      })
  }
  get testCaseResults(): TestCaseResult[] {
    return this.tests.map(t => t.getResult()).filter(t => t !== undefined)
  }
}

class TestCase {
  constructor(
    readonly caseName: string,
    readonly testData: UnrealTest
  ) {}
  getResult(): TestCaseResult | undefined {
    return convertUnrealTest(this.testData)
  }
}

/**
 * Models a node of the tree of Unreal Engine tests
 */
export class TestPathsMapElement {
  public readonly children: TestPathsMapElement[]
  public test?: UnrealTest
  constructor(readonly elementName: string) {
    if (elementName === undefined || elementName === null || elementName.length === 0) {
      throw Error('Tried to create a test element with empty name - programmer error')
    }
    this.children = []
  }

  private firstChild(): TestPathsMapElement | undefined {
    return this.children.at(0)
  }
  isLeaf(): boolean {
    return this.children.length === 0
  }
  isTrunk(): boolean {
    return this.children.length === 1
  }
  private isBranchPoint(): boolean {
    return this.children.length > 1
  }
  hasTests(): boolean {
    for (const c of this.children) {
      if (c.test !== undefined) {
        return true
      }
    }
    return false
  }

  /**
   * Create groups from all nodes including this, and those
   * below it, up to but not including the leaf (test) nodes.
   * If this is a suite node, don't include it.
   * Don't call this on leaf node. That's an error.
   */
  findGroups(): TestGroup[] {
    const f = this.findGroupNode()
    if (f === this) {
      const suite = this.findSuiteName().split(/\./)
      return f.groups(suite) ?? []
    }
    return f?.groups() ?? []
  }

  private groups(suite?: string[]): TestGroup[] {
    if (this.isLeaf()) throw Error('programmer error')
    const accGroups: TestGroup[] = []
    const suiteEl = suite?.shift()
    const nonLeafChildren = this.children.filter(c => !c.isLeaf())
    for (const c of nonLeafChildren) {
      const childGroups = c.groups(suite)
      for (const g of childGroups) {
        if (this.elementName !== suiteEl) {
          g.groupName = `${this.elementName}.${g.groupName}`
        }
        accGroups.push(g)
      }
    }
    if (this.hasTests() && this.elementName !== suiteEl) {
      accGroups.push(new TestGroup(this.elementName, this))
    }
    return accGroups
  }

  /**
   * Walk from this node down and find all group names
   * including this, and below it, not including the leaf nodes.
   * Don't call this on leaf node. That's an error.
   */
  findGroupNames(): string[][] {
    const f = this.findGroupNode()
    if (f === this) {
      const suite = this.findSuiteName().split(/\./)
      return f.groupNames(suite) ?? []
    }
    return f?.groupNames() ?? []
  }

  private groupNames(suite?: string[]): string[][] {
    if (this.isLeaf()) throw Error('programmer error')
    const accGroupNames: string[][] = []
    let thisAdded = false
    const suiteEl = suite?.shift()
    for (const c of this.children) {
      if (!c.isLeaf()) {
        const names = c.groupNames(suite)
        for (const nm of names) {
          if (this.elementName !== suiteEl) {
            nm.unshift(this.elementName)
          }
          accGroupNames.push(nm)
        }
      } else {
        if (!thisAdded && this.elementName !== suite?.at(0)) {
          accGroupNames.push([this.elementName])
          thisAdded = true
        }
      }
    }
    return accGroupNames
  }

  /**
   * Walk depth-first down the tree trunk to either the first leaf
   * or to the first branch point and return the element names.
   * Can be an empty array.
   */
  suiteName(): string[] {
    const suiteNameArray: string[] = []
    if (!this.isTrunk()) return suiteNameArray
    suiteNameArray.push(this.elementName)
    const el = this.firstChild()
    if (el?.isLeaf()) return suiteNameArray
    const names = el?.suiteName() ?? []
    suiteNameArray.push(...names)
    return suiteNameArray
  }

  findTrunkGroup(): TestPathsMapElement | undefined {
    // walk down the trunk to the first branch point
    if (this.firstChild()?.isLeaf()) return this
    if (this.isTrunk()) {
      return this.firstChild()?.findTrunkGroup()
    }
  }

  /**
   * Find the name for this suite. This should be called on a top-level
   * element, that is root.childElements only.
   */
  findSuiteName(): string {
    const suiteName = this.suiteName()
    return suiteName.length === 0 ? this.elementName : suiteName.join('.')
  }

  /**
   * Walk depth-first down the tree trunk to the first branch point
   * and return the element. Can be an undefined.
   */
  findGroupNode(): TestPathsMapElement | undefined {
    if (this.isLeaf()) return undefined
    if (this.isBranchPoint()) {
      return this
    }
    // walk down the trunk to the first branch point
    if (this.isTrunk()) {
      return this.firstChild()?.findGroupNode()
    }
  }

  get childElements(): TestPathsMapElement[] {
    return this.children
  }

  addChild(name: string): TestPathsMapElement {
    const child = new TestPathsMapElement(name)
    this.children.push(child)
    return child
  }

  insertTest(pathArray: string[], t: UnrealTest) {
    const el = pathArray.shift()
    if (el) {
      const pathFound = this.children.find(v => v.elementName === el)
      if (pathFound) {
        pathFound.insertTest(pathArray, t)
      } else {
        const newEl = this.addChild(el)
        newEl.insertTest(pathArray, t)
      }
    } else {
      this.test = t
    }
  }
}

class TestRun {
  suites: TestSuite[]
  constructor(
    readonly path: string,
    readonly success: boolean,
    readonly time: number,
    readonly root: TestPathsMapElement
  ) {
    this.suites = []
  }

  /**
   * Find all the suites
   */
  calculateSuites() {
    for (const el of this.root.childElements) {
      const name = el.findSuiteName()
      const groups = el.findGroups()
      if (groups.length === 0) {
        // There are no groups, all tests hang off the suite
        const trunkGroup = el.findTrunkGroup()
        if (trunkGroup !== undefined) {
          groups.push(new TestGroup(EMPTY_GROUP_NAME, trunkGroup))
        }
      }
      this.suites.push(new TestSuite(name, el, groups))
    }
  }
}

export class UnrealJsonParser implements TestParser {
  private readonly root: TestPathsMapElement

  constructor(readonly options: ParseOptions) {
    this.root = new TestPathsMapElement('root')
  }

  /**
   * Enforce invariant condition: fullTestPath is at least 2 elements: a suite
   * and a test name, for example:  'SuiteName.[GroupName.]TestName'; dot-separated
   * and with no white-space. Return the elements of the dot-separated path-name.
   * @param testPathName string pathName to process
   */
  coercePathName(testPathName: string): string[] {
    const testElements = testPathName
      .split(/\./)
      .map(s => s.trim())
      .filter(s => s.length > 0)
    if (testElements.length === 0) {
      testElements.push(EMPTY_SUITE_NAME)
    }
    if (testElements.length === 1) {
      testElements.push(EMPTY_TEST_NAME)
    }
    return testElements
  }

  /**
   * Accumulate the test path names and test data into the tree structure, and
   * enforce invariant that the `testDisplayName` in the data is non-empty.
   * @param pathName the test path to collate the data under
   * @param test the `UnrealTest` data
   */
  accumulateTests(pathName: string, test: UnrealTest) {
    const path = this.coercePathName(pathName)
    if (test.testDisplayName.trim().length === 0) {
      test.testDisplayName = pathName[pathName.length - 1]
    }
    this.root.insertTest(path, test)
  }

  async parse(path: string, content: string): Promise<TestRunResult> {
    if (this.options.parseErrors || (this.options.trackedFiles && this.options.trackedFiles.length > 0)) {
      core.info('Unreal Automation tests do not support file paths - see docs')
    }
    // build tree of paths and find suites

    try {
      const testResults: UnrealReport = JSON.parse(content.replace(/\t/g, ''))
      const success = testResults.failed === 0
      const duration = testResults.totalDuration
      const tr = new TestRun(path, success, duration, this.root)
      for (const t of testResults.tests) {
        this.accumulateTests(t.fullTestPath, t)
      }
      tr.calculateSuites()
      const suites = tr.suites.map(s => {
        return new TestSuiteResult(s.suiteName, s.getResults(), testResults.totalDuration)
      })
      return new TestRunResult(tr.path, suites, tr.time)
    } catch (e) {
      throw new Error(`Invalid at ${path}: ${e}`)
    }
  }
}
