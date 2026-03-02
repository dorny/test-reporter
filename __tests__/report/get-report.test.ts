import {DEFAULT_OPTIONS, getBadge, getReport, ReportOptions} from '../../src/report/get-report'
import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../src/test-results'

describe('getBadge', () => {
  describe('URI encoding with special characters', () => {
    it('generates correct URI with simple badge title', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'tests'
      }
      const badge = getBadge(5, 0, 1, options)
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/tests-5%20passed%2C%201%20skipped-success)')
    })

    it('handles badge title with single hyphen', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'unit-tests'
      }
      const badge = getBadge(3, 0, 0, options)
      // The hyphen in the badge title should be encoded as --
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/unit--tests-3%20passed-success)')
    })

    it('handles badge title with multiple hyphens', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'integration-api-tests'
      }
      const badge = getBadge(10, 0, 0, options)
      // All hyphens in the title should be encoded as --
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/integration--api--tests-10%20passed-success)')
    })

    it('handles badge title with multiple underscores', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'my_integration_test'
      }
      const badge = getBadge(10, 0, 0, options)
      // All underscores in the title should be encoded as __
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/my__integration__test-10%20passed-success)')
    })

    it('handles badge title with version format containing hyphen', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'MariaDb 12.0-ubi database tests'
      }
      const badge = getBadge(1, 0, 0, options)
      // The hyphen in "12.0-ubi" should be encoded as --
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/MariaDb%2012.0--ubi%20database%20tests-1%20passed-success)')
    })

    it('handles badge title with dots and hyphens', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'v1.2.3-beta-test'
      }
      const badge = getBadge(4, 1, 0, options)
      expect(badge).toBe('![Tests failed](https://img.shields.io/badge/v1.2.3--beta--test-4%20passed%2C%201%20failed-critical)')
    })

    it('preserves structural hyphens between label and message', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'test-suite'
      }
      const badge = getBadge(2, 3, 1, options)
      // The URI should have literal hyphens separating title-message-color
      expect(badge).toBe('![Tests failed](https://img.shields.io/badge/test--suite-2%20passed%2C%203%20failed%2C%201%20skipped-critical)')
    })
  })

  describe('generates test outcome as color name for imgshields', () => {
    it('uses success color when all tests pass', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(5, 0, 0, options)
      expect(badge).toContain('-success)')
    })

    it('uses critical color when tests fail', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(5, 2, 0, options)
      expect(badge).toContain('-critical)')
    })

    it('uses yellow color when no tests found', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(0, 0, 0, options)
      expect(badge).toContain('-yellow)')
    })
  })

  describe('badge message composition', () => {
    it('includes only passed count when no failures or skips', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(5, 0, 0, options)
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/tests-5%20passed-success)')
    })

    it('includes passed and failed counts', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(5, 2, 0, options)
      expect(badge).toBe('![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%202%20failed-critical)')
    })

    it('includes passed, failed and skipped counts', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(5, 2, 1, options)
      expect(badge).toBe('![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%202%20failed%2C%201%20skipped-critical)')
    })

    it('uses "none" message when no tests', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(0, 0, 0, options)
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/tests-none-yellow)')
    })
  })
})

describe('getReport', () => {
  // Helper function to create test results
  function createTestResult(path: string, passed: number, failed: number, skipped: number): TestRunResult {
    const tests: TestCaseResult[] = []
    for (let i = 0; i < passed; i++) {
      tests.push(new TestCaseResult(`passed-test-${i}`, 'success', 100))
    }
    for (let i = 0; i < failed; i++) {
      tests.push(new TestCaseResult(`failed-test-${i}`, 'failed', 100, {
        details: 'Test failed',
        message: 'Assertion error'
      }))
    }
    for (let i = 0; i < skipped; i++) {
      tests.push(new TestCaseResult(`skipped-test-${i}`, 'skipped', 0))
    }

    const group = new TestGroupResult('test-group', tests)
    const suite = new TestSuiteResult('test-suite', [group])
    return new TestRunResult(path, [suite])
  }

  describe('list-files parameter', () => {
    const results = [
      createTestResult('passing-file.spec.ts', 5, 0, 0),
      createTestResult('failing-file.spec.ts', 3, 2, 1),
      createTestResult('passing-with-skipped-file.spec.ts', 8, 0, 2)
    ]

    it('shows all files when list-files is "all"', () => {
      const report = getReport(results, {
        ...DEFAULT_OPTIONS,
        listFiles: 'all',
        listSuites: 'none',
        listTests: 'none'
      })

      expect(report).toContain('passing-file.spec.ts')
      expect(report).toContain('failing-file.spec.ts')
      expect(report).toContain('passing-with-skipped-file.spec.ts')
    })

    it('shows only failed files when list-files is "failed"', () => {
      const report = getReport(results, {
        ...DEFAULT_OPTIONS,
        listFiles: 'failed',
        listSuites: 'none',
        listTests: 'none'
      })

      expect(report).not.toContain('passing-file.spec.ts')
      expect(report).toContain('failing-file.spec.ts')
      expect(report).not.toContain('passing-with-skipped-file.spec.ts')
    })

    it('shows no file details when list-files is "none"', () => {
      const report = getReport(results, {
        ...DEFAULT_OPTIONS,
        listFiles: 'none',
        listSuites: 'none',
        listTests: 'none'
      })

      // Should still have badge
      expect(report).toContain('![')
      // Should not have file names in detail sections
      expect(report).not.toContain('passing-file.spec.ts')
      expect(report).not.toContain('failing-file.spec.ts')
      expect(report).not.toContain('passing-with-skipped-file.spec.ts')
    })

    it('includes summary table even with list-files "none"', () => {
      const report = getReport(results, {
        ...DEFAULT_OPTIONS,
        listFiles: 'none',
        listSuites: 'all',
        listTests: 'none'
      })

      // Badge should still be present
      expect(report).toContain('![')
      expect(report).toContain('badge')
      // File names should not be present
      expect(report).not.toContain('passing-file.spec.ts')
      expect(report).not.toContain('failing-file.spec.ts')
      expect(report).not.toContain('passing-with-skipped-file.spec.ts')
    })

    it('works correctly with list-suites and list-tests when list-files is "failed"', () => {
      const report = getReport(results, {
        ...DEFAULT_OPTIONS,
        listFiles: 'failed',
        listSuites: 'all',
        listTests: 'all'
      })

      expect(report).not.toContain('passing-file.spec.ts')
      expect(report).toContain('failing-file.spec.ts')
      expect(report).not.toContain('passing-with-skipped-file.spec.ts')
      // Should show suite details for the failed file
      expect(report).toContain('test-suite')
    })

    it('filters correctly when all files pass and list-files is "failed"', () => {
      const allPassingResults = [
        createTestResult('passing-file-1.spec.ts', 5, 0, 0),
        createTestResult('passing-file-2.spec.ts', 8, 0, 2)
      ]

      const report = getReport(allPassingResults, {
        ...DEFAULT_OPTIONS,
        listFiles: 'failed',
        listSuites: 'all',
        listTests: 'none'
      })

      expect(report).not.toContain('passing-file-1.spec.ts')
      expect(report).not.toContain('passing-file-2.spec.ts')
      // Badge should still be present
      expect(report).toContain('![')
      expect(report).toContain('badge')
    })

    it('filters correctly when all files fail and list-files is "failed"', () => {
      const allFailingResults = [
        createTestResult('failing-file-1.spec.ts', 0, 5, 0),
        createTestResult('failing-file-2.spec.ts', 1, 2, 1)
      ]

      const report = getReport(allFailingResults, {
        ...DEFAULT_OPTIONS,
        listFiles: 'failed',
        listSuites: 'all',
        listTests: 'none'
      })

      expect(report).toContain('failing-file-1.spec.ts')
      expect(report).toContain('failing-file-2.spec.ts')
    })
  })
})
