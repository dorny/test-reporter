import * as fs from 'fs'
import * as path from 'path'

import {DartJsonParser} from '../src/parsers/dart-json/dart-json-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/file-utils'

describe('dart-json tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['lib/main.dart', 'test/main_test.dart', 'test/second_test.dart'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dart/'
    }

    const fixturePath = path.join(__dirname, 'fixtures', 'dart-json.json')
    const outputPath = path.join(__dirname, '__outputs__', 'dart-json.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const parser = new DartJsonParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
