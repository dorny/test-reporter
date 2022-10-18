import * as fs from 'fs'
import * as path from 'path'

import {GoJunitParser} from '../src/parsers/go-junit/go-junit-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('go-junit tests', () => {
  it('produces empty test run result when there are no test cases', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'jest-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new GoJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('report from ./external/go-junit-report test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'go', 'go-junit-report.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'go-junit-report-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js']
      //workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/'
    }

    const parser = new GoJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from ./external/ginkgo test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'go', 'ginkgo-junit-report.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'ginkgo-junit-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js']
      //workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/jest/'
    }

    const parser = new GoJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
