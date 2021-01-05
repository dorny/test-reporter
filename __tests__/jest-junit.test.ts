import * as fs from 'fs'
import * as path from 'path'

import {parseJestJunit} from '../src/parsers/jest-junit/jest-junit-parser'
import {ParseOptions} from '../src/parsers/test-parser'

const xmlFixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'jest-junit.xml'), {encoding: 'utf8'})
const outputPath = __dirname + '/__outputs__/jest-junit.md'

describe('jest-junit tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      name: 'unused',
      annotations: true,
      trackedFiles: ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/'
    }

    const result = await parseJestJunit(xmlFixture, opts)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output).toMatchSnapshot()
  })
})
