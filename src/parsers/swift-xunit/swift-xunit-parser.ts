import {ParseOptions} from '../../test-parser.js'
import {JavaJunitParser} from '../java-junit/java-junit-parser.js'

export class SwiftXunitParser extends JavaJunitParser {
  constructor(readonly options: ParseOptions) {
    super(options)
  }
}
