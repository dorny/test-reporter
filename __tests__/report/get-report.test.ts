import {
  DEFAULT_OPTIONS,
  getByteLength,
  getReport,
  MAX_ACTIONS_SUMMARY_LENGTH,
  trimReport
} from '../../src/report/get-report'
import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../src/test-results'

// space reserved for closing backticks and newlines
const ALWAYS_RESERVED_SPACE = 5

describe('trimReport', () => {
  const TEST_LINE_CHAR = '----'
  const TEST_LINE_LEN = getByteLength(`${TEST_LINE_CHAR}\n`)
  const MAX_LEN_REPORT: string[] = []
  for (let i = 0; i < MAX_ACTIONS_SUMMARY_LENGTH / 5; i++) {
    MAX_LEN_REPORT.push(TEST_LINE_CHAR)
  }

  it('trims reports that exceed Github limits', () => {
    const trimmed = trimReport(MAX_LEN_REPORT, 0, DEFAULT_OPTIONS)
    const trimmedLength = getByteLength(trimmed)

    expect(trimmed).toMatch(/has been trimmed\*\*$/)
    expectToBeWithinRangeOfCeiling(trimmedLength, MAX_ACTIONS_SUMMARY_LENGTH - ALWAYS_RESERVED_SPACE, TEST_LINE_LEN)
  })

  it('reserves space for prepended string', () => {
    const prependStringLen = 10
    const trimmed = trimReport(MAX_LEN_REPORT, prependStringLen, DEFAULT_OPTIONS)
    const trimmedLength = getByteLength(trimmed)

    expect(trimmed).toMatch(/has been trimmed\*\*$/)
    expectToBeWithinRangeOfCeiling(
      trimmedLength,
      MAX_ACTIONS_SUMMARY_LENGTH - ALWAYS_RESERVED_SPACE - prependStringLen,
      TEST_LINE_LEN
    )
  })
})

describe('getReport', () => {
  const testCases: TestCaseResult[] = []
  const testCaseString = '-------------------------' // 25 chars long
  const FAILURE_ROW_LEN = getByteLength(`  ❌ ${testCaseString}\n`)
  for (let i = 0; i < MAX_ACTIONS_SUMMARY_LENGTH / 30; i++) {
    testCases.push(new TestCaseResult(testCaseString, 'failed', 1))
  }
  const MAX_LEN_RESULT = [
    new TestRunResult('run', [new TestSuiteResult('suite', [new TestGroupResult('group', testCases)])])
  ]

  it('trims reports that exceed Github limits', () => {
    const trimmed = getReport(MAX_LEN_RESULT, DEFAULT_OPTIONS)
    const trimmedLength = getByteLength(trimmed)

    expect(trimmed).toMatch(/has been trimmed\*\*$/)
    expectToBeWithinRangeOfCeiling(trimmedLength, MAX_ACTIONS_SUMMARY_LENGTH - ALWAYS_RESERVED_SPACE, FAILURE_ROW_LEN)
  })

  it('reserves space for prepended string', () => {
    const prependString = `1 passed, 1 failed and 1 skipped`
    const prependStringLen = getByteLength(prependString)
    const trimmed = getReport(MAX_LEN_RESULT, DEFAULT_OPTIONS, prependString)
    const trimmedLength = getByteLength(trimmed)

    expect(trimmed).toMatch(/has been trimmed\*\*$/)
    expectToBeWithinRangeOfCeiling(
      trimmedLength,
      MAX_ACTIONS_SUMMARY_LENGTH - ALWAYS_RESERVED_SPACE - prependStringLen,
      FAILURE_ROW_LEN
    )
  })
})

/**
 * Asserts a subject number is between a ceiling value and a range below it (inclusive)
 */
function expectToBeWithinRangeOfCeiling(subject: number, ceiling: number, range: number): void {
  expect(subject).toBeLessThanOrEqual(ceiling)
  expect(subject).toBeGreaterThanOrEqual(ceiling - range)
}
