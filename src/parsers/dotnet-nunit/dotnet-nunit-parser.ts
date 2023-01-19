import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {NunitReport, TestCase, TestRun, TestSuite} from './dotnet-nunit-types'
import {getExceptionSource} from '../../utils/node-utils'
import {getBasePath, normalizeFilePath} from '../../utils/path-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

export class DotNetNunitParser implements TestParser {
  assumedWorkDir: string | undefined

  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    const ju = await this.getNunitReport(path, content)
    return this.getTestRunResult(path, ju)
  }

  private async getNunitReport(path: string, content: string): Promise<NunitReport> {
    try {
      return (await parseStringPromise(content)) as NunitReport
    } catch (e) {
      throw new Error(`Invalid XML at ${path}\n\n${e}`)
    }
  }

  private getTestRunResult(path: string, nunit: NunitReport): TestRunResult {
    const suites: TestSuiteResult[] = []
    const time = parseFloat(nunit['test-run'].$.duration) * 1000

    this.populateTestCasesRecursive(suites, [], nunit['test-run']['test-suite'])

    return new TestRunResult(path, suites, time)
  }

  private populateTestCasesRecursive(
    result: TestSuiteResult[],
    suitePath: TestSuite[],
    testSuites: TestSuite[] | undefined
  ): void {
    if (testSuites === undefined) {
      return
    }

    testSuites.forEach(suite => {
      suitePath.push(suite)

      this.populateTestCasesRecursive(result, suitePath, suite['test-suite'])

      const testcases = suite['test-case']
      if (testcases !== undefined) {
        testcases.forEach(testcase => {
          this.addTestCase(result, suitePath, testcase)
        })
      }

      suitePath.pop()
    })
  }

  private addTestCase(result: TestSuiteResult[], suitePath: TestSuite[], testCase: TestCase) {
    // The last suite in the suite path is the "group".
    // The rest are concatenated together to form the "suite".
    // But ignore "Theory" suites.
    const suitesWithoutTheories = suitePath.filter(suite => suite.$.type !== 'Theory')
    const suiteName = suitesWithoutTheories
      .slice(0, suitesWithoutTheories.length - 1)
      .map(suite => suite.$.name)
      .join('.')
    const groupName = suitesWithoutTheories[suitesWithoutTheories.length - 1].$.name

    let existingSuite = result.find(existingSuite => existingSuite.name === suiteName)
    if (existingSuite === undefined) {
      existingSuite = new TestSuiteResult(suiteName, [])
      result.push(existingSuite)
    }

    let existingGroup = existingSuite.groups.find(existingGroup => existingGroup.name === groupName)
    if (existingGroup === undefined) {
      existingGroup = new TestGroupResult(groupName, [])
      existingSuite.groups.push(existingGroup)
    }

    existingGroup.tests.push(
      new TestCaseResult(
        testCase.$.name,
        this.getTestExecutionResult(testCase),
        parseFloat(testCase.$.duration) * 1000,
        this.getTestCaseError(testCase)
      )
    )
  }

  private getTestExecutionResult(test: TestCase): TestExecutionResult {
    if (test.$.result === 'Failed' || test.failure) return 'failed'
    if (test.$.result === 'Skipped') return 'skipped'
    return 'success'
  }

  private getTestCaseError(tc: TestCase): TestCaseError | undefined {
    if (!this.options.parseErrors || !tc.failure || tc.failure.length === 0) {
      return undefined
    }

    const details = tc.failure[0]
    let path
    let line

    if (details['stack-trace'] !== undefined && details['stack-trace'].length > 0) {
      const src = getExceptionSource(details['stack-trace'][0], this.options.trackedFiles, file =>
        this.getRelativePath(file)
      )
      if (src) {
        path = src.path
        line = src.line
      }
    }

    return {
      path: path,
      line: line,
      message: details.message && details.message.length > 0 ? details.message[0] : '',
      details: details['stack-trace'] && details['stack-trace'].length > 0 ? details['stack-trace'][0] : ''
    }
  }

  private getRelativePath(path: string): string {
    path = normalizeFilePath(path)
    const workDir = this.getWorkDir(path)
    if (workDir !== undefined && path.startsWith(workDir)) {
      path = path.substr(workDir.length)
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
