import {ParseOptions, TestResult} from '../test-parser'

import {Icon} from '../../utils/markdown-utils'

import {
  ReportEvent,
  Suite,
  Group,
  TestStartEvent,
  TestDoneEvent,
  ErrorEvent,
  isSuiteEvent,
  isGroupEvent,
  isTestStartEvent,
  isTestDoneEvent,
  isErrorEvent,
  isDoneEvent
} from './dart-json-types'

class TestRun {
  constructor(readonly suites: TestSuite[], readonly success: boolean, readonly time: number) {}
  get count(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.count, 0)
  }
  get passed(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.passed, 0)
  }
  get failed(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.failed, 0)
  }
  get skipped(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.skipped, 0)
  }
}

class TestSuite {
  constructor(readonly suite: Suite) {}
  tests = new TestGroup()
  groups: {[id: number]: TestGroup} = {}
  get count(): number {
    return this.tests.count + Object.values(this.groups).reduce((sum, g) => sum + g.count, 0)
  }
  get passed(): number {
    return this.tests.passed + Object.values(this.groups).reduce((sum, g) => sum + g.passed, 0)
  }
  get failed(): number {
    return this.tests.failed + Object.values(this.groups).reduce((sum, g) => sum + g.failed, 0)
  }
  get skipped(): number {
    return this.tests.skipped + Object.values(this.groups).reduce((sum, g) => sum + g.skipped, 0)
  }
  get time(): number {
    return this.tests.time + Object.values(this.groups).reduce((sum, g) => sum + g.time, 0)
  }
}

class TestGroup {
  constructor(readonly group?: Group) {}
  tests: TestSuiteTest[] = []
  get count(): number {
    return this.tests.length
  }
  get passed(): number {
    return this.tests.reduce((sum, t) => (t.isPassed ? sum + 1 : sum), 0)
  }
  get failed(): number {
    return this.tests.reduce((sum, t) => (t.isFailed ? sum + 1 : sum), 0)
  }
  get skipped(): number {
    return this.tests.reduce((sum, t) => (t.isSkipped ? sum + 1 : sum), 0)
  }
  get time(): number {
    return this.tests.reduce((sum, t) => sum + t.time, 0)
  }
}

class TestSuiteTest {
  constructor(readonly testStart: TestStartEvent) {
    this.groupId = testStart.test.groupIDs[testStart.test.groupIDs.length - 1]
  }
  readonly groupId: number
  testDone?: TestDoneEvent
  error?: ErrorEvent
  get isPassed(): boolean {
    return this.testDone?.result === 'success' && !this.testDone?.skipped
  }
  get isFailed(): boolean {
    return this.testDone?.result !== 'success'
  }
  get isSkipped(): boolean {
    return this.testDone?.skipped === true
  }
  get time(): number {
    return this.testDone !== undefined ? this.testDone.time - this.testStart.time : 0
  }
}

export async function parseDartJson(content: string, options: ParseOptions): Promise<TestResult> {
  const testRun = getTestRun(content)
  const icon = testRun.success ? Icon.success : Icon.fail

  return {
    success: testRun.success,
    output: {
      title: `${options.name.trim()} ${icon}`,
      summary: getSummary(testRun),
      annotations: options.annotations ? [] : undefined
    }
  }
}

function getTestRun(content: string): TestRun {
  const lines = content.split(/\n\r?/g).filter(line => line !== '')
  const events = lines.map(str => JSON.parse(str)) as ReportEvent[]

  let success = false
  let totalTime = 0
  const suites: {[id: number]: TestSuite} = {}
  const tests: {[id: number]: TestSuiteTest} = {}

  for (const evt of events) {
    if (isSuiteEvent(evt)) {
      suites[evt.suite.id] = new TestSuite(evt.suite)
    } else if (isGroupEvent(evt)) {
      suites[evt.group.suiteID].groups[evt.group.id] = new TestGroup(evt.group)
    } else if (isTestStartEvent(evt) && evt.test.url !== null) {
      const test: TestSuiteTest = new TestSuiteTest(evt)
      const suite = suites[evt.test.suiteID]
      const group =
        evt.test.groupIDs.length === 0 ? suite.tests : suite.groups[evt.test.groupIDs[evt.test.groupIDs.length - 1]]
      group.tests.push(test)
      tests[evt.test.id] = test
    } else if (isTestDoneEvent(evt) && !evt.hidden) {
      tests[evt.testID].testDone = evt
    } else if (isErrorEvent(evt)) {
      tests[evt.testID].error = evt
    } else if (isDoneEvent(evt)) {
      success = evt.success
      totalTime = evt.time
    }
  }

  return new TestRun(Object.values(suites), success, totalTime)
}

function getSummary(testRun: TestRun): string {
  const tests = testRun.count
  const time = `${(testRun.time / 1000).toFixed(3)}s`
  const passed = testRun.passed
  const skipped = testRun.skipped
  const failed = testRun.failed

  const headingLine = `**${tests}** tests were completed in **${time}** with **${passed}** passed, **${skipped}** skipped and **${failed}** failed.`
  return `${headingLine}`
}
