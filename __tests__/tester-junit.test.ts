import * as fs from 'fs'
import * as path from 'path'

import {NetteTesterJunitParser} from '../src/parsers/tester-junit/tester-junit-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('tester-junit tests', () => {
  it('produces empty test run result when there are no test cases', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'phpunit-empty.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('report from tester-v1.7-report.xml matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'tester-v1.7-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('parses tester-v1.7-report.xml correctly', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Verify test counts from XML: tests="65" errors="1" skipped="3"
    expect(result.tests).toBe(65)
    expect(result.failed).toBe(1)
    expect(result.skipped).toBe(3)
    expect(result.passed).toBe(61)

    // Verify suite name uses file name
    expect(result.suites.length).toBe(1)
    expect(result.suites[0].name).toBe('tester-v1.7-report.xml')
  })

  it('groups tests by directory structure', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Get all group names
    const groupNames = result.suites[0].groups.map(g => g.name)

    // Verify expected directory groups exist
    expect(groupNames).toContain('tests/Framework')
    expect(groupNames).toContain('tests/CodeCoverage')
    expect(groupNames).toContain('tests/Runner')
    expect(groupNames).toContain('tests/RunnerOutput')
  })

  it('parses test names with method suffixes correctly', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the Framework group which has tests with method suffixes
    const frameworkGroup = result.suites[0].groups.find(g => g.name === 'tests/Framework')
    expect(frameworkGroup).toBeDefined()

    // Find tests with method suffixes
    const testWithMethod = frameworkGroup!.tests.find(t => t.name.includes('::testSimple'))
    expect(testWithMethod).toBeDefined()
    expect(testWithMethod!.name).toBe('Assert.equal.recursive.phpt::testSimple')
  })

  it('parses complex test names from BootstrapFormRenderer-report.xml', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'BootstrapFormRenderer-report.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'tester-bootstrap-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Verify test counts: 4 tests, all passed
    expect(result.tests).toBe(4)
    expect(result.passed).toBe(4)
    expect(result.failed).toBe(0)
    expect(result.skipped).toBe(0)

    // Verify suite name
    expect(result.suites[0].name).toBe('BootstrapFormRenderer-report.xml')

    // All tests should have method names
    const allTests = result.suites[0].groups.flatMap(g => g.tests)
    expect(allTests.every(t => t.name.includes('::'))).toBe(true)
    expect(allTests.some(t => t.name.includes('::testRenderingBasics'))).toBe(true)
    expect(allTests.some(t => t.name.includes('::testRenderingIndividual'))).toBe(true)

    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('extracts error details from failures', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the failed test
    const allTests = result.suites[0].groups.flatMap(g => g.tests)
    const failedTests = allTests.filter(t => t.result === 'failed')

    expect(failedTests.length).toBe(1)

    // Verify error details are captured
    const failedTest = failedTests[0]
    expect(failedTest.error).toBeDefined()
    expect(failedTest.error!.details).toContain('Failed:')
    expect(failedTest.error!.details).toContain('multiple-fails')
  })

  it('correctly identifies skipped tests', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find skipped tests
    const allTests = result.suites[0].groups.flatMap(g => g.tests)
    const skippedTests = allTests.filter(t => t.result === 'skipped')

    expect(skippedTests.length).toBe(3)

    // Verify some known skipped tests
    expect(skippedTests.some(t => t.name.includes('Dumper.toPhp.php7.phpt'))).toBe(true)
    expect(skippedTests.some(t => t.name.includes('Collector.start.phpt'))).toBe(true)
  })

  it('parses test with description prefix correctly', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'nette-tester', 'tester-v1.7-report.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new NetteTesterJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find test with description prefix
    const allTests = result.suites[0].groups.flatMap(g => g.tests)
    // The test name is generated from the basename, and the description is shown in parentheses
    const testWithDescription = allTests.find(t => t.name.includes('Prevent loop'))

    expect(testWithDescription).toBeDefined()
    expect(testWithDescription!.name).toContain('Prevent loop')
    expect(testWithDescription!.name).toContain('TestCase.ownErrorHandler.phpt')
  })
})
