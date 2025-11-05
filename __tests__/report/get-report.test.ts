import {getBadge, DEFAULT_OPTIONS, ReportOptions} from '../../src/report/get-report'

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

