import * as path from 'path'
import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {NetteTesterReport, SingleSuiteReport, TestCase, TestSuite} from './tester-junit-types'
import {normalizeFilePath} from '../../utils/path-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

interface ParsedTestName {
  filePath: string
  method?: string
  description?: string
  className?: string
  displayName: string
}

export class NetteTesterJunitParser implements TestParser {
  readonly trackedFiles: Set<string>
  readonly trackedFilesList: string[]

  constructor(readonly options: ParseOptions) {
    this.trackedFilesList = options.trackedFiles.map(f => normalizeFilePath(f))
    this.trackedFiles = new Set(this.trackedFilesList)
  }

  async parse(filePath: string, content: string): Promise<TestRunResult> {
    const reportOrSuite = await this.getNetteTesterReport(filePath, content)
    const isReport = (reportOrSuite as NetteTesterReport).testsuites !== undefined

    // XML might contain:
    // - multiple suites under <testsuites> root node
    // - single <testsuite> as root node
    let report: NetteTesterReport
    if (isReport) {
      report = reportOrSuite as NetteTesterReport
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

  private async getNetteTesterReport(
    filePath: string,
    content: string
  ): Promise<NetteTesterReport | SingleSuiteReport> {
    try {
      return await parseStringPromise(content)
    } catch (e) {
      throw new Error(`Invalid XML at ${filePath}\n\n${e}`)
    }
  }

  private getTestRunResult(filePath: string, report: NetteTesterReport): TestRunResult {
    const suites =
      report.testsuites.testsuite === undefined
        ? []
        : report.testsuites.testsuite.map((ts, index) => {
            // Use report file name as suite name (user preference)
            const fileName = path.basename(filePath)
            // If there are multiple test suites, add index to distinguish them
            const name =
              report.testsuites.testsuite && report.testsuites.testsuite.length > 1
                ? `${fileName} #${index + 1}`
                : fileName
            const time = parseFloat(ts.$.time) * 1000
            const sr = new TestSuiteResult(name, this.getGroups(ts), time)
            return sr
          })

    const seconds = parseFloat(report.testsuites.$?.time ?? '')
    const time = isNaN(seconds) ? undefined : seconds * 1000
    return new TestRunResult(filePath, suites, time)
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    if (!suite.testcase || suite.testcase.length === 0) {
      return []
    }

    // Group tests by directory structure
    const groups: Map<string, TestCase[]> = new Map()

    for (const tc of suite.testcase) {
      const parsed = this.parseTestCaseName(tc.$.classname)
      const directory = path.dirname(parsed.filePath)

      if (!groups.has(directory)) {
        groups.set(directory, [])
      }
      groups.get(directory)!.push(tc)
    }

    return Array.from(groups.entries()).map(([dir, tests]) => {
      const testResults = tests.map(tc => {
        const parsed = this.parseTestCaseName(tc.$.classname)
        const result = this.getTestCaseResult(tc)
        const time = parseFloat(tc.$.time || '0') * 1000
        const error = this.getTestCaseError(tc, parsed.filePath)
        return new TestCaseResult(parsed.displayName, result, time, error)
      })
      return new TestGroupResult(dir, testResults)
    })
  }

  /**
   * Parse test case name from classname attribute.
   *
   * Handles multiple patterns:
   * 1. Simple: "tests/Framework/Assert.equal.phpt"
   * 2. With method: "tests/Framework/Assert.equal.recursive.phpt [method=testSimple]"
   * 3. With description: "Prevent loop in error handling. The #268 regression. | tests/Framework/TestCase.ownErrorHandler.phpt"
   * 4. With class and method: "Kdyby\BootstrapFormRenderer\BootstrapRenderer. | KdybyTests/BootstrapFormRenderer/BootstrapRendererTest.phpt [method=testRenderingBasics]"
   */
  private parseTestCaseName(classname: string): ParsedTestName {
    let filePath = classname
    let method: string | undefined
    let description: string | undefined
    let className: string | undefined

    // Pattern: "Description | filepath [method=methodName]"
    // or "ClassName | filepath [method=methodName]"
    const pipePattern = /^(.+?)\s*\|\s*(.+?)(?:\s*\[method=(.+?)\])?$/
    const pipeMatch = classname.match(pipePattern)

    if (pipeMatch) {
      const prefix = pipeMatch[1].trim()
      filePath = pipeMatch[2].trim()
      method = pipeMatch[3]

      // Check if prefix looks like a class name (contains backslash AND ends with dot)
      // Examples: "Kdyby\BootstrapFormRenderer\BootstrapRenderer."
      // vs description: "Prevent loop in error handling. The #268 regression."
      if (prefix.includes('\\') && prefix.endsWith('.')) {
        className = prefix
      } else {
        description = prefix
      }
    } else {
      // Pattern: "filepath [method=methodName]"
      const methodPattern = /^(.+?)\s*\[method=(.+?)\]$/
      const methodMatch = classname.match(methodPattern)

      if (methodMatch) {
        filePath = methodMatch[1].trim()
        method = methodMatch[2].trim()
      }
    }

    // Generate display name
    const baseName = path.basename(filePath)
    let displayName = baseName

    if (method) {
      displayName = `${baseName}::${method}`
    }

    if (description) {
      displayName = `${description} (${baseName})`
    } else if (className && method) {
      // For class names, keep them but still show the file
      displayName = `${baseName}::${method}`
    }

    return {filePath, method, description, className, displayName}
  }

  private getTestCaseResult(test: TestCase): TestExecutionResult {
    if (test.failure || test.error) return 'failed'
    if (test.skipped) return 'skipped'
    return 'success'
  }

  private getTestCaseError(tc: TestCase, filePath: string): TestCaseError | undefined {
    if (!this.options.parseErrors) {
      return undefined
    }

    // We process <error> and <failure> the same way
    const failures = tc.failure ?? tc.error
    if (!failures || failures.length === 0) {
      return undefined
    }

    const failure = failures[0]
    // For Nette Tester, details are in the message attribute, not as inner text
    const details = typeof failure === 'string' ? failure : failure._ ?? failure.$?.message ?? ''

    // Try to extract file path and line from error details
    let errorFilePath: string | undefined
    let line: number | undefined

    if (details) {
      const extracted = this.extractFileAndLine(details)
      if (extracted) {
        errorFilePath = extracted.filePath
        line = extracted.line
      }
    }

    // Fallback: use test file path if tracked
    if (!errorFilePath) {
      const normalized = normalizeFilePath(filePath)
      if (this.trackedFiles.has(normalized)) {
        errorFilePath = normalized
      }
    }

    let message: string | undefined
    if (typeof failure !== 'string' && failure.$) {
      message = failure.$.message
      if (failure.$.type) {
        message = message ? `${failure.$.type}: ${message}` : failure.$.type
      }
    }

    return {
      path: errorFilePath,
      line,
      details,
      message
    }
  }

  /**
   * Extract file path and line number from error details.
   * Matches patterns like: /path/to/file.phpt:123 or /path/to/file.php:456
   */
  private extractFileAndLine(details: string): {filePath: string; line: number} | undefined {
    const lines = details.split(/\r?\n/)

    for (const str of lines) {
      // Match PHP file patterns: /path/to/file.phpt:123 or /path/to/file.php:456
      const match = str.match(/((?:[A-Za-z]:)?[^\s:()]+?\.(?:php|phpt)):(\d+)/)
      if (match) {
        const normalized = normalizeFilePath(match[1])
        if (this.trackedFiles.has(normalized)) {
          return {filePath: normalized, line: parseInt(match[2])}
        }
      }
    }

    return undefined
  }
}
