import * as fs from 'fs'
import * as path from 'path'

import {OpenTestReportingParser} from '../src/parsers/open-test-reporting/open-test-reporting-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('open-test-reporting tests', () => {
  const defaultOpts: ParseOptions = {
    parseErrors: true,
    trackedFiles: []
  }

  describe('hierarchy format', () => {
    it('parses hierarchy format correctly', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      // 3 suites: UserServiceTest, PaymentServiceTest, EmptySuite
      expect(result.suites.length).toBe(3)

      // UserServiceTest: 3 tests (2 passed, 1 skipped)
      const userSuite = result.suites.find(s => s.name === 'com.example.UserServiceTest')
      expect(userSuite).toBeDefined()
      expect(userSuite!.tests).toBe(3)
      expect(userSuite!.passed).toBe(2)
      expect(userSuite!.skipped).toBe(1)
      expect(userSuite!.failed).toBe(0)

      // PaymentServiceTest: 4 tests (3 passed, 1 failed) with nested groups
      const paymentSuite = result.suites.find(s => s.name === 'com.example.PaymentServiceTest')
      expect(paymentSuite).toBeDefined()
      expect(paymentSuite!.tests).toBe(4)
      expect(paymentSuite!.passed).toBe(3)
      expect(paymentSuite!.failed).toBe(1)

      // Check groups exist
      expect(paymentSuite!.groups.length).toBe(2)
      const validationGroup = paymentSuite!.groups.find(g => g.name === 'ValidationTests')
      const processingGroup = paymentSuite!.groups.find(g => g.name === 'ProcessingTests')
      expect(validationGroup).toBeDefined()
      expect(processingGroup).toBeDefined()
      expect(validationGroup!.tests.length).toBe(2)
      expect(processingGroup!.tests.length).toBe(2)

      // EmptySuite: 0 tests
      const emptySuite = result.suites.find(s => s.name === 'com.example.EmptySuite')
      expect(emptySuite).toBeDefined()
      expect(emptySuite!.tests).toBe(0)
    })

    it('parses duration correctly', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      // UserServiceTest has duration PT1.234S = 1234ms
      const userSuite = result.suites.find(s => s.name === 'com.example.UserServiceTest')
      expect(userSuite!.time).toBeCloseTo(1234, 0)

      // Check individual test times
      const group = userSuite!.groups[0]
      const creationTest = group.tests.find(t => t.name === 'testUserCreation')
      expect(creationTest!.time).toBeCloseTo(123, 0) // PT0.123S
    })

    it('extracts error message from failed tests', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const paymentSuite = result.suites.find(s => s.name === 'com.example.PaymentServiceTest')
      const processingGroup = paymentSuite!.groups.find(g => g.name === 'ProcessingTests')
      const timeoutTest = processingGroup!.tests.find(t => t.name === 'testPaymentTimeout')

      expect(timeoutTest!.result).toBe('failed')
      expect(timeoutTest!.error).toBeDefined()
      expect(timeoutTest!.error!.message).toContain('AssertionFailedError')
    })

    it('handles empty hierarchy file', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'empty.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      expect(result.tests).toBe(0)
      expect(result.suites.length).toBe(0)
      expect(result.result).toBe('success')
    })
  })

  describe('events format', () => {
    it('parses events format correctly', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'events.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      // 2 suites: CalculatorTest, StringUtilsTest
      expect(result.suites.length).toBe(2)

      // CalculatorTest: 4 tests
      const calcSuite = result.suites.find(s => s.name === 'com.example.CalculatorTest')
      expect(calcSuite).toBeDefined()
      expect(calcSuite!.tests).toBe(4)
      expect(calcSuite!.passed).toBe(2)
      expect(calcSuite!.failed).toBe(1)
      expect(calcSuite!.skipped).toBe(1)

      // StringUtilsTest: 2 tests in TrimTests group
      const stringSuite = result.suites.find(s => s.name === 'com.example.StringUtilsTest')
      expect(stringSuite).toBeDefined()
      expect(stringSuite!.tests).toBe(2)
      expect(stringSuite!.passed).toBe(2)

      // Check TrimTests group
      const trimGroup = stringSuite!.groups.find(g => g.name === 'TrimTests')
      expect(trimGroup).toBeDefined()
      expect(trimGroup!.tests.length).toBe(2)
    })

    it('calculates duration from timestamps', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'events.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const calcSuite = result.suites.find(s => s.name === 'com.example.CalculatorTest')
      // testAddition: 11:00:00.100 to 11:00:00.200 = 100ms
      const addTest = calcSuite!.groups[0].tests.find(t => t.name === 'testAddition')
      expect(addTest!.time).toBe(100)
    })

    it('extracts error message from failed events', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'events.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const calcSuite = result.suites.find(s => s.name === 'com.example.CalculatorTest')
      const divTest = calcSuite!.groups[0].tests.find(t => t.name === 'testDivision')

      expect(divTest!.result).toBe('failed')
      expect(divTest!.error).toBeDefined()
      expect(divTest!.error!.message).toContain('ArithmeticException')
    })
  })

  describe('format auto-detection', () => {
    it('auto-detects hierarchy format', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      // Should parse successfully with hierarchy format
      expect(result.suites.length).toBe(3)
    })

    it('auto-detects events format', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'events.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      // Should parse successfully with events format
      expect(result.suites.length).toBe(2)
    })

    it('throws error for invalid format', async () => {
      const invalidXml = '<?xml version="1.0"?><unknown><root/></unknown>'
      const parser = new OpenTestReportingParser(defaultOpts)

      await expect(parser.parse('invalid.xml', invalidXml)).rejects.toThrow(
        'Unknown open-test-reporting format'
      )
    })

    it('throws error for invalid XML', async () => {
      const invalidXml = 'not valid xml at all'
      const parser = new OpenTestReportingParser(defaultOpts)

      await expect(parser.parse('invalid.xml', invalidXml)).rejects.toThrow('Invalid XML')
    })
  })

  describe('status mapping', () => {
    it('maps SUCCESSFUL to success', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const userSuite = result.suites.find(s => s.name === 'com.example.UserServiceTest')
      const creationTest = userSuite!.groups[0].tests.find(t => t.name === 'testUserCreation')
      expect(creationTest!.result).toBe('success')
    })

    it('maps SKIPPED to skipped', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const userSuite = result.suites.find(s => s.name === 'com.example.UserServiceTest')
      const updateTest = userSuite!.groups[0].tests.find(t => t.name === 'testUserUpdate')
      expect(updateTest!.result).toBe('skipped')
    })

    it('maps FAILED to failed', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const paymentSuite = result.suites.find(s => s.name === 'com.example.PaymentServiceTest')
      const processingGroup = paymentSuite!.groups.find(g => g.name === 'ProcessingTests')
      const timeoutTest = processingGroup!.tests.find(t => t.name === 'testPaymentTimeout')
      expect(timeoutTest!.result).toBe('failed')
    })
  })

  describe('report generation', () => {
    it('generates report from hierarchy format', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const outputPath = path.join(__dirname, '__outputs__', 'open-test-reporting-hierarchy.md')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const report = getReport([result])
      fs.mkdirSync(path.dirname(outputPath), {recursive: true})
      fs.writeFileSync(outputPath, report)

      // Verify report contains expected content
      expect(report).toContain('UserServiceTest')
      expect(report).toContain('PaymentServiceTest')
      expect(report).toContain('testPaymentTimeout')
    })

    it('generates report from events format', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'events.xml')
      const outputPath = path.join(__dirname, '__outputs__', 'open-test-reporting-events.md')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const report = getReport([result])
      fs.mkdirSync(path.dirname(outputPath), {recursive: true})
      fs.writeFileSync(outputPath, report)

      // Verify report contains expected content
      expect(report).toContain('CalculatorTest')
      expect(report).toContain('StringUtilsTest')
      expect(report).toContain('testDivision')
    })

    it('result matches snapshot for hierarchy format', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      expect(result).toMatchSnapshot()
    })

    it('result matches snapshot for events format', async () => {
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'events.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      expect(result).toMatchSnapshot()
    })
  })

  describe('duration parsing', () => {
    it('parses seconds only format (PT0.123S)', async () => {
      // This is tested through hierarchy.xml which uses PT0.123S format
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const userSuite = result.suites.find(s => s.name === 'com.example.UserServiceTest')
      // PT0.123S = 123ms
      const creationTest = userSuite!.groups[0].tests.find(t => t.name === 'testUserCreation')
      expect(creationTest!.time).toBeCloseTo(123, 0)
    })

    it('handles missing duration', async () => {
      // EmptySuite has PT0S duration
      const fixturePath = path.join(__dirname, 'fixtures', 'open-test-reporting', 'hierarchy.xml')
      const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
      const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

      const parser = new OpenTestReportingParser(defaultOpts)
      const result = await parser.parse(filePath, fileContent)

      const emptySuite = result.suites.find(s => s.name === 'com.example.EmptySuite')
      expect(emptySuite!.time).toBe(0)
    })
  })
})
