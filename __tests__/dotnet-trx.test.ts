import * as fs from 'fs'
import * as path from 'path'

import {parseDotnetTrx} from '../src/parsers/dotnet-trx/dotnet-trx-parser'
import {ParseOptions} from '../src/parsers/parser-types'

const xmlFixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'dotnet-trx.trx'), {encoding: 'utf8'})
const outputPath = __dirname + '/__outputs__/dotnet-trx.md'

describe('dotnet-trx tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      name: 'Dotnet TRX tests',
      annotations: true,
      trackedFiles: ['DotnetTests.Unit/Calculator.cs', 'DotnetTests.XUnitTests/CalculatorTests.cs'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dotnet/'
    }

    const result = await parseDotnetTrx(xmlFixture, opts)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output).toMatchSnapshot()
  })
})
