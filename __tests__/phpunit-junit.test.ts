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

  it('parses junit-basic.xml with nested suites and failure', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'junit-basic.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Verify test counts
    expect(result.tests).toBe(9)
    expect(result.passed).toBe(8)
    expect(result.failed).toBe(1)
    expect(result.result).toBe('failed')

    // Verify suites - should have Tests.Registration, Tests.Authentication.Login, and Tests.Authentication
    expect(result.suites.length).toBe(3)

    const suiteNames = result.suites.map(s => s.name)
    expect(suiteNames).toContain('Tests.Registration')
    expect(suiteNames).toContain('Tests.Authentication.Login')
    expect(suiteNames).toContain('Tests.Authentication')

    // Verify the Registration suite has 3 tests
    const registrationSuite = result.suites.find(s => s.name === 'Tests.Registration')
    expect(registrationSuite).toBeDefined()
    const registrationTests = registrationSuite!.groups.flatMap(g => g.tests)
    expect(registrationTests.length).toBe(3)

    // Verify the Authentication suite has 3 direct tests (not counting nested suite)
    const authSuite = result.suites.find(s => s.name === 'Tests.Authentication')
    expect(authSuite).toBeDefined()
    const authTests = authSuite!.groups.flatMap(g => g.tests)
    expect(authTests.length).toBe(3)

    // Verify the Login nested suite has 3 tests
    const loginSuite = result.suites.find(s => s.name === 'Tests.Authentication.Login')
    expect(loginSuite).toBeDefined()
    const loginTests = loginSuite!.groups.flatMap(g => g.tests)
    expect(loginTests.length).toBe(3)

    // Verify failure is captured
    const failedTest = authTests.find(t => t.name === 'testCase9')
    expect(failedTest).toBeDefined()
    expect(failedTest!.result).toBe('failed')
    expect(failedTest!.error).toBeDefined()
    expect(failedTest!.error!.message).toBe('AssertionError: Assertion error message')
  })

  it('parses phpcheckstyle-phpunit.xml with deeply nested suites', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'phpcheckstyle-phpunit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Verify test counts from the XML: tests="30", failures="2"
    expect(result.tests).toBe(30)
    expect(result.passed).toBe(28)
    expect(result.failed).toBe(2)
    expect(result.result).toBe('failed')

    // Verify the number of test suites extracted (leaf suites with testcases)
    // CommentsTest, DeprecationTest, GoodTest, IndentationTest, MetricsTest,
    // NamingTest, OptimizationTest, OtherTest, PHPTagsTest, ProhibitedTest,
    // StrictCompareTest, UnusedTest = 12 suites
    expect(result.suites.length).toBe(12)

    const suiteNames = result.suites.map(s => s.name)
    expect(suiteNames).toContain('CommentsTest')
    expect(suiteNames).toContain('GoodTest')
    expect(suiteNames).toContain('IndentationTest')
    expect(suiteNames).toContain('OtherTest')
  })

  it('extracts test data from phpcheckstyle-phpunit.xml', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'phpcheckstyle-phpunit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the CommentsTest suite
    const commentsSuite = result.suites.find(s => s.name === 'CommentsTest')
    expect(commentsSuite).toBeDefined()

    // Verify tests are extracted correctly
    const tests = commentsSuite!.groups.flatMap(g => g.tests)
    expect(tests.length).toBe(3)

    const testGoodDoc = tests.find(t => t.name === 'testGoodDoc')
    expect(testGoodDoc).toBeDefined()
    expect(testGoodDoc!.result).toBe('success')
  })

  it('captures failure details from phpcheckstyle-phpunit.xml', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'phpcheckstyle-phpunit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the OtherTest suite which has failures
    const otherSuite = result.suites.find(s => s.name === 'OtherTest')
    expect(otherSuite).toBeDefined()

    const failedTests = otherSuite!.groups.flatMap(g => g.tests).filter(t => t.result === 'failed')
    expect(failedTests.length).toBe(2)

    // Verify failure details
    const testOther = failedTests.find(t => t.name === 'testOther')
    expect(testOther).toBeDefined()
    expect(testOther!.error).toBeDefined()
    expect(testOther!.error!.details).toContain('We expect 20 warnings')
    expect(testOther!.error!.details).toContain('Failed asserting that 19 matches expected 20')

    const testException = failedTests.find(t => t.name === 'testException')
    expect(testException).toBeDefined()
    expect(testException!.error).toBeDefined()
    expect(testException!.error!.details).toContain('We expect 1 error')
  })

  it('report from junit-basic.xml matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'junit-basic.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'phpunit-junit-basic-results.md')
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

  it('report from phpcheckstyle-phpunit.xml matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'phpcheckstyle-phpunit.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'phpunit-phpcheckstyle-results.md')
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
})
