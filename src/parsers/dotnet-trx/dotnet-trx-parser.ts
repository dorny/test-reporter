import {parseStringPromise} from 'xml2js'

import {ErrorInfo, Outcome, TrxReport, UnitTest, UnitTestResult} from './dotnet-trx-types.js'
import {ParseOptions, TestParser} from '../../test-parser.js'

import {getBasePath, normalizeFilePath} from '../../utils/path-utils.js'
import {parseIsoDate, parseNetDuration} from '../../utils/parse-utils.js'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results.js'

// The only place a trx outcome becomes a test result. Outcomes VSTest emits but
// this parser does not name (Timeout, Aborted, Error, NotRunnable and the rest)
// must not be reported as passing tests, so they fail like a Failed test does.
function getOutcomeResult(outcome: Outcome): TestExecutionResult {
  switch (outcome) {
    // PassedButRunAborted is a test that passed. The aborted run is reported
    // by getRunFailure instead of by failing tests that did their job.
    case 'Passed':
    case 'PassedButRunAborted':
      return 'success'
    // Inconclusive is what Assert.Inconclusive produces: a test that opted out
    case 'NotExecuted':
    case 'Inconclusive':
      return 'skipped'
    default:
      return 'failed'
  }
}

class TestClass {
  constructor(readonly name: string) {}
  readonly tests: Test[] = []
}

class Test {
  constructor(
    readonly name: string,
    readonly outcome: Outcome,
    readonly duration: number,
    readonly error?: ErrorInfo
  ) {}

  get result(): TestExecutionResult {
    return getOutcomeResult(this.outcome)
  }
}

export class DotnetTrxParser implements TestParser {
  assumedWorkDir: string | undefined

  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    const trx = await this.getTrxReport(path, content)
    const tc = this.getTestClasses(trx)
    const tr = this.getTestRunResult(path, trx, tc)
    tr.sort(true)
    return tr
  }

  private async getTrxReport(path: string, content: string): Promise<TrxReport> {
    try {
      return (await parseStringPromise(content)) as TrxReport
    } catch (e) {
      throw new Error(`Invalid XML at ${path}\n\n${e}`)
    }
  }

  private getTestClasses(trx: TrxReport): TestClass[] {
    if (
      trx.TestRun.TestDefinitions === undefined ||
      trx.TestRun.Results === undefined ||
      !trx.TestRun.TestDefinitions.some(td => td.UnitTest && Array.isArray(td.UnitTest))
    ) {
      return []
    }

    const unitTests: {[id: string]: UnitTest} = {}
    for (const td of trx.TestRun.TestDefinitions) {
      for (const ut of td.UnitTest) {
        unitTests[ut.$.id] = ut
      }
    }

    const unitTestsResults = trx.TestRun.Results.flatMap(r => r.UnitTestResult).flatMap(result => ({
      result,
      test: unitTests[result.$.testId]
    }))

    const testClasses: {[name: string]: TestClass} = {}
    for (const r of unitTestsResults) {
      const className = r.test.TestMethod[0].$.className ?? 'Unclassified'
      let tc = testClasses[className]
      if (tc === undefined) {
        tc = new TestClass(className)
        testClasses[tc.name] = tc
      }
      const error = this.getErrorInfo(r.result)
      const durationAttr = r.result.$.duration
      const duration = durationAttr ? parseNetDuration(durationAttr) : 0

      const resultTestName = r.result.$.testName
      const testName =
        resultTestName.startsWith(className) && resultTestName[className.length] === '.'
          ? resultTestName.substring(className.length + 1)
          : resultTestName

      const test = new Test(testName, r.result.$.outcome, duration, error)
      tc.tests.push(test)
    }

    const result = Object.values(testClasses)
    return result
  }

  private getTestRunResult(path: string, trx: TrxReport, testClasses: TestClass[]): TestRunResult {
    const times = trx.TestRun.Times[0].$
    const totalTime = parseIsoDate(times.finish).getTime() - parseIsoDate(times.start).getTime()

    const suites = testClasses.map(testClass => {
      const tests = testClass.tests.map(test => {
        const error = this.getError(test)
        return new TestCaseResult(test.name, test.result, test.duration, error)
      })
      const group = new TestGroupResult(null, tests)
      return new TestSuiteResult(testClass.name, [group])
    })

    const runFailure = this.getRunFailure(trx, suites)
    if (runFailure) {
      suites.push(runFailure)
    }

    return new TestRunResult(path, suites, totalTime)
  }

  // A test run can fail without any single test failing: the test host crashes,
  // the run is aborted or times out. The run outcome is then the only record of
  // it, and reporting such a run as successful hides the failure completely.
  // When tests did fail, they already report it and this adds nothing.
  private getRunFailure(trx: TrxReport, suites: TestSuiteResult[]): TestSuiteResult | undefined {
    const summary = trx.TestRun.ResultSummary?.[0]
    const outcome = summary?.$?.outcome
    if (outcome === undefined || outcome === 'Completed' || outcome === 'Passed') {
      return undefined
    }
    if (suites.some(s => s.result === 'failed')) {
      return undefined
    }

    const details = (summary?.RunInfos ?? [])
      .flatMap(infos => infos.RunInfo ?? [])
      .filter(info => getOutcomeResult(info.$.outcome) === 'failed')
      .flatMap(info => info.Text ?? [])
      .join('\n')
      .trim()

    const message = `Test run finished with outcome ${outcome} and no failing test`
    const error: TestCaseError | undefined = this.options.parseErrors
      ? {message, details: details.length > 0 ? details : message}
      : undefined

    const test = new TestCaseResult(`Test run outcome: ${outcome}`, 'failed', 0, error)
    return new TestSuiteResult('Test run', [new TestGroupResult(null, [test])], 0)
  }

  private getErrorInfo(testResult: UnitTestResult): ErrorInfo | undefined {
    if (getOutcomeResult(testResult.$.outcome) !== 'failed') {
      return undefined
    }

    const output = testResult.Output
    const error = output?.length > 0 && output[0].ErrorInfo?.length > 0 ? output[0].ErrorInfo[0] : undefined
    return error
  }

  private getError(test: Test): TestCaseError | undefined {
    if (!this.options.parseErrors || !test.error) {
      return undefined
    }

    const error = test.error
    if (
      !Array.isArray(error.Message) ||
      error.Message.length === 0 ||
      !Array.isArray(error.StackTrace) ||
      error.StackTrace.length === 0
    ) {
      return undefined
    }

    const stackTrace = test.error.StackTrace[0]
    const message = `${test.error.Message[0]}\n${stackTrace}`
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
      message,
      details: `${message}`
    }
  }

  private exceptionThrowSource(stackTrace: string): {path: string; line: number} | undefined {
    const lines = stackTrace.split(/\r*\n/)
    const re = / in (.+):line (\d+)$/
    const {trackedFiles} = this.options

    for (const str of lines) {
      const match = str.match(re)
      if (match !== null) {
        const [_, fileStr, lineStr] = match
        const filePath = normalizeFilePath(fileStr)
        const workDir = this.getWorkDir(filePath)
        if (workDir) {
          const file = filePath.substring(workDir.length)
          if (trackedFiles.includes(file)) {
            const line = parseInt(lineStr)
            return {path: file, line}
          }
        }
      }
    }
  }

  private getWorkDir(path: string): string | undefined {
    return (
      this.options.workDir ??
      this.assumedWorkDir ??
      (this.assumedWorkDir = getBasePath(path, this.options.trackedFiles))
    )
  }
}
