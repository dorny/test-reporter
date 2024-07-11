import {ParseOptions, TestParser} from '../../test-parser'
import {TestCaseError, TestCaseResult, TestExecutionResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../test-results'
import {ApexTestReport} from './apex-json-types'

export class ApexJsonParser implements TestParser {
  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    const report = await this.getReport(path, content)

    return this.getTestRunResult(path, report)
  }

  private async getReport(path: string, content: string): Promise<ApexTestReport> {
    try {
      return JSON.parse(content) as ApexTestReport
    } catch (e) {
      throw new Error(`Invalid JSON at ${path}\n\n${e}`)
    }
  }

  private getTestRunResult(path: string, report: ApexTestReport): TestRunResult {
    const time = report.result.summary.testTotalTime
    const timeAsNumber = Number.parseInt(time, 10)

    // group tests by test.ApexClass.Name
    const groupsMap: Map<string, TestCaseResult[]> = report.result.tests.reduce((map, test) => {
      const key = test.ApexClass.Name
      const testResults = map.get(key) || []

      let result: TestExecutionResult = 'skipped'
      if (test.Outcome === 'Pass') {
        result = 'success'
      } else if (test.Outcome === 'Fail') {
        result = 'failed'
      }

      const testCaseError: TestCaseError | undefined = test.Message ? {details: test.Message} : undefined

      const testResult = new TestCaseResult(test.MethodName, result, test.RunTime, testCaseError)

      testResults.push(testResult)
      map.set(key, testResults)
      return map
    }, new Map<string, TestCaseResult[]>())

    const groups: TestGroupResult[] = []

    for (const [name, tests] of groupsMap) {
      const suite = new TestGroupResult(name, tests)
      groups.push(suite)
    }

    const coverageString = report.result.summary.testRunCoverage
    const coverage = coverageString ? Number.parseInt(coverageString.replace('%', ''), 10) : undefined

    const suite = new TestSuiteResult('Apex Tests', groups, timeAsNumber, coverage)

    return new TestRunResult(path, [suite], timeAsNumber, coverage)
  }
}
