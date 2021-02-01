import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {JunitReport, TestCase, TestSuite} from './jest-junit-types'
import {normalizeFilePath} from '../../utils/file-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

export class JestJunitParser implements TestParser {
  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    const ju = await this.getJunitReport(path, content)
    return this.getTestRunResult(path, ju)
  }

  private async getJunitReport(path: string, content: string): Promise<JunitReport> {
    try {
      return (await parseStringPromise(content)) as JunitReport
    } catch (e) {
      throw new Error(`Invalid XML at ${path}\n\n${e}`)
    }
  }

  private getTestRunResult(path: string, junit: JunitReport): TestRunResult {
    const suites = junit.testsuites.testsuite.map(ts => {
      const name = ts.$.name.trim()
      const time = parseFloat(ts.$.time) * 1000
      const sr = new TestSuiteResult(name, this.getGroups(ts), time)
      return sr
    })

    const time = parseFloat(junit.testsuites.$.time) * 1000
    return new TestRunResult(path, suites, time)
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    const groups: {describe: string; tests: TestCase[]}[] = []
    for (const tc of suite.testcase) {
      let grp = groups.find(g => g.describe === tc.$.classname)
      if (grp === undefined) {
        grp = {describe: tc.$.classname, tests: []}
        groups.push(grp)
      }
      grp.tests.push(tc)
    }

    return groups.map(grp => {
      const tests = grp.tests.map(tc => {
        const name = tc.$.name.trim()
        const result = this.getTestCaseResult(tc)
        const time = parseFloat(tc.$.time) * 1000
        const error = this.getTestCaseError(tc)
        return new TestCaseResult(name, result, time, error)
      })
      return new TestGroupResult(grp.describe, tests)
    })
  }

  private getTestCaseResult(test: TestCase): TestExecutionResult {
    if (test.failure) return 'failed'
    if (test.skipped) return 'skipped'
    return 'success'
  }

  private getTestCaseError(tc: TestCase): TestCaseError | undefined {
    if (!this.options.parseErrors || !tc.failure) {
      return undefined
    }

    const stackTrace = tc.failure[0]
    let path
    let line

    const src = this.exceptionThrowSource(stackTrace)
    if (src) {
      path = src.path
      line = src.line
    }

    return {
      path,
      line,
      stackTrace
    }
  }

  private exceptionThrowSource(stackTrace: string): {path: string; line: number} | undefined {
    const lines = stackTrace.split(/\r?\n/)
    const re = /\((.*):(\d+):\d+\)$/

    const {workDir, trackedFiles} = this.options
    for (const str of lines) {
      const match = str.match(re)
      if (match !== null) {
        const [_, fileStr, lineStr] = match
        const filePath = normalizeFilePath(fileStr)
        const path = filePath.startsWith(workDir) ? filePath.substr(workDir.length) : filePath
        if (trackedFiles.includes(path)) {
          const line = parseInt(lineStr)

          return {path, line}
        }
      }
    }
  }
}
