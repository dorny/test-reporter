import {ParseOptions} from '../../test-parser'
import {JavaJunitParser} from '../java-junit/java-junit-parser'

export class PythonXunitParser extends JavaJunitParser {
  constructor(readonly options: ParseOptions) {
    super(options)
  }
}
