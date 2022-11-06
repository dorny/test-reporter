import * as fs from 'fs'
import * as path from 'path'

import {DotnetNunitParser as DotnetNunitParser} from '../src/parsers/dotnet-nunit/dotnet-nunit-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport, ReportOptions} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('dotnet-nunit tests', () => {
  it('report parses without errors', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'dotnet', 'nunit-test-results.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'dotnet-nunit-tests-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new DotnetNunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'dotnet', 'nunit-test-results.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'dotnet-nunit-tests-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new DotnetNunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
