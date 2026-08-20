import {getBadge, getReport, DEFAULT_OPTIONS, ReportOptions} from '../../src/report/get-report'
import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../src/test-results'

describe('getBadge', () => {
  describe('URI encoding with special characters', () => {
    it('generates correct URI with simple badge title', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'tests'
      }
      const badge = getBadge(5, 0, 1, options)
      expect(badge).toBe(
        '![Tests passed successfully](https://img.shields.io/badge/tests-5%20passed%2C%201%20skipped-success)'
      )
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
      expect(badge).toBe(
        '![Tests passed successfully](https://img.shields.io/badge/integration--api--tests-10%20passed-success)'
      )
    })

    it('handles badge title with multiple underscores', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'my_integration_test'
      }
      const badge = getBadge(10, 0, 0, options)
      // All underscores in the title should be encoded as __
      expect(badge).toBe(
        '![Tests passed successfully](https://img.shields.io/badge/my__integration__test-10%20passed-success)'
      )
    })

    it('handles badge title with version format containing hyphen', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'MariaDb 12.0-ubi database tests'
      }
      const badge = getBadge(1, 0, 0, options)
      // The hyphen in "12.0-ubi" should be encoded as --
      expect(badge).toBe(
        '![Tests passed successfully](https://img.shields.io/badge/MariaDb%2012.0--ubi%20database%20tests-1%20passed-success)'
      )
    })

    it('handles badge title with dots and hyphens', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'v1.2.3-beta-test'
      }
      const badge = getBadge(4, 1, 0, options)
      expect(badge).toBe(
        '![Tests failed](https://img.shields.io/badge/v1.2.3--beta--test-4%20passed%2C%201%20failed-critical)'
      )
    })

    it('preserves structural hyphens between label and message', () => {
      const options: ReportOptions = {
        ...DEFAULT_OPTIONS,
        badgeTitle: 'test-suite'
      }
      const badge = getBadge(2, 3, 1, options)
      // The URI should have literal hyphens separating title-message-color
      expect(badge).toBe(
        '![Tests failed](https://img.shields.io/badge/test--suite-2%20passed%2C%203%20failed%2C%201%20skipped-critical)'
      )
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
      expect(badge).toBe(
        '![Tests failed](https://img.shields.io/badge/tests-5%20passed%2C%202%20failed%2C%201%20skipped-critical)'
      )
    })

    it('uses "none" message when no tests', () => {
      const options: ReportOptions = {...DEFAULT_OPTIONS}
      const badge = getBadge(0, 0, 0, options)
      expect(badge).toBe('![Tests passed successfully](https://img.shields.io/badge/tests-none-yellow)')
    })
  })
})

describe('collapseSuites', () => {
  const suite = (name: string, cases: TestCaseResult[]): TestSuiteResult =>
    new TestSuiteResult(name, [new TestGroupResult(name, cases)])

  const passing = (name: string): TestCaseResult => new TestCaseResult(name, 'success', 1)
  const failing = (name: string): TestCaseResult => new TestCaseResult(name, 'failed', 1)

  const run = (): TestRunResult =>
    new TestRunResult('report.xml', [suite('AlphaTests', [passing('a')]), suite('BetaTests', [failing('b')])], 10)

  it('leaves suites expanded by default', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).toContain('### ✅\xa0<a id=')
    expect(report).not.toContain('<details><summary>✅')
  })

  it('renders each suite as a closed section carrying its own counts', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never', collapseSuites: true})

    expect(report).toContain('<details><summary><a id="user-content-r0s0"></a>✅\xa0AlphaTests\xa01 ✅')
    expect(report).toContain('<details><summary><a id="user-content-r0s1"></a>❌\xa0BetaTests\xa01 ❌')
    expect(report).not.toContain('### ')
    // Nothing may be `open`, and every section must close.
    expect(report).not.toContain('<details open')
    expect(report.match(/<details/g)).toHaveLength(2)
    expect(report.match(/<\/details>/g)).toHaveLength(2)
  })

  it('separates the summary from the fenced test list with a blank line', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never', collapseSuites: true})

    const lines = report.split('\n')
    const summaryIndex = lines.findIndex(l => l.startsWith('<details><summary>'))
    expect(lines[summaryIndex + 1].trim()).toBe('')
    expect(lines[summaryIndex + 2]).toBe('```')
  })

  it('nests the suite sections inside the whole-report section', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'always', collapseSuites: true})

    expect(report).toContain('<details><summary>Expand for details</summary>')
    expect(report.match(/<details/g)).toHaveLength(3)
    expect(report.match(/<\/details>/g)).toHaveLength(3)
  })

  it('closes every open section before the trim message', () => {
    const many = new TestRunResult(
      'report.xml',
      Array.from({length: 400}, (_, i) => suite(`Suite${i}`, [failing(`a very long test case name ${i}`.repeat(20))])),
      10
    )

    const report = getReport([many], {
      ...DEFAULT_OPTIONS,
      collapsed: 'always',
      collapseSuites: true,
      useActionsSummary: false
    })

    expect(report).toContain('has been trimmed')
    const opened = report.match(/<details/g)?.length ?? 0
    const closed = report.match(/<\/details>/g)?.length ?? 0
    expect(closed).toBe(opened)
    // The message is the last line, so it sits outside every section.
    expect(report.split('\n').at(-1)).toContain('has been trimmed')
    expect(Buffer.byteLength(report, 'utf8')).toBeLessThanOrEqual(65535)
  })
})

describe('collapseGroups', () => {
  const passing = (name: string): TestCaseResult => new TestCaseResult(name, 'success', 1)
  const failing = (name: string): TestCaseResult => new TestCaseResult(name, 'failed', 1)

  const run = (): TestRunResult =>
    new TestRunResult(
      'report.xml',
      [
        new TestSuiteResult('Tests', [
          new TestGroupResult('AlphaTests', [passing('a'), passing('b')]),
          new TestGroupResult('BetaTests', [failing('c')])
        ])
      ],
      10
    )

  it('lists the groups inline by default', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).toContain('```\nAlphaTests\n  ✅ a\n  ✅ b\nBetaTests\n  ❌ c\n```')
  })

  it('renders each group as a closed section carrying its own counts', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never', collapseGroups: true})

    expect(report).toContain('<details><summary>✅\xa0AlphaTests\xa02 ✅')
    expect(report).toContain('<details><summary>❌\xa0BetaTests\xa01 ❌')
    expect(report).toContain('```\n✅ a\n✅ b\n```')
    expect(report.match(/<details/g)).toHaveLength(2)
    expect(report.match(/<\/details>/g)).toHaveLength(2)
  })

  it('nests the groups inside their suite section', () => {
    const report = getReport([run()], {
      ...DEFAULT_OPTIONS,
      collapsed: 'always',
      collapseSuites: true,
      collapseGroups: true
    })

    const lines = report.split('\n')
    const suite = lines.findIndex(l => l.includes('>❌\xa0Tests\xa0'))
    const group = lines.findIndex(l => l.includes('>✅\xa0AlphaTests\xa0'))

    expect(suite).toBeGreaterThan(-1)
    expect(group).toBeGreaterThan(suite)
    expect(report.match(/<details/g)).toHaveLength(4)
    expect(report.match(/<\/details>/g)).toHaveLength(4)
  })

  it('leaves out a group whose tests are all filtered away', () => {
    const report = getReport([run()], {
      ...DEFAULT_OPTIONS,
      collapsed: 'never',
      collapseGroups: true,
      listTests: 'failed'
    })

    expect(report).toContain('BetaTests')
    expect(report).not.toContain('AlphaTests\xa0')
    expect(report).not.toContain('```\n```')
  })

  it('writes an unnamed group as a bare block with no section to open', () => {
    const unnamed = new TestRunResult(
      'report.xml',
      [new TestSuiteResult('Tests', [new TestGroupResult('', [passing('a')])])],
      10
    )

    const report = getReport([unnamed], {...DEFAULT_OPTIONS, collapsed: 'never', collapseGroups: true})

    expect(report).toContain('```\n✅ a\n```')
    expect(report).not.toContain('<details')
  })
})

describe('retried tests', () => {
  const run = (): TestRunResult =>
    new TestRunResult(
      'report.xml',
      [
        new TestSuiteResult('Tests', [
          new TestGroupResult('TicketTests', [
            new TestCaseResult('recovered', 'success', 1, {details: undefined, message: 'first attempt failed'}, 1),
            new TestCaseResult('steady', 'success', 1)
          ])
        ])
      ],
      10
    )

  it('marks a retried test on its own line', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).toContain('✅ recovered 🔁 retried 1×')
    expect(report).toContain('✅ steady\n')
  })

  it('does not count a retried test as a failure', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).toContain('**2** tests were completed')
    expect(report).toContain('**2** passed, **0** failed and **0** skipped')
    expect(report).not.toContain('❌')
  })

  it('says how many of the run only passed after a retry', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).toContain('**1** of them only after being retried.')
  })

  it('names the suites-table time for what it is', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    // A suite has no elapsed time of its own; the column is the sum of its cases'.
    expect(report).toContain('|Test suite|Passed|Failed|Skipped|Retried|Test time|')
    expect(report).not.toContain('|Skipped|Retried|Time|')
  })

  it('gives the suites table a column for them', () => {
    const report = getReport([run()], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).toContain('|Test suite|Passed|Failed|Skipped|Retried|Test time|')
    expect(report).toContain('|1 🔁|')
  })

  it('leaves a run with no retries unmentioned', () => {
    const steady = new TestRunResult(
      'report.xml',
      [
        new TestSuiteResult('Tests', [new TestGroupResult('TicketTests', [new TestCaseResult('steady', 'success', 1)])])
      ],
      10
    )

    const report = getReport([steady], {...DEFAULT_OPTIONS, collapsed: 'never'})

    expect(report).not.toContain('🔁')
    expect(report).not.toContain('only after being retried')
  })
})

describe('accumulated time', () => {
  const run = (): TestRunResult =>
    new TestRunResult(
      'report.xml',
      [
        new TestSuiteResult(
          'Tests',
          [new TestGroupResult('SlowTests', [new TestCaseResult('a', 'success', 90_000)])],
          10_000
        )
      ],
      10_000
    )

  it('says a group time is accumulated, where a suite time need not be', () => {
    // A suite can be given its real elapsed time; a group's is only ever the sum
    // of its cases', so it can exceed the suite that holds it.
    const report = getReport([run()], {
      ...DEFAULT_OPTIONS,
      collapsed: 'never',
      collapseSuites: true,
      collapseGroups: true
    })

    expect(report).toContain('Tests\xa01 ✅ (10s)</summary>')
    expect(report).toContain('SlowTests\xa01 ✅ (1m 30s of test time)</summary>')
  })
})

describe('a report that does not fit', () => {
  const bulky = (name: string, count: number, result: 'success' | 'failed' = 'success'): TestSuiteResult =>
    new TestSuiteResult(name, [
      new TestGroupResult(
        name,
        Array.from({length: count}, (_, i) => new TestCaseResult(`${'a test with a fairly long name'.repeat(4)} ${i}`, result, 1))
      )
    ])

  const overflowing = (): TestRunResult =>
    new TestRunResult('report.xml', [bulky('Huge', 900), bulky('Small', 3), bulky('Failing', 4, 'failed')], 10)

  const render = (): string =>
    getReport([overflowing()], {...DEFAULT_OPTIONS, collapsed: 'never', useActionsSummary: false})

  it('keeps the suites it can rather than dropping every test case', () => {
    const report = render()

    expect(report).toContain('Small')
    expect(report).toContain('a test with a fairly long name'.repeat(4) + ' 0')
  })

  it('keeps a failed suite over a passing one', () => {
    const report = render()

    // Suites sort by name, so Failing is first and Huge second.
    expect(report).toContain('### ❌\xa0<a id="user-content-r0s0"')
  })

  it('drops the suite it cannot fit', () => {
    const report = render()

    expect(report).not.toContain('### ✅\xa0<a id="user-content-r0s1"')
  })

  it('says that it left something out', () => {
    const report = render()

    expect(report).toContain('The test cases of 1 suite(s) are not listed')
    expect(report).toContain('65535 byte limit')
  })

  it('does not link a suite whose test cases are gone', () => {
    const report = render()

    expect(report).toContain('|Huge|')
    expect(report).not.toContain('[Huge](#r0s1)')
  })

  it('says nothing about omissions when the whole report fits', () => {
    const report = getReport([new TestRunResult('report.xml', [bulky('Small', 3)], 10)], {
      ...DEFAULT_OPTIONS,
      collapsed: 'never',
      useActionsSummary: false
    })

    expect(report).not.toContain('are not listed')
  })
})
