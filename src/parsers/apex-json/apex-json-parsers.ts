import {ParseOptions, TestParser} from '../../test-parser'
import {TestRunResult} from '../../test-results'

export class ApexJsonParser implements TestParser {
  constructor(readonly options: ParseOptions) {}

  async parse(path: string, content: string): Promise<TestRunResult> {
    throw new Error('Method not implemented.')
  }
}
