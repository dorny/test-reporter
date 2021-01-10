import * as fs from 'fs'
import * as path from 'path'

import {parseDartJson} from '../src/parsers/dart-json/dart-json-parser'
import {ParseOptions} from '../src/parsers/parser-types'

const xmlFixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'dart-json.json'), {encoding: 'utf8'})
const outputPath = __dirname + '/__outputs__/dart-json.md'

describe('dart-json tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      name: 'Dart tests',
      annotations: true,
      trackedFiles: ['lib/main.dart', 'test/main_test.dart', 'test/second_test.dart'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dart/'
    }

    const result = await parseDartJson(xmlFixture, opts)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output).toMatchSnapshot()
  })
})
