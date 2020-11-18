import * as fs from 'fs'
import * as path from 'path'

import {parseJestJunit} from '../src/parsers/jest-junit/jest-junit-parser'

const xmlFixture = fs.readFileSync(path.join(__dirname, 'fixtures', 'jest-junit.xml'), {encoding: 'utf8'})
const outputPath = __dirname + '/__outputs__/jest-junit.md'

describe('jest-junit tests', () => {
  it('matches report snapshot', async () => {
    const result = await parseJestJunit(xmlFixture)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output?.summary).toMatchSnapshot()
  })
})
