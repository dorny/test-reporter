import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {JunitReport, TestCase, TestSuite} from './pytest-junit-types'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'
import {getBasePath, normalizeFilePath} from '../../utils/path-utils'

export class PytestJunitParser implements TestParser {
  assumedWorkDir: string | undefined

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
    const suites: TestSuiteResult[] =
      junit.testsuites.testsuite === undefined
        ? []
        : junit.testsuites.testsuite.map(ts => {
            const name = ts.$.name.trim()
            const time = parseFloat(ts.$.time) * 1000
            return new TestSuiteResult(name, this.getGroups(ts), time)
          })

    const time =
      junit.testsuites.$ === undefined
        ? suites.reduce((sum, suite) => sum + suite.time, 0)
        : parseFloat(junit.testsuites.$.time) * 1000

    return new TestRunResult(path, suites, time)
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    if (!suite.testcase) {
      return []
    }

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

    const failure = tc.failure[0]
    const details = typeof failure === 'object' ? failure._ : failure

    return {
      ...this.errorSource(details),
      details
    }
  }

  private errorSource(details: string): {path: string; line: number; message: string} | undefined {
    const lines = details.split('\n').map(line => line.trim())
    const [path, pos] = lines[0].split(':')
    const line = Number.parseInt(pos)

    if (path && Number.isFinite(line)) {
      return {
        path: this.getRelativePath(path),
        line,
        message: lines[1]
      }
    }

    return undefined
  }

  private getRelativePath(path: string): string {
    path = normalizeFilePath(path)
    const workDir = this.getWorkDir(path)
    if (workDir !== undefined && path.startsWith(workDir)) {
      path = path.substring(workDir.length + 1)
    }
    return path
  }

  private getWorkDir(path: string): string | undefined {
    return (
      this.options.workDir ??
      this.assumedWorkDir ??
      (this.assumedWorkDir = getBasePath(path, this.options.trackedFiles))
    )
  }
}
