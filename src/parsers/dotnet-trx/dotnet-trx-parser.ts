import * as core from '@actions/core'
import {ErrorInfo, Outcome, TestMethod, TrxReport} from './dotnet-trx-types'

import {Annotation, FileContent, ParseOptions, TestResult} from '../parser-types'
import {parseStringPromise} from 'xml2js'

import {normalizeFilePath} from '../../utils/file-utils'
import {parseAttribute} from '../../utils/xml-utils'
import {Icon, fixEol} from '../../utils/markdown-utils'

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

export async function parseDotnetTrx(files: FileContent[], options: ParseOptions): Promise<TestResult> {
  const testRuns: TestRunResult[] = []
  const testClasses: TestClass[] = []

  for (const file of files) {
    const trx = await getTrxReport(file)
    const tc = getTestClasses(trx)
    const tr = getTestRunResult(file.path, trx, tc)
    testRuns.push(tr)
    testClasses.push(...tc)
  }

  const success = testRuns.every(tr => tr.result === 'success')
  const icon = success ? Icon.success : Icon.fail

  return {
    success,
    output: {
      title: `${options.name.trim()} ${icon}`,
      summary: getReport(testRuns),
      annotations: options.annotations ? getAnnotations(testClasses, options.workDir, options.trackedFiles) : undefined
    }
  }
}

async function getTrxReport(file: FileContent): Promise<TrxReport> {
  core.info(`Parsing content of '${file.path}'`)
  try {
    return (await parseStringPromise(file.content, {
      attrValueProcessors: [parseAttribute]
    })) as TrxReport
  } catch (e) {
    throw new Error(`Invalid XML at ${file.path}\n\n${e}`)
  }
}

function getTestRunResult(path: string, trx: TrxReport, testClasses: TestClass[]): TestRunResult {
  const times = trx.TestRun.Times[0].$
  const totalTime = times.finish.getTime() - times.start.getTime()

  const suites = testClasses.map(tc => {
    const tests = tc.tests.map(t => new TestCaseResult(t.name, t.result, t.duration))
    const group = new TestGroupResult(null, tests)
    return new TestSuiteResult(tc.name, [group])
  })

  return new TestRunResult(path, suites, totalTime)
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

function getAnnotations(testClasses: TestClass[], workDir: string, trackedFiles: string[]): Annotation[] {
  const annotations: Annotation[] = []
  for (const tc of testClasses) {
    for (const t of tc.tests) {
      if (t.error) {
        const src = exceptionThrowSource(t.error.StackTrace[0], workDir, trackedFiles)
        if (src === null) {
          continue
        }
        annotations.push({
          annotation_level: 'failure',
          start_line: src.line,
          end_line: src.line,
          path: src.file,
          message: fixEol(t.error.Message[0]),
          title: `[${tc.name}] ${t.name}`
        })
      }
    }
  }
  return annotations
}

export function exceptionThrowSource(
  ex: string,
  workDir: string,
  trackedFiles: string[]
): {file: string; line: number} | null {
  const lines = ex.split(/\r*\n/)
  const re = / in (.+):line (\d+)$/

  for (const str of lines) {
    const match = str.match(re)
    if (match !== null) {
      const [_, fileStr, lineStr] = match
      const filePath = normalizeFilePath(fileStr)
      const file = filePath.startsWith(workDir) ? filePath.substr(workDir.length) : filePath
      if (trackedFiles.includes(file)) {
        const line = parseInt(lineStr)
        return {file, line}
      }
    }
  }

  return null
}
