import * as fs from 'fs'
import * as path from 'path'

import {JavaJunitParser} from '../src/parsers/java-junit/java-junit-parser'
import {ParseOptions} from '../src/test-parser'
import {DEFAULT_OPTIONS, getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('java-junit tests', () => {
  it('produces empty test run result when there are no test cases', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'java-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })

  it('counts test cases nested several suites deep', async () => {
    // fastlane's trainer emits a <testsuite> per build target, then per bundle, then
    // per class, so no test case is a direct child of the suites listed under
    // <testsuites>. Reading only direct children reported such a run as 0 tests.
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'xcode', 'trainer-nested-suites.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    expect(result.tests).toBe(6)
    expect(result.passed).toBe(4)
    expect(result.failed).toBe(1)
    expect(result.skipped).toBe(1)
    expect(result.result).toBe('failed')
  })

  it('names a nested suite as the group of the cases it holds', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'xcode', 'trainer-nested-suites.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    const suite = result.suites.find(s => s.name === 'Tests')
    expect(suite?.groups.map(g => g.name).sort()).toStrictEqual([
      'FeedCarouselViewModelTests',
      'PlanDescriptionWebViewTests'
    ])
    const failed = suite?.groups.flatMap(g => g.tests).find(t => t.result === 'failed')
    expect(failed?.name).toBe('A loaded autoplay video ends up muted so it can autoplay silently')
  })

  it('counts a test the runner retried once, as the attempt that counted', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'xcode', 'trainer-retried-tests.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    expect(result.tests).toBe(4)
    expect(result.passed).toBe(3)
    expect(result.failed).toBe(1)
    expect(result.flaky).toBe(2)
    expect(result.result).toBe('failed')
  })

  it('folds a case emitted once per repetition without calling it a retry', async () => {
    // A parameterized test is expanded into one case per argument, and each of
    // them is then written once per repetition of the whole function — every copy
    // carrying the same repetition name. Counted as attempts they would inflate
    // both the test count and the flaky count.
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'xcode', 'trainer-retried-tests.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const duplicated = result.suites[0].groups[0].tests.filter(t => t.name.startsWith('a ticket is filtered by city'))

    expect(duplicated).toHaveLength(1)
    expect(duplicated[0].retries).toBe(0)
  })

  it('keeps the failed attempt of a test that passed on the retry', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'xcode', 'trainer-retried-tests.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const tests = result.suites[0].groups[0].tests

    const recovered = tests.find(t => t.name === 'offline filtering keeps the active ticket')
    expect(recovered?.result).toBe('success')
    expect(recovered?.retries).toBe(1)
    expect(recovered?.error?.message).toBe('TicketRepositoryTests.swift:48: Expectation failed')

    const stillFailing = tests.find(t => t.name === 'an expired ticket is dropped')
    expect(stillFailing?.result).toBe('failed')
    expect(stillFailing?.retries).toBe(1)

    const neverRetried = tests.find(t => t.name === 'a ticket without a session is ignored')
    expect(neverRetried?.retries).toBe(0)
  })

  it('report from apache/pulsar single suite test results matches snapshot', async () => {
    const fixturePath = path.join(
      __dirname,
      'fixtures',
      'external',
      'java',
      'TEST-org.apache.pulsar.AddMissingPatchVersionTest.xml'
    )
    const trackedFilesPath = path.join(__dirname, 'fixtures', 'external', 'java', 'files.txt')
    const outputPath = path.join(__dirname, '__outputs__', 'pulsar-test-results-no-merge.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles = fs.readFileSync(trackedFilesPath, {encoding: 'utf8'}).split(/\n\r?/g)
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from apache/pulsar test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'pulsar-test-report.xml')
    const trackedFilesPath = path.join(__dirname, 'fixtures', 'external', 'java', 'files.txt')
    const outputPath = path.join(__dirname, '__outputs__', 'pulsar-test-results.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles = fs.readFileSync(trackedFilesPath, {encoding: 'utf8'}).split(/\n\r?/g)
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from testmo/junitxml basic example matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'junit4-basic.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'junit-basic.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('report from testmo/junitxml complete example matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'junit4-complete.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'junit-complete.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })

  it('parses empty failures in test results', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'empty_failures.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles: string[] = []
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    expect(result.result === 'failed')
    expect(result.failed === 1)
  })

  it('report does not include a title by default', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'junit-with-message.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
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
    const fixturePath = path.join(__dirname, 'fixtures', 'junit-with-message.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle
    })
    // Report should have the badge as the first line
    expect(report).toMatch(/^!\[Tests failed]/)
  })

  it('report includes a custom report title', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'java-junit.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new JavaJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    const report = getReport([result], {
      ...DEFAULT_OPTIONS,
      reportTitle: 'My Custom Title'
    })
    // Report should have the title as the first line
    expect(report).toMatch(/^# My Custom Title\n/)
  })
})
