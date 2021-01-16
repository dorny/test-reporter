import * as fs from 'fs'
import * as path from 'path'

import {parseDartJson} from '../src/parsers/dart-json/dart-json-parser'
import {ParseOptions} from '../src/parsers/parser-types'
import {normalizeFilePath} from '../src/utils/file-utils'

const fixturePath = path.join(__dirname, 'fixtures', 'dart-json.json')
const outputPath = path.join(__dirname, '__outputs__', 'dart-json.md')
const xmlFixture = {
  path: normalizeFilePath(path.relative(__dirname, fixturePath)),
  content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
}

describe('dart-json tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      name: 'Dart tests',
      annotations: true,
      trackedFiles: ['lib/main.dart', 'test/main_test.dart', 'test/second_test.dart'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dart/'
    }

    const result = await parseDartJson([xmlFixture], opts)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output).toMatchSnapshot()
  })
})
