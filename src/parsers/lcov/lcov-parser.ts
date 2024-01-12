import {ParseOptions, TestParser} from '../../test-parser'

import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../test-results'
import {parseProm} from './lcov-utils'
import {LcovBranch, LcovFile, LcovFunc, LcovLine, LcovPart} from 'lcov-parse'

export class LcovParser implements TestParser {
  constructor(readonly options: ParseOptions) {}
  async parse(path: string, content: string): Promise<TestRunResult> {
    const report = await this.parseFile(path, content)
    return this.getTestRunResult(path, report)
  }

  private parseFile(path: string, content: string): Promise<LcovFile[]> {
    try {

      return parseProm(content)
      //return JSON.parse(content) as LcovReport
    } catch (e) {
      throw new Error(`Invalid JSON at ${path}\n\n${e}`)
    }
  }
  private async getTestRunResult(path: string, report: LcovFile[]): Promise<TestRunResult> {
    const suites: TestSuiteResult[] = []

    for (let reportElement of report) {
      const fileName = reportElement.file

      const statementCaseResult: TestCaseResult = {
        name: `lines ${this.getPartInfo(reportElement.lines)}`,
        time: 0,
        result: this.getPercentage(reportElement.lines) >= 80 ? 'success' : 'failed'
      }
      const fonctionCaseResult: TestCaseResult = {
        name: `functions ${this.getPartInfo(reportElement.functions)}`,
        time: 0,
        result: this.getPercentage(reportElement.functions) >= 80 ? 'success' : 'failed'
      }
      const brancheCaseResult: TestCaseResult = {
        name: `branches ${this.getPartInfo(reportElement.branches)}`,
        time: 0,
        result: this.getPercentage(reportElement.branches) >= 80 ? 'success' : 'failed'
      }


      const testCases: TestCaseResult[] = [statementCaseResult, fonctionCaseResult, brancheCaseResult]
      const groups: TestGroupResult[] = [new TestGroupResult(fileName, testCases)]
      const suite: TestSuiteResult = new TestSuiteResult(fileName, groups)

      suites.push(suite)
    }
    return new TestRunResult(path, suites)
  }

  private getPercentage(stat: LcovPart<LcovLine | LcovFunc | LcovBranch>): number {
    return stat ? stat.hit/ stat.found * 100 : 100;
  }
  private getPartInfo(stat: LcovPart<LcovLine | LcovFunc | LcovBranch>): string {
    return `${this.getPercentage(stat)}% (${stat.hit}/${stat.found})`;
  }

}
