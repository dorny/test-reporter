import * as fs from 'fs'
import * as path from 'path'

import {parseDotnetTrx} from '../src/parsers/dotnet-trx/dotnet-trx-parser'
import {ParseOptions} from '../src/parsers/parser-types'

const fixturePath = path.join(__dirname, 'fixtures', 'dotnet-trx.trx')
const outputPath = path.join(__dirname, '__outputs__', 'dotnet-trx.md')
const xmlFixture = {
  path: path.relative(__dirname, fixturePath),
  content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
}

describe('dotnet-trx tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      name: 'Dotnet TRX tests',
      annotations: true,
      trackedFiles: ['DotnetTests.Unit/Calculator.cs', 'DotnetTests.XUnitTests/CalculatorTests.cs'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dotnet/'
    }

    const result = await parseDotnetTrx([xmlFixture], opts)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output).toMatchSnapshot()
  })
})
