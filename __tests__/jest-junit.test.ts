import * as fs from 'fs'
import * as path from 'path'

import {parseJestJunit} from '../src/parsers/jest-junit/jest-junit-parser'
import {ParseOptions} from '../src/parsers/parser-types'
import {normalizeFilePath} from '../src/utils/file-utils'

const fixturePath = path.join(__dirname, 'fixtures', 'jest-junit.xml')
const outputPath = path.join(__dirname, '__outputs__', 'jest-junit.md')
const xmlFixture = {
  path: normalizeFilePath(path.relative(__dirname, fixturePath)),
  content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
}

describe('jest-junit tests', () => {
  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      name: 'jest tests',
      annotations: true,
      trackedFiles: ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/'
    }

    const result = await parseJestJunit([xmlFixture], opts)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, result?.output?.summary ?? '')

    expect(result.success).toBeFalsy()
    expect(result?.output).toMatchSnapshot()
  })
})
