import * as fs from 'fs'
import * as path from 'path'

import {GolangJsonParser} from '../src/parsers/golang-json/golang-json-parser.js'
import {ParseOptions} from '../src/test-parser.js'
import {getReport} from '../src/report/get-report.js'
import {normalizeFilePath} from '../src/utils/path-utils.js'

import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('golang-json tests', () => {
  it('report from ./reports/dotnet test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'golang-json.json')
    const outputPath = path.join(__dirname, '__outputs__', 'golang-json.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['calculator.go', 'calculator_test.go']
    }

    const parser = new GolangJsonParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
