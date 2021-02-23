import {parseStringPromise} from 'xml2js'

import {ErrorInfo, Outcome, TestMethod, TrxReport} from './dotnet-trx-types'
import {ParseOptions, TestParser} from '../../test-parser'

import {getBasePath, normalizeFilePath} from '../../utils/path-utils'
import {parseIsoDate, parseNetDuration} from '../../utils/parse-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

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

  get result(): TestExecutionResult | undefined {
    switch (this.outcome) {
      case 'Passed':
        return 'success'
      case 'NotExecuted':
        return 'skipped'
      case 'Failed':
        return 'failed'
    }
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
    const unitTests: {[id: string]: TestMethod} = {}
    for (const td of trx.TestRun.TestDefinitions) {
      for (const ut of td.UnitTest) {
        unitTests[ut.$.id] = ut.TestMethod[0]
      }
    }

    const unitTestsResults = trx.TestRun.Results.flatMap(r => r.UnitTestResult).flatMap(unitTestResult => ({
      unitTestResult,
      testMethod: unitTests[unitTestResult.$.testId]
    }))

    const testClasses: {[name: string]: TestClass} = {}
    for (const r of unitTestsResults) {
      let tc = testClasses[r.testMethod.$.className]
      if (tc === undefined) {
        tc = new TestClass(r.testMethod.$.className)
        testClasses[tc.name] = tc
      }
      const output = r.unitTestResult.Output
      const error = output?.length > 0 && output[0].ErrorInfo?.length > 0 ? output[0].ErrorInfo[0] : undefined
      const duration = parseNetDuration(r.unitTestResult.$.duration)
      const test = new Test(r.testMethod.$.name, r.unitTestResult.$.outcome, duration, error)
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

    return new TestRunResult(path, suites, totalTime)
  }

  private getError(test: Test): TestCaseError | undefined {
    if (!this.options.parseErrors || !test.error) {
      return undefined
    }

    const message = test.error.Message[0]
    const stackTrace = test.error.StackTrace[0]
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
      details: `${message}\n${stackTrace}`
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
          const file = filePath.substr(workDir.length)
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
