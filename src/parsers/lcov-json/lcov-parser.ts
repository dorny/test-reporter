import {ParseOptions, TestParser} from '../../test-parser'

import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../test-results'
import {CovParsedStat, CovStats, LcovReport} from './lcov-types'

export class LcovParser implements TestParser {
  constructor(readonly options: ParseOptions) {}
  async parse(path: string, content: string): Promise<TestRunResult> {
    const report = this.parseFile(path, content)
    return this.getTestRunResult(path, report)
  }

  private parseFile(path: string, content: string): LcovReport {
    try {
      return JSON.parse(content) as LcovReport
    } catch (e) {
      throw new Error(`Invalid JSON at ${path}\n\n${e}`)
    }
  }
  private async getTestRunResult(path: string, report: LcovReport): Promise<TestRunResult> {
    const suites: TestSuiteResult[] = []

    for (const key of Object.keys(report)) {
      const s: CovParsedStat = this.getParsedStat(report[key].s)
      const f: CovParsedStat = this.getParsedStat(report[key].f)
      const b: CovParsedStat = this.getParsedStat(report[key].b)

      const statementCaseResult: TestCaseResult = {
        name: 'statement',
        time: 0,
        result: s.percentage >= 80 ? 'success' : 'failed'
      }
      const fonctionCaseResult: TestCaseResult = {
        name: 'fonction',
        time: 0,
        result: f.percentage >= 80 ? 'success' : 'failed'
      }
      const brancheCaseResult: TestCaseResult = {
        name: 'branche',
        time: 0,
        result: b.percentage >= 80 ? 'success' : 'failed'
      }

      const testCases: TestCaseResult[] = [statementCaseResult, fonctionCaseResult, brancheCaseResult]
      const goups: TestGroupResult[] = [new TestGroupResult(key, testCases)]
      const suite: TestSuiteResult = new TestSuiteResult(key, goups)

      suites.push(suite)
      console.log({key, s, f, b})
    }

    return new TestRunResult(path, suites)
  }

  private getParsedStat(stat: CovStats): CovParsedStat {
    const max = Object.keys(stat).length
    const nonCovered = this.zeroLength(stat)
    const percentage = ((max - nonCovered) / max) * 100

    return {max, nonCovered, percentage}
  }
  private zeroLength(report: CovStats): number {
    return Object.keys(report).filter(key => report[key] === 0).length
  }
}
