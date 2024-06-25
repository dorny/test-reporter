import {ParseOptions, TestParser} from '../../test-parser'
import {
  TestCaseError,
  TestCaseResult,
  TestExecutionResult,
  TestGroupResult,
  TestRunResult,
  TestSuiteResult
} from '../../test-results'
import {RspecJson, RspecExample} from './rspec-json-types'

export class RspecJsonParser implements TestParser {
  assumedWorkDir: string | undefined

  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    const mocha = this.getRspecJson(path, content)
    const result = this.getTestRunResult(path, mocha)
    result.sort(true)
    return Promise.resolve(result)
  }

  private getRspecJson(path: string, content: string): RspecJson {
    try {
      return JSON.parse(content)
    } catch (e) {
      throw new Error(`Invalid JSON at ${path}\n\n${e}`)
    }
  }

  private getTestRunResult(resultsPath: string, rspec: RspecJson): TestRunResult {
    const suitesMap: {[path: string]: TestSuiteResult} = {}

    const getSuite = (test: RspecExample): TestSuiteResult => {
      const path = test.file_path
      return suitesMap[path] ?? (suitesMap[path] = new TestSuiteResult(path, []))
    }

    for (const test of rspec.examples) {
      const suite = getSuite(test)
      if (test.status === 'failed') {
        this.processTest(suite, test, 'failed')
      } else if (test.status === 'passed') {
        this.processTest(suite, test, 'success')
      } else if (test.status === 'pending') {
        this.processTest(suite, test, 'skipped')
      }
    }

    const suites = Object.values(suitesMap)
    return new TestRunResult(resultsPath, suites, rspec.summary.duration)
  }

  private processTest(suite: TestSuiteResult, test: RspecExample, result: TestExecutionResult): void {
    const groupName =
      test.full_description !== test.description
        ? test.full_description.substr(0, test.full_description.length - test.description.length).trimEnd()
        : null

    let group = suite.groups.find(grp => grp.name === groupName)
    if (group === undefined) {
      group = new TestGroupResult(groupName, [])
      suite.groups.push(group)
    }

    const error = this.getTestCaseError(test)
    const testCase = new TestCaseResult(test.full_description, result, test.run_time ?? 0, error)
    group.tests.push(testCase)
  }

  private getTestCaseError(test: RspecExample): TestCaseError | undefined {
    const backtrace = test.exception?.backtrace
    const message = test.exception?.message
    if (backtrace === undefined) {
      return undefined
    }

    let path
    let line
    const details = backtrace.join('\n')

    const src = this.getExceptionSource(backtrace)
    if (src) {
      path = src.path
      line = src.line
    }

    return {
      path,
      line,
      message,
      details
    }
  }

  private getExceptionSource(backtrace: string[]): {path: string; line: number} | undefined {
    const re = /^(.*?):(\d+):/

    for (const str of backtrace) {
      const match = str.match(re)
      if (match !== null) {
        const [_, path, lineStr] = match
        if (path.startsWith('./')) {
          const line = parseInt(lineStr)
          return {path, line}
        }
      }
    }
    return undefined
  }
}
