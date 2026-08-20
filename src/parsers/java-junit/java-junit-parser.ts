import * as path from 'path'
import {ParseOptions, TestParser} from '../../test-parser'
import {parseStringPromise} from 'xml2js'

import {JunitReport, SingleSuiteReport, TestCase, TestSuite} from './java-junit-types'
import {parseStackTraceElement} from './java-stack-trace-element-parser'
import {normalizeFilePath} from '../../utils/path-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

export class JavaJunitParser implements TestParser {
  readonly trackedFiles: {[fileName: string]: string[]}

  constructor(readonly options: ParseOptions) {
    // Map to efficient lookup of all paths with given file name
    this.trackedFiles = {}
    for (const filePath of options.trackedFiles) {
      const fileName = path.basename(filePath)
      const files = this.trackedFiles[fileName] ?? (this.trackedFiles[fileName] = [])
      files.push(normalizeFilePath(filePath))
    }
  }

  async parse(filePath: string, content: string): Promise<TestRunResult> {
    const reportOrSuite = await this.getJunitReport(filePath, content)
    const isReport = (reportOrSuite as JunitReport).testsuites !== undefined

    // XML might contain:
    // - multiple suites under <testsuites> root node
    // - single <testsuite> as root node
    let ju: JunitReport
    if (isReport) {
      ju = reportOrSuite as JunitReport
    } else {
      // Make it behave the same way as if suite was inside <testsuites> root node
      const suite = (reportOrSuite as SingleSuiteReport).testsuite
      ju = {
        testsuites: {
          $: {time: suite.$.time},
          testsuite: [suite]
        }
      }
    }

    return this.getTestRunResult(filePath, ju)
  }

  private async getJunitReport(filePath: string, content: string): Promise<JunitReport | SingleSuiteReport> {
    try {
      return await parseStringPromise(content)
    } catch (e) {
      throw new Error(`Invalid XML at ${filePath}\n\n${e}`)
    }
  }

  private getTestRunResult(filePath: string, junit: JunitReport): TestRunResult {
    const suites =
      junit.testsuites.testsuite === undefined
        ? []
        : junit.testsuites.testsuite.map(ts => {
            const name = ts.$.name.trim()
            const time = parseFloat(ts.$.time) * 1000
            const sr = new TestSuiteResult(name, this.getGroups(ts), time)
            return sr
          })

    const seconds = parseFloat(junit.testsuites.$?.time)
    const time = isNaN(seconds) ? undefined : seconds * 1000
    return new TestRunResult(filePath, suites, time)
  }

  private getGroups(suite: TestSuite): TestGroupResult[] {
    const testcases = this.mergeRepetitions(this.getTestCases(suite))
    if (testcases.length === 0) {
      return []
    }

    const groups: {name: string; tests: TestCase[]}[] = []
    for (const tc of testcases) {
      // Normally classname is same as suite name - both refer to same Java class
      // Therefore it doesn't make sense to process it as a group
      // and tests will be added to default group with empty name
      const className = tc.$.classname === suite.$.name ? '' : tc.$.classname
      let grp = groups.find(g => g.name === className)
      if (grp === undefined) {
        grp = {name: className, tests: []}
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
        return new TestCaseResult(name, result, time, error, tc.retries ?? 0)
      })
      return new TestGroupResult(grp.name, tests)
    })
  }

  // Some reporters nest a <testsuite> per class inside a <testsuite> per module or
  // build target, several levels deep — fastlane's trainer emits target/bundle/class
  // for Xcode results. Reading only the direct children of the suites listed under
  // <testsuites> then finds no test cases at all and reports the run as empty.
  // A runner that repeats a failing test writes one <testcase> per attempt, so a
  // test that failed once and passed on the retry counts as both a failure and a
  // pass. The run it belongs to already reported that test as passed — it is the
  // last attempt that decides — and a report that disagrees turns every retried
  // flake into a red build.
  //
  // Attempts are merged into the one result the runner settled on, keeping the
  // count of extra attempts so the flake stays visible, and the first failure's
  // error so its evidence is not lost.
  //
  // Attempts are identified by the `repetition` property and told apart by its
  // value: a real sequence reads "First Run", "Retry 1", "Retry 2". Consecutive
  // cases repeating the *same* value are not attempts at all — a generator that
  // expands a parameterized test into one case per argument can emit each of them
  // once per repetition of the whole function, so every argument appears N times
  // labelled "First Run". Those are folded to one without counting a retry, which
  // is also what keeps the report's test count from running ahead of the run's.
  private mergeRepetitions(testcases: TestCase[]): TestCase[] {
    const merged: TestCase[] = []

    for (const tc of testcases) {
      const previous = merged[merged.length - 1]
      const repetition = this.getRepetition(tc)
      if (previous === undefined || repetition === undefined || !this.isSameTest(previous, tc)) {
        merged.push(repetition === undefined ? tc : {...tc, lastRepetition: repetition})
        continue
      }

      const isNewAttempt = previous.lastRepetition !== repetition
      merged[merged.length - 1] = {
        ...tc,
        lastRepetition: repetition,
        // The attempt kept is the last one, because that is the one the runner
        // reported. Its failure, if any, still reaches `getTestCaseError` the
        // normal way; `retainedFailure` only carries an earlier attempt's, for
        // the case where the last one passed and would otherwise report nothing.
        retainedFailure: previous.failure ?? previous.error ?? previous.retainedFailure,
        retries: (previous.retries ?? 0) + (isNewAttempt ? 1 : 0)
      }
    }

    return merged
  }

  private isSameTest(previous: TestCase, tc: TestCase): boolean {
    return (
      previous.lastRepetition !== undefined &&
      previous.$.name === tc.$.name &&
      previous.$.classname === tc.$.classname
    )
  }

  private getRepetition(tc: TestCase): string | undefined {
    for (const properties of tc.properties ?? []) {
      const repetition = properties.property?.find(prop => prop.$.name === 'repetition')
      if (repetition !== undefined) {
        return repetition.$.value
      }
    }
    return undefined
  }

  private getTestCases(suite: TestSuite): TestCase[] {
    const nested = suite.testsuite?.flatMap(inner => this.getTestCases(inner)) ?? []
    return [...(suite.testcase ?? []), ...nested]
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
    const failures = tc.failure ?? tc.error ?? tc.retainedFailure
    if (!failures) {
      return undefined
    }

    const failure = failures[0]
    const details = typeof failure === 'object' ? failure._ : failure
    let filePath
    let line

    if (details != null) {
      const src = this.exceptionThrowSource(details)
      if (src) {
        filePath = src.filePath
        line = src.line
      }
    }

    let message
    if (typeof failure === 'object') {
      message = failure.$.message
      if (failure.$?.type) {
        message = failure.$.type + ': ' + message
      }
    }
    return {
      path: filePath,
      line,
      details,
      message
    }
  }

  private exceptionThrowSource(stackTrace: string): {filePath: string; line: number} | undefined {
    const lines = stackTrace.split(/\r?\n/)

    for (const str of lines) {
      const stackTraceElement = parseStackTraceElement(str)
      if (stackTraceElement) {
        const {tracePath, fileName, lineStr} = stackTraceElement
        const filePath = this.getFilePath(tracePath, fileName)
        if (filePath !== undefined) {
          const line = parseInt(lineStr)
          return {filePath, line}
        }
      }
    }
  }

  // Stacktrace in Java doesn't contain full paths to source file.
  // There are only package, file name and line.
  // Assuming folder structure matches package name (as it should in Java),
  // we can try to match tracked file.
  private getFilePath(tracePath: string, fileName: string): string | undefined {
    // Check if there is any tracked file with given name
    const files = this.trackedFiles[fileName]
    if (files === undefined) {
      return undefined
    }

    // Remove class name and method name from trace.
    // Take parts until first item with capital letter - package names are lowercase while class name is CamelCase.
    const packageParts = tracePath.split(/\./g)
    const packageIndex = packageParts.findIndex(part => part[0] <= 'Z')
    if (packageIndex !== -1) {
      packageParts.splice(packageIndex, packageParts.length - packageIndex)
    }

    if (packageParts.length === 0) {
      return undefined
    }

    // Get right file
    // - file name matches
    // - parent folders structure must reflect the package name
    for (const filePath of files) {
      const dirs = path.dirname(filePath).split(/\//g)
      if (packageParts.length > dirs.length) {
        continue
      }
      // get only N parent folders, where N = length of package name parts
      if (dirs.length > packageParts.length) {
        dirs.splice(0, dirs.length - packageParts.length)
      }
      // check if parent folder structure matches package name
      const isMatch = packageParts.every((part, i) => part === dirs[i])
      if (isMatch) {
        return filePath
      }
    }

    return undefined
  }
}
