import * as fs from 'fs'
import * as path from 'path'

import {DartJsonParser} from '../src/parsers/dart-json/dart-json-parser'
import {ParseOptions} from '../src/test-parser'
import {DEFAULT_OPTIONS, getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('dart-json tests', () => {
  it('produces empty test run result when there are no test cases', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'dart-json.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new DartJsonParser(opts, 'dart')
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('matches report snapshot', async () => {
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['lib/main.dart', 'test/main_test.dart', 'test/second_test.dart']
      //workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/dart/'
    }

    const fixturePath = path.join(__dirname, 'fixtures', 'dart-json.json')
    const outputPath = path.join(__dirname, '__outputs__', 'dart-json.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const parser = new DartJsonParser(opts, 'dart')
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from rrousselGit/provider test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'flutter', 'provider-test-results.json')
    const trackedFilesPath = path.join(__dirname, 'fixtures', 'external', 'flutter', 'files.txt')
    const outputPath = path.join(__dirname, '__outputs__', 'provider-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles = fs.readFileSync(trackedFilesPath, {encoding: 'utf8'}).split(/\n\r?/g)
    const opts: ParseOptions = {
      trackedFiles,
      parseErrors: true
      //workDir: '/__w/provider/provider/'
    }

    const parser = new DartJsonParser(opts, 'flutter')
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report does not include a title by default', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'dart-json.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new DartJsonParser(opts, 'dart')
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result])
    // Report should have the badge as the first line
    expect(report).toMatch(/^!\[Tests failed]/)
  })

  it.each([
    ['empty string', ''],
    ['space', ' '],
    ['tab', '\t'],
    ['newline', '\n']
  ])('report does not include a title when configured value is %s', async (_, reportTitle) => {
    const fixturePath = path.join(__dirname, 'fixtures', 'dart-json.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new DartJsonParser(opts, 'dart')
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle
    })
    // Report should have the badge as the first line
    expect(report).toMatch(/^!\[Tests failed]/)
  })

  it('report includes a custom report title', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'dart-json.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new DartJsonParser(opts, 'dart')
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle: 'My Custom Title'
    })
    // Report should have the title as the first line
    expect(report).toMatch(/^# My Custom Title\n/)
  })
})
