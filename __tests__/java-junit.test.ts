import * as fs from 'fs'
import * as path from 'path'

import {JavaJunitParser} from '../src/parsers/java-junit/java-junit-parser.js'
import {ParseOptions} from '../src/test-parser.js'
import {DEFAULT_OPTIONS, getReport} from '../src/report/get-report.js'
import {getAnnotations} from '../src/report/get-annotations.js'
import {normalizeFilePath} from '../src/utils/path-utils.js'

import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

  it('resolves source file path in multi-module Maven projects', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'multi-module-failure.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
    const trackedFiles = [
      'core/common/src/test/java/com/sgcib/cops/common/utils/MaturityUtilsUnitTest.java'
    ]

    const parser = new JavaJunitParser({parseErrors: true, trackedFiles})
    const result = await parser.parse(filePath, fileContent)
    const failedTest = result.suites[0].groups[0].tests[0]

    expect(failedTest.result).toBe('failed')
    expect(failedTest.error?.path).toBe(
      'core/common/src/test/java/com/sgcib/cops/common/utils/MaturityUtilsUnitTest.java'
    )
    expect(failedTest.error?.line).toBe(21)

    const annotations = getAnnotations([result], 10)
    expect(annotations).toHaveLength(1)
    expect(annotations[0].path).toBe(
      'core/common/src/test/java/com/sgcib/cops/common/utils/MaturityUtilsUnitTest.java'
    )
    expect(annotations[0].start_line).toBe(21)
  })

  it('resolves source file path when package name contains uppercase letters', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'uppercase-package-failure.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
    const trackedFiles = ['module-a/src/test/java/com/MyCompany/utils/ExampleTest.java']

    const parser = new JavaJunitParser({parseErrors: true, trackedFiles})
    const result = await parser.parse(filePath, fileContent)
    const failedTest = result.suites[0].groups[0].tests[0]

    expect(failedTest.error?.path).toBe('module-a/src/test/java/com/MyCompany/utils/ExampleTest.java')
    expect(failedTest.error?.line).toBe(15)
  })

  it('resolves source file path when stack trace contains Java 9 module prefix', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'module-prefix-failure.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
    const trackedFiles = ['service-app/src/test/java/com/example/MyClassTest.java']

    const parser = new JavaJunitParser({parseErrors: true, trackedFiles})
    const result = await parser.parse(filePath, fileContent)
    const failedTest = result.suites[0].groups[0].tests[0]

    expect(failedTest.error?.path).toBe('service-app/src/test/java/com/example/MyClassTest.java')
    expect(failedTest.error?.line).toBe(10)
  })

  it('produces a GitHub annotation for a Gradle + Spring Boot JUnit5 failure', async () => {
    // Reproduces https://github.com/victor-fi/release-demo PRs 7 & 8: a real Gradle/Spring
    // failure report whose stack trace interleaves `java.base/...` module-prefixed frames
    // around the actual test frame. The annotation must resolve to the tracked source file.
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'java', 'spring-gradle-failure.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
    const trackedFiles = [
      'service-app/src/test/java/com/victor/paymentreporting/app/PowerDroidControllerTest.java'
    ]

    const parser = new JavaJunitParser({parseErrors: true, trackedFiles})
    const result = await parser.parse(filePath, fileContent)
    const failedTest = result.suites[0].groups[0].tests.find(t => t.result === 'failed')

    expect(failedTest).toBeDefined()
    expect(failedTest?.error?.path).toBe(
      'service-app/src/test/java/com/victor/paymentreporting/app/PowerDroidControllerTest.java'
    )
    expect(failedTest?.error?.line).toBe(37)

    const annotations = getAnnotations([result], 10)
    expect(annotations).toHaveLength(1)
    expect(annotations[0].annotation_level).toBe('failure')
    expect(annotations[0].path).toBe(
      'service-app/src/test/java/com/victor/paymentreporting/app/PowerDroidControllerTest.java'
    )
    expect(annotations[0].start_line).toBe(37)
  })
})
