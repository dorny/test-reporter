import * as fs from 'fs'
import * as path from 'path'

import {PytestJunitParser} from '../src/parsers/pytest-junit/pytest-junit-parser'
import {ParseOptions} from '../src/test-parser'
import {normalizeFilePath} from '../src/utils/path-utils'
import {getAnnotations} from '../src/report/get-annotations'

describe('pytest-junit tests', () => {
  it('test with one successful test', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'pytest', 'single-case.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PytestJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(1)
    expect(result.result).toBe('success')
  })

  it('test failure with trace back', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'pytest', 'report-tb-short.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      workDir: 'mnt/extra-addons',
      trackedFiles: ['addons/product_changes/tests/first_test.py']
    }

    const parser = new PytestJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(1)
    expect(result.result).toBe('failed')
    expect(result.failedSuites[0].failedGroups[0].failedTests[0].error).toMatchObject({
      line: 6,
      message: 'assert False'
    })

    const annotations = getAnnotations([result], 1)
    expect(annotations.length).toBe(1)
    expect(annotations[0].path).toBe('addons/product_changes/tests/first_test.py')
  })
})
