import {TestParser} from '../../test-parser.js'
import {
  TestCaseError,
  TestCaseResult,
  TestExecutionResult,
  TestGroupResult,
  TestRunResult,
  TestSuiteResult
} from '../../test-results.js'
import {UnrealReport, UnrealTest} from './unreal-json-types.js'

function convertUnrealState(unrealState: UnrealTest['state']): TestExecutionResult | undefined {
  switch (unrealState) {
    case 'Success':
      return 'success'
    case 'Skipped':
      return 'skipped'
    case 'Failed':
      return 'failed'
  }
}

function convertUnrealTest(unrealTest: UnrealTest): TestCaseResult {
  const {testDisplayName, duration, state, entries} = unrealTest
  let error: TestCaseError | undefined
  if (unrealTest.errors > 0) {
    if (entries.length > 0) {
      error = {
        path: entries[0].filename,
        line: entries[0].lineNumber,
        message: `${entries[0].event.type} ${entries[0].timestamp}`,
        details: entries[0].event.message
      }
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
        results.push()
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
  constructor(
    readonly groupName: string,
    readonly pathMap: TestPathsMapElement
  ) {}
  get tests(): TestCase[] {
    return this.pathMap.childElements.map((el: TestPathsMapElement) => {
      return new TestCase(el.elementName, el.test)
    })
  }
}

class TestCase {
  private _testData: UnrealTest | undefined
  constructor(
    readonly caseName: string,
    testData?: UnrealTest
  ) {
    this._testData = testData
  }
  getResult(): TestCaseResult | undefined {
    if (this._testData) {
      return convertUnrealTest(this._testData)
    }
  }
}

export class TestPathsMapElement {
  public readonly children: TestPathsMapElement[]
  public test?: UnrealTest
  constructor(readonly elementName: string) {
    this.children = []
  }

  /**
   * Return true if every node under this is a leaf.
   * Don't call this on a leaf. That's an error.
   */
  isBranchEnd(): boolean {
    if (this.isLeaf()) throw Error('programmer error')
    for (const c of this.children) {
      if (!c.isLeaf()) return false
    }
    return true
  }
  firstChild(): TestPathsMapElement | undefined {
    return this.children.at(0)
  }
  isLeaf(): boolean {
    return this.children.length === 0
  }
  isTrunk(): boolean {
    return this.children.length === 1
  }
  isBranchPoint(): boolean {
    return this.children.length > 1
  }

  /**
   * Create groups from all nodes including this, and those
   * below it, not including the leaf nodes. Don't call
   * this on leaf node. That's an error.
   */
  groups(): TestGroup[] {
    if (this.isLeaf()) throw Error('programmer error')
    const accGroups: TestGroup[] = []
    let thisAdded = false
    for (const c of this.children) {
      if (!c.isLeaf()) {
        const names = c.groupNames()
        for (const nm of names) {
          const groupName = [this.elementName, ...nm]
          accGroups.push(new TestGroup(groupName.join('.'), this))
        }
      } else {
        if (!thisAdded) {
          accGroups.push(new TestGroup(this.elementName, this))
          thisAdded = true
        }
      }
    }
    return accGroups
  }

  /**
   * Walk from this node down and find all group names
   * including this, and below it, not including the leaf nodes.
   * Don't call this on leaf node. That's an error.
   */
  groupNames(): string[][] {
    if (this.isLeaf()) throw Error('programmer error')
    const accGroupNames: string[][] = []
    let thisAdded = false
    for (const c of this.children) {
      if (!c.isLeaf()) {
        const names = c.groupNames()
        for (const nm of names) {
          accGroupNames.push([this.elementName, ...nm])
        }
      } else {
        if (!thisAdded) {
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
    this.suites = this.root.childElements.map(el => {
      const name = el.suiteName().join('.')
      const groupNode = el.findGroupNode()
      if (groupNode) {
        return new TestSuite(name, el, groupNode.groups())
      } else {
        return new TestSuite(name, el, [new TestGroup('DEFAULT', el)])
      }
    })
  }
}

export class UnrealJsonParser implements TestParser {
  assumedWorkDir: string | undefined

  async parse(path: string, content: string): Promise<TestRunResult> {
    // build tree of paths and find suites
    const root = new TestPathsMapElement('root')
    try {
      const testResults: UnrealReport = JSON.parse(content)
      const success = testResults.failed === 0
      const duration = testResults.totalDuration
      for (const t of testResults.tests) {
        const testElements = t.fullTestPath.split(/\./)
        root.insertTest(testElements, t)
      }
      const tr = new TestRun(path, success, duration, root)
      tr.calculateSuites()
      const suites = tr.suites.map(s => {
        return new TestSuiteResult(s.suiteName, [], 1.0)
      })
      return new TestRunResult(tr.path, suites, tr.time)
    } catch (e) {
      throw new Error(`Invalid at ${path}: ${e}`)
    }
  }
}
