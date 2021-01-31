import * as core from '@actions/core'
import {ParseOptions, TestParser} from '../../test-parser'

import {normalizeFilePath} from '../../utils/file-utils'

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
  TestCaseResult,
  TestCaseError
} from '../../test-results'

class TestRun {
  constructor(readonly path: string, readonly suites: TestSuite[], readonly success: boolean, readonly time: number) {}
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

export class DartJsonParser implements TestParser {
  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    const tr = this.getTestRun(path, content)
    const result = this.getTestRunResult(tr)
    return Promise.resolve(result)
  }

  private getTestRun(path: string, content: string): TestRun {
    core.info(`Parsing content of '${path}'`)
    const lines = content.split(/\n\r?/g)
    const events = lines
      .map((str, i) => {
        if (str.trim() === '') {
          return null
        }
        try {
          return JSON.parse(str)
        } catch (e) {
          const col = e.columnNumber !== undefined ? `:${e.columnNumber}` : ''
          new Error(`Invalid JSON at ${path}:${i + 1}${col}\n\n${e}`)
        }
      })
      .filter(evt => evt != null) as ReportEvent[]

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

    return new TestRun(path, Object.values(suites), success, totalTime)
  }

  private getTestRunResult(tr: TestRun): TestRunResult {
    const suites = tr.suites.map(s => {
      return new TestSuiteResult(s.suite.path, this.getGroups(s))
    })

    return new TestRunResult(tr.path, suites, tr.time)
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    const groups = Object.values(suite.groups).filter(grp => grp.tests.length > 0)
    groups.sort((a, b) => (a.group.line ?? 0) - (b.group.line ?? 0))

    return groups.map(group => {
      group.tests.sort((a, b) => (a.testStart.test.line ?? 0) - (b.testStart.test.line ?? 0))
      const tests = group.tests.map(t => this.getTest(t))
      return new TestGroupResult(group.group.name, tests)
    })
  }

  private getTest(tc: TestCase): TestCaseResult {
    const error = this.getError(tc)
    return new TestCaseResult(tc.testStart.test.name, tc.result, tc.time, error)
  }

  private getError(test: TestCase): TestCaseError | undefined {
    if (!this.options.parseErrors || !test.error) {
      return undefined
    }

    const {workDir, trackedFiles} = this.options
    const message = test.error?.error ?? ''
    const stackTrace = test.error?.stackTrace ?? ''
    const src = this.exceptionThrowSource(stackTrace, trackedFiles)
    let path
    let line

    if (src !== undefined) {
      ;(path = src.path), (line = src.line)
    } else {
      const testStartPath = this.getRelativePathFromUrl(test.testStart.test.url ?? '', workDir)
      if (trackedFiles.includes(testStartPath)) {
        path = testStartPath
      }
      line = test.testStart.test.line ?? undefined
    }

    return {
      path,
      line,
      message,
      stackTrace
    }
  }

  private exceptionThrowSource(ex: string, trackedFiles: string[]): {path: string; line: number} | undefined {
    // imports from package which is tested are listed in stack traces as 'package:xyz/' which maps to relative path 'lib/'
    const packageRe = /^package:[a-zA-z0-9_$]+\//
    const lines = ex.split(/\r?\n/).map(str => str.replace(packageRe, 'lib/'))

    // regexp to extract file path and line number from stack trace
    const re = /^(.*)\s+(\d+):\d+\s+/
    for (const str of lines) {
      const match = str.match(re)
      if (match !== null) {
        const [_, pathStr, lineStr] = match
        const path = normalizeFilePath(pathStr)
        if (trackedFiles.includes(path)) {
          const line = parseInt(lineStr)
          return {path, line}
        }
      }
    }
  }

  private getRelativePathFromUrl(file: string, workDir: string): string {
    const prefix = 'file:///'
    if (file.startsWith(prefix)) {
      file = file.substr(prefix.length)
    }
    if (file.startsWith(workDir)) {
      file = file.substr(workDir.length)
    }
    return file
  }
}
