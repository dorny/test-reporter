import * as fs from 'fs'
import * as path from 'path'

import {DotNetNunitParser} from '../src/parsers/dotnet-nunit/dotnet-nunit-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('dotnet-nunit tests', () => {
  it('report from ./reports/dotnet test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'dotnet-nunit.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'dotnet-nunit.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['DotnetTests.Unit/Calculator.cs', 'DotnetTests.NUnitV3Tests/CalculatorTests.cs']
    }

    const parser = new DotNetNunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
