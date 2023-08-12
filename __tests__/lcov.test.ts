import * as fs from 'fs'
import * as path from 'path'

import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'
import { LcovParser } from "../src/parsers/lcov-json/lcov-parser";

describe('lcov report coverage', () => {

  it('report from facebook/jest test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'lcov.json')
    const outputPath = path.join(__dirname, '__outputs__', 'lcov-report-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})


    const parser = new LcovParser()
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
