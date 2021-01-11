import {ErrorInfo, Outcome, TestMethod, TrxReport} from './dotnet-trx-types'

import {Annotation, ParseOptions, TestResult} from '../parser-types'
import {parseStringPromise} from 'xml2js'

import {parseAttribute} from '../../utils/xml-utils'
import {Icon} from '../../utils/markdown-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult
} from '../../report/test-results'
import getReport from '../../report/get-report'

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

export async function parseDotnetTrx(content: string, options: ParseOptions): Promise<TestResult> {
  const trx = (await parseStringPromise(content, {
    attrValueProcessors: [parseAttribute]
  })) as TrxReport

  const testClasses = getTestClasses(trx)
  const testRun = getTestRunResult(trx, testClasses)
  const success = testRun.result === 'success'
  const icon = success ? Icon.success : Icon.fail

  return {
    success,
    output: {
      title: `${options.name.trim()} ${icon}`,
      summary: getReport(testRun),
      annotations: options.annotations
        ? getAnnotations(/*testClasses, options.workDir, options.trackedFiles*/)
        : undefined
    }
  }
}

function getTestRunResult(trx: TrxReport, testClasses: TestClass[]): TestRunResult {
  const times = trx.TestRun.Times[0].$
  const totalTime = times.finish.getTime() - times.start.getTime()

  const suites = testClasses.map(tc => {
    const tests = tc.tests.map(t => new TestCaseResult(t.name, t.result, t.duration))
    const group = new TestGroupResult(null, tests)
    return new TestSuiteResult(tc.name, [group])
  })

  return new TestRunResult(suites, totalTime)
}

function getTestClasses(trx: TrxReport): TestClass[] {
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
    const test = new Test(r.testMethod.$.name, r.unitTestResult.$.outcome, r.unitTestResult.$.duration, error)
    tc.tests.push(test)
  }

  const result = Object.values(testClasses)
  result.sort((a, b) => a.name.localeCompare(b.name))
  for (const tc of result) {
    tc.tests.sort((a, b) => a.name.localeCompare(b.name))
  }

  return result
}

function getAnnotations(/*testClasses: TestClass[], workDir: string, trackedFiles: string[]*/): Annotation[] {
  return []
}
