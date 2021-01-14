import {Annotation, ParseOptions, TestResult} from '../parser-types'

import getReport from '../../report/get-report'
import {normalizeFilePath} from '../../utils/file-utils'
import {Icon, fixEol} from '../../utils/markdown-utils'

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

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult
} from '../../report/test-results'

class TestRun {
  constructor(readonly suites: TestSuite[], readonly success: boolean, readonly time: number) {}
}

class TestSuite {
  constructor(readonly suite: Suite) {}
  readonly groups: {[id: number]: TestGroup} = {}
}

class TestGroup {
  constructor(readonly group: Group) {}
  readonly tests: TestCase[] = []
}

class TestCase {
  constructor(readonly testStart: TestStartEvent) {
    this.groupId = testStart.test.groupIDs[testStart.test.groupIDs.length - 1]
  }
  readonly groupId: number
  testDone?: TestDoneEvent
  error?: ErrorEvent
  get result(): TestExecutionResult {
    if (this.testDone?.skipped) {
      return 'skipped'
    }
    if (this.testDone?.result === 'success') {
      return 'success'
    }

    if (this.testDone?.result === 'error' || this.testDone?.result === 'failure') {
      return 'failed'
    }

    return undefined
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
      summary: getReport(getTestRunResult(testRun)),
      annotations: options.annotations ? getAnnotations(testRun, options.workDir, options.trackedFiles) : undefined
    }
  }
}

function getTestRun(content: string): TestRun {
  const lines = content.split(/\n\r?/g).filter(line => line !== '')
  const events = lines.map(str => JSON.parse(str)) as ReportEvent[]

  let success = false
  let totalTime = 0
  const suites: {[id: number]: TestSuite} = {}
  const tests: {[id: number]: TestCase} = {}

  for (const evt of events) {
    if (isSuiteEvent(evt)) {
      suites[evt.suite.id] = new TestSuite(evt.suite)
    } else if (isGroupEvent(evt)) {
      suites[evt.group.suiteID].groups[evt.group.id] = new TestGroup(evt.group)
    } else if (isTestStartEvent(evt) && evt.test.url !== null) {
      const test: TestCase = new TestCase(evt)
      const suite = suites[evt.test.suiteID]
      const group = suite.groups[evt.test.groupIDs[evt.test.groupIDs.length - 1]]
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

function getTestRunResult(tr: TestRun): TestRunResult {
  const suites = tr.suites.map(s => {
    return new TestSuiteResult(s.suite.path, getGroups(s))
  })

  return new TestRunResult(suites, tr.time)
}

function getGroups(suite: TestSuite): TestGroupResult[] {
  const groups = Object.values(suite.groups).filter(grp => grp.tests.length > 0)
  groups.sort((a, b) => (a.group.line ?? 0) - (b.group.line ?? 0))

  return groups.map(group => {
    group.tests.sort((a, b) => (a.testStart.test.line ?? 0) - (b.testStart.test.line ?? 0))
    const tests = group.tests.map(t => new TestCaseResult(t.testStart.test.name, t.result, t.time))
    return new TestGroupResult(group.group.name, tests)
  })
}

function getAnnotations(tr: TestRun, workDir: string, trackedFiles: string[]): Annotation[] {
  const annotations: Annotation[] = []
  for (const suite of tr.suites) {
    for (const group of Object.values(suite.groups)) {
      for (const test of group.tests) {
        if (test.error) {
          const err = getAnnotation(test, suite, workDir, trackedFiles)
          if (err !== null) {
            annotations.push(err)
          }
        }
      }
    }
  }

  return annotations
}

function getAnnotation(
  test: TestCase,
  testSuite: TestSuite,
  workDir: string,
  trackedFiles: string[]
): Annotation | null {
  const stack = test.error?.stackTrace ?? ''
  let src = exceptionThrowSource(stack, trackedFiles)
  if (src === null) {
    const file = getRelativePathFromUrl(test.testStart.test.url ?? '', workDir)
    if (!trackedFiles.includes(file)) {
      return null
    }
    src = {
      file,
      line: test.testStart.test.line ?? 0
    }
  }

  return {
    annotation_level: 'failure',
    start_line: src.line,
    end_line: src.line,
    path: src.file,
    message: `${fixEol(test.error?.error)}\n\n${fixEol(test.error?.stackTrace)}`,
    title: `[${testSuite.suite.path}] ${test.testStart.test.name}`
  }
}

function exceptionThrowSource(ex: string, trackedFiles: string[]): {file: string; line: number} | null {
  // imports from package which is tested are listed in stack traces as 'package:xyz/' which maps to relative path 'lib/'
  const packageRe = /^package:[a-zA-z0-9_$]+\//
  const lines = ex.split(/\r?\n/).map(str => str.replace(packageRe, 'lib/'))

  // regexp to extract file path and line number from stack trace
  const re = /^(.*)\s+(\d+):\d+\s+/
  for (const str of lines) {
    const match = str.match(re)
    if (match !== null) {
      const [_, fileStr, lineStr] = match
      const file = normalizeFilePath(fileStr)
      if (trackedFiles.includes(file)) {
        const line = parseInt(lineStr)
        return {file, line}
      }
    }
  }

  return null
}

function getRelativePathFromUrl(file: string, workdir: string): string {
  const prefix = 'file:///'
  if (file.startsWith(prefix)) {
    file = file.substr(prefix.length)
  }
  if (file.startsWith(workdir)) {
    file = file.substr(workdir.length)
  }
  return file
}
