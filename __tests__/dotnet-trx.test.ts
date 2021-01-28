import * as fs from 'fs'
import * as path from 'path'

import {parseDotnetTrx} from '../src/parsers/dotnet-trx/dotnet-trx-parser'
import {ParseOptions} from '../src/parsers/parser-types'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/file-utils'

describe('dotnet-trx tests', () => {
  it('matches report snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'dotnet-trx.trx')
    const outputPath = path.join(__dirname, '__outputs__', 'dotnet-trx.md')
    const xmlFixture = {
      path: normalizeFilePath(path.relative(__dirname, fixturePath)),
      content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
    }

    const opts: ParseOptions = {
      annotations: true,
      trackedFiles: ['DotnetTests.Unit/Calculator.cs', 'DotnetTests.XUnitTests/CalculatorTests.cs'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dotnet/'
    }

    const result = await parseDotnetTrx([xmlFixture], opts)
    expect(result).toMatchSnapshot()

    const report = getReport(result.testRuns)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from FluentValidation test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'FluentValidation.Tests.trx')
    const outputPath = path.join(__dirname, '__outputs__', 'fluent-validation-test-results.md')
    const xmlFixture = {
      path: normalizeFilePath(path.relative(__dirname, fixturePath)),
      content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
    }

    const opts: ParseOptions = {
      trackedFiles: [],
      annotations: true,
      workDir: ''
    }

    const result = await parseDotnetTrx([xmlFixture], opts)
    expect(result).toMatchSnapshot()

    const report = getReport(result.testRuns, {listTests: 'failed'})
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
