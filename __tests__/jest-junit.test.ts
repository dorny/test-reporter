import * as fs from 'fs'
import * as path from 'path'

import {parseJestJunit} from '../src/parsers/jest-junit/jest-junit-parser'
import {ParseOptions} from '../src/parsers/parser-types'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/file-utils'

describe('jest-junit tests', () => {
  it('report from ./reports/jest test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'jest-junit.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'jest-junit.md')
    const xmlFixture = {
      path: normalizeFilePath(path.relative(__dirname, fixturePath)),
      content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
    }

    const opts: ParseOptions = {
      annotations: true,
      trackedFiles: ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js'],
      workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/'
    }

    const result = await parseJestJunit([xmlFixture], opts)
    expect(result).toMatchSnapshot()

    const report = getReport(result.testRuns)
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from facebook/jest test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'jest', 'jest-test-results.xml')
    const filesPath = path.join(__dirname, 'fixtures', 'external', 'jest', 'files.txt')
    const outputPath = path.join(__dirname, '__outputs__', 'jest-test-results.md')
    const xmlFixture = {
      path: normalizeFilePath(path.relative(__dirname, fixturePath)),
      content: fs.readFileSync(fixturePath, {encoding: 'utf8'})
    }

    const trackedFiles = fs.readFileSync(filesPath, {encoding: 'utf8'}).split(/\n\r?/g)
    const opts: ParseOptions = {
      trackedFiles,
      annotations: true,
      workDir: '/home/dorny/dorny/jest/'
    }

    const result = await parseJestJunit([xmlFixture], opts)
    expect(result).toMatchSnapshot()

    const report = getReport(result.testRuns, {listTests: 'only-failed'})
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
