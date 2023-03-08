import * as fs from 'fs'
import * as path from 'path'

import { JestJunitParser } from '../src/parsers/jest-junit/jest-junit-parser'
import { ParseOptions } from '../src/test-parser'
import { normalizeFilePath } from '../src/utils/path-utils'

describe('pytest-junit tests', () => {
  it('test with one successful test', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'pytest', 'pytest-single-case.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, { encoding: 'utf8' })

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JestJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(1)
    expect(result.result).toBe('success')
  })
})
