import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {PhpunitReport, SingleSuiteReport, TestCase, TestSuite} from './phpunit-junit-types'
import {normalizeFilePath} from '../../utils/path-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

export class PhpunitJunitParser implements TestParser {
  readonly trackedFiles: Set<string>

  constructor(readonly options: ParseOptions) {
    this.trackedFiles = new Set(options.trackedFiles.map(f => normalizeFilePath(f)))
  }

  async parse(filePath: string, content: string): Promise<TestRunResult> {
    const reportOrSuite = await this.getPhpunitReport(filePath, content)
    const isReport = (reportOrSuite as PhpunitReport).testsuites !== undefined

    // XML might contain:
    // - multiple suites under <testsuites> root node
    // - single <testsuite> as root node
    let report: PhpunitReport
    if (isReport) {
      report = reportOrSuite as PhpunitReport
    } else {
      // Make it behave the same way as if suite was inside <testsuites> root node
      const suite = (reportOrSuite as SingleSuiteReport).testsuite
      report = {
        testsuites: {
          $: {time: suite.$.time},
          testsuite: [suite]
        }
      }
    }

    return this.getTestRunResult(filePath, report)
  }

  private async getPhpunitReport(filePath: string, content: string): Promise<PhpunitReport | SingleSuiteReport> {
    try {
      return await parseStringPromise(content)
    } catch (e) {
      throw new Error(`Invalid XML at ${filePath}\n\n${e}`)
    }
  }

  private getTestRunResult(filePath: string, report: PhpunitReport): TestRunResult {
    const suites: TestSuiteResult[] = []
    this.collectSuites(suites, report.testsuites.testsuite ?? [])

    const seconds = parseFloat(report.testsuites.$?.time ?? '')
    const time = isNaN(seconds) ? undefined : seconds * 1000
    return new TestRunResult(filePath, suites, time)
  }

  private collectSuites(results: TestSuiteResult[], testsuites: TestSuite[]): void {
    for (const ts of testsuites) {
      // Recursively process nested test suites first (depth-first)
      if (ts.testsuite) {
        this.collectSuites(results, ts.testsuite)
      }

      // Only add suites that have direct test cases
      // This avoids adding container suites that only hold nested suites
      if (ts.testcase && ts.testcase.length > 0) {
        const name = ts.$.name.trim()
        const time = parseFloat(ts.$.time) * 1000
        results.push(new TestSuiteResult(name, this.getGroups(ts), time))
      }
    }
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    if (!suite.testcase || suite.testcase.length === 0) {
      return []
    }

    const groups: {name: string; tests: TestCase[]}[] = []
    for (const tc of suite.testcase) {
      // Use classname (PHPUnit style) for grouping
      // If classname matches suite name, use empty string to avoid redundancy
      const className = tc.$.classname ?? tc.$.class ?? ''
      const groupName = className === suite.$.name ? '' : className
      let grp = groups.find(g => g.name === groupName)
      if (grp === undefined) {
        grp = {name: groupName, tests: []}
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
      return new TestGroupResult(grp.name, tests)
    })
  }

  private getTestCaseResult(test: TestCase): TestExecutionResult {
    if (test.failure || test.error) return 'failed'
    if (test.skipped) return 'skipped'
    return 'success'
  }

  private getTestCaseError(tc: TestCase): TestCaseError | undefined {
    if (!this.options.parseErrors) {
      return undefined
    }

    // We process <error> and <failure> the same way
    const failures = tc.failure ?? tc.error
    if (!failures || failures.length === 0) {
      return undefined
    }

    const failure = failures[0]
    const details = failure._ ?? ''

    // PHPUnit provides file path directly in testcase attributes
    let filePath: string | undefined
    let line: number | undefined

    if (tc.$.file) {
      const normalizedPath = normalizeFilePath(tc.$.file)
      if (this.trackedFiles.has(normalizedPath)) {
        filePath = normalizedPath
      }
      if (tc.$.line) {
        line = parseInt(tc.$.line)
      }
    }

    // If file not in tracked files, try to extract from error details
    if (!filePath && details) {
      const extracted = this.extractFileAndLine(details)
      if (extracted) {
        filePath = extracted.filePath
        line = extracted.line
      }
    }

    let message: string | undefined
    if (failure.$) {
      message = failure.$.message
      if (failure.$.type) {
        message = message ? `${failure.$.type}: ${message}` : failure.$.type
      }
    }

    return {
      path: filePath,
      line,
      details,
      message
    }
  }

  private extractFileAndLine(details: string): {filePath: string; line: number} | undefined {
    // PHPUnit stack traces typically have format: /path/to/file.php:123
    const lines = details.split(/\r?\n/)

    for (const str of lines) {
      // Match patterns like /path/to/file.php:123 or at /path/to/file.php(123)
      const match = str.match(/([^\s:()]+\.php):(\d+)|([^\s:()]+\.php)\((\d+)\)/)
      if (match) {
        const path = match[1] ?? match[3]
        const lineStr = match[2] ?? match[4]
        const normalizedPath = normalizeFilePath(path)
        if (this.trackedFiles.has(normalizedPath)) {
          return {filePath: normalizedPath, line: parseInt(lineStr)}
        }
      }
    }

    return undefined
  }
}
