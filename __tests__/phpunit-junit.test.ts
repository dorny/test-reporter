import * as fs from 'fs'
import * as path from 'path'

import {PhpunitJunitParser} from '../src/parsers/phpunit-junit/phpunit-junit-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('phpunit-junit tests', () => {
  it('produces empty test run result when there are no test cases', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'phpunit-empty.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('report from phpunit test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'phpunit', 'phpunit.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'phpunit-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('parses nested test suites correctly', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'phpunit', 'phpunit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Should have 4 test suites (3 nested ones plus the parent with direct testcases)
    expect(result.suites.length).toBe(4)

    // Verify suite names
    const suiteNames = result.suites.map(s => s.name)
    expect(suiteNames).toContain('PHPUnit\\Event\\CollectingDispatcherTest')
    expect(suiteNames).toContain('PHPUnit\\Event\\DeferringDispatcherTest')
    expect(suiteNames).toContain('PHPUnit\\Event\\DirectDispatcherTest')
    expect(suiteNames).toContain('CLI Arguments')

    // Verify total test count
    expect(result.tests).toBe(12)
    expect(result.passed).toBe(10)
    expect(result.failed).toBe(2)
  })

  it('extracts error details from failures', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'phpunit', 'phpunit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the CLI Arguments suite which has failures
    const cliSuite = result.suites.find(s => s.name === 'CLI Arguments')
    expect(cliSuite).toBeDefined()

    // Get the failed tests
    const failedTests = cliSuite!.groups.flatMap(g => g.tests).filter(t => t.result === 'failed')
    expect(failedTests.length).toBe(2)

    // Verify error details are captured
    for (const test of failedTests) {
      expect(test.error).toBeDefined()
      expect(test.error!.details).toContain('Failed asserting that string matches format description')
    }
  })
})
