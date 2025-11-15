import * as fs from 'fs'
import * as path from 'path'

import {PythonXunitParser} from '../src/parsers/python-xunit/python-xunit-parser'
import {ParseOptions} from '../src/test-parser'
import {DEFAULT_OPTIONS, getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

const defaultOpts: ParseOptions = {
  parseErrors: true,
  trackedFiles: []
}

describe('python-xunit unittest report', () => {
  const fixturePath = path.join(__dirname, 'fixtures', 'python-xunit-unittest.xml')
  const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
  const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
  const outputPath = path.join(__dirname, '__outputs__', 'python-xunit-unittest.md')

  it('report from python test results matches snapshot', async () => {
    const trackedFiles = ['tests/test_lib.py']
    const opts: ParseOptions = {
      ...defaultOpts,
      trackedFiles
    }

    const parser = new PythonXunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report does not include a title by default', async () => {
    const parser = new PythonXunitParser(defaultOpts)
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
    const parser = new PythonXunitParser(defaultOpts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle
    })
    // Report should have the badge as the first line
    expect(report).toMatch(/^!\[Tests failed]/)
  })

  it('report includes a custom report title', async () => {
    const parser = new PythonXunitParser(defaultOpts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle: 'My Custom Title'
    })
    // Report should have the title as the first line
    expect(report).toMatch(/^# My Custom Title\n/)
  })
})

describe('python-xunit pytest report', () => {
  const fixturePath = path.join(__dirname, 'fixtures', 'python-xunit-pytest.xml')
  const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
  const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
  const outputPath = path.join(__dirname, '__outputs__', 'python-xunit-pytest.md')

  it('report from python test results matches snapshot', async () => {
    const trackedFiles = ['tests/test_lib.py']
    const opts: ParseOptions = {
      ...defaultOpts,
      trackedFiles
    }

    const parser = new PythonXunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
