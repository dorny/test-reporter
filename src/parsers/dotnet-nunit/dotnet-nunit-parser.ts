import * as path from 'path'
import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {NunitReport, TestCase, TestSuite} from './dotnet-nunit-types'
import {normalizeFilePath} from '../../utils/path-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

export class DotnetNunitParser implements TestParser {
  readonly trackedFiles: {[fileName: string]: string[]}

  constructor(readonly options: ParseOptions) {
    this.trackedFiles = {}
    for (const filePath of options.trackedFiles) {
      const fileName = path.basename(filePath)
      const files = this.trackedFiles[fileName] ?? (this.trackedFiles[fileName] = [])
      files.push(normalizeFilePath(filePath))
    }
  }

  async parse(filePath: string, content: string): Promise<TestRunResult> {
    const reportOrSuite = await this.getNunitReport(filePath, content)
    return this.getTestRunResult(filePath, reportOrSuite)
  }

  private async getNunitReport(filePath: string, content: string): Promise<NunitReport> {
    try {
      return await parseStringPromise(content)
    } catch (e) {
      throw new Error(`Invalid XML at ${filePath}\n\n${e}`)
    }
  }

  private getTestSuiteResultRecursive(
    testSuites: TestSuite[] | undefined,
    suiteResults: TestSuiteResult[],
    depth: number
  ): void {
    if (testSuites !== undefined) {
      testSuites.map(ts => {
        const name = ts.$.name.trim()
        const time = parseFloat(ts.$.duration) * 1000
        const groups = this.getGroups(ts)
        const sr = new TestSuiteResult(name, groups, time, depth)
        suiteResults.push(sr)

        if (groups.length === 0) {
          const nestedTestSuites = ts['test-suite']
          if (nestedTestSuites !== undefined) {
            this.getTestSuiteResultRecursive(nestedTestSuites, suiteResults, depth + 1)
          }
        }
      })
    }
  }

  private getTestRunResult(filePath: string, nunit: NunitReport): TestRunResult {
    const suites: TestSuiteResult[] = []

    const testSuites = nunit['test-run']['test-suite']
    this.getTestSuiteResultRecursive(testSuites, suites, 0)

    const seconds = parseFloat(nunit['test-run'].$?.time)
    const time = isNaN(seconds) ? undefined : seconds * 1000
    return new TestRunResult(filePath, suites, time)
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    const groups: {describe: string; tests: TestCase[]}[] = []
    if (suite['test-case'] === undefined) {
      return []
    }
    for (const tc of suite['test-case']) {
      let grp = groups.find(g => g.describe === tc.$.name)
      if (grp === undefined) {
        grp = {describe: tc.$.name, tests: []}
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
    if (test.$.result === 'Skipped') return 'skipped'
    return 'success'
  }

  private getTestCaseError(tc: TestCase): TestCaseError | undefined {
    if (!this.options.parseErrors) {
      return undefined
    }

    const failure = tc.failure
    if (!failure) {
      return undefined
    }

    const details = failure[0]['stack-trace'] === undefined ? '' : failure[0]['stack-trace'][0]

    let filePath
    let line

    const src = this.exceptionThrowSource(details)
    if (src) {
      filePath = src.filePath
      line = src.line
    }

    return {
      path: filePath,
      line,
      details,
      message: failure[0].message === undefined ? '' : failure[0].message[0]
    }
  }

  private exceptionThrowSource(stackTrace: string): {filePath: string; line: number} | undefined {
    const lines = stackTrace.split(/\r?\n/)
    const re = /^at (.*\) in .*):(.+)$/

    for (const str of lines) {
      const match = str.match(re)
      if (match !== null) {
        const [, , filePath, lineStr] = match
        const line = parseInt(lineStr)
        return {filePath, line}
      }
    }
  }
}
