import * as fs from 'fs'
import * as path from 'path'

import {KarmaJunitParser} from '../src/parsers/karma-junit/karma-junit-parser'
import {ParseOptions} from '../src/test-parser'
import {DEFAULT_OPTIONS, getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('karma-junit tests', () => {
  it('produces empty test run result when there are no test cases in the testsuites element', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('produces empty test run result when there are no test cases in a nested testsuite element', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'karma-junit-empty-testsuite.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('report from ./reports/karma test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'karma-junit.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['__tests__/main.test.js', '__tests__/second.test.js', 'lib/main.js']
      //workDir: 'C:/Users/Michal/Workspace/dorny/test-check/reports/karma/'
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from facebook/karma test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'karma', 'karma-test-results.xml')
    const trackedFilesPath = path.join(__dirname, 'fixtures', 'external', 'karma', 'files.txt')
    const outputPath = path.join(__dirname, '__outputs__', 'karma-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles = fs.readFileSync(trackedFilesPath, {encoding: 'utf8'}).split(/\n\r?/g)
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles
      //workDir: '/home/dorny/dorny/karma/'
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from #235 testing react components named <ComponentName />', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'karma', 'karma-react-component-test-results.xml')
    const trackedFilesPath = path.join(__dirname, 'fixtures', 'external', 'karma', 'files.txt')
    const outputPath = path.join(__dirname, '__outputs__', 'karma-react-component-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles = fs.readFileSync(trackedFilesPath, {encoding: 'utf8'}).split(/\n\r?/g)
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles
      //workDir: '/home/dorny/dorny/karma/'
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('parsing ESLint report without timing information works - PR #134', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit-eslint.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'karma-junit-eslint.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['test.js']
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('parsing junit report with message succeeds', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'junit-with-message.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'junit-with-message.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: ['test.js']
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report does not include a title by default', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
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
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle
    })
    // Report should have the badge as the first line
    expect(report).toMatch(/^!\[Tests failed]/)
  })

  it('report includes a custom report title', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle: 'My Custom Title'
    })
    // Report should have the title as the first line
    expect(report).toMatch(/^# My Custom Title\n/)
  })

  it('report can be collapsed when configured', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      collapsed: 'always'
    })
    // Report should include collapsible details
    expect(report).toContain('<details><summary>Expand for details</summary>')
    expect(report).toContain('</details>')
  })

  it('report is not collapsed when configured to never', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      collapsed: 'never'
    })
    // Report should not include collapsible details
    expect(report).not.toContain('<details><summary>Expand for details</summary>')
    expect(report).not.toContain('</details>')
  })

  it('report auto-collapses when all tests pass', async () => {
    // Test with a fixture that has all passing tests (no failures)
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit-eslint.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Verify this fixture has no failures
    expect(result.failed).toBe(0)

    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      collapsed: 'auto'
    })

    // Should collapse when all tests pass
    expect(report).toContain('<details><summary>Expand for details</summary>')
    expect(report).toContain('</details>')
  })

  it('report does not auto-collapse when tests fail', async () => {
    // Test with a fixture that has failing tests
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Verify this fixture has failures
    expect(result.failed).toBeGreaterThan(0)

    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      collapsed: 'auto'
    })

    // Should not collapse when there are failures
    expect(report).not.toContain('<details><summary>Expand for details</summary>')
    expect(report).not.toContain('</details>')
  })

  it('report includes the short summary', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const shortSummary = '1 passed, 4 failed and 1 skipped'
    const report = getReport([result], DEFAULT_OPTIONS, shortSummary)
    // Report should have the title as the first line
    expect(report).toMatch(/^## 1 passed, 4 failed and 1 skipped\n/)
  })

  it('report includes a custom report title and short summary', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'karma-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new KarmaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const shortSummary = '1 passed, 4 failed and 1 skipped'
    const report = getReport(
      [result],
      {
        ...DEFAULT_OPTIONS,
        reportTitle: 'My Custom Title'
      },
      shortSummary
    )
    // Report should have the title as the first line
    expect(report).toMatch(/^# My Custom Title\n## 1 passed, 4 failed and 1 skipped\n/)
  })
})
