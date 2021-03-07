import * as core from '@actions/core'
import {TestExecutionResult, TestRunResult, TestSuiteResult} from '../test-results'
import {Align, formatTime, Icon, link, table} from '../utils/markdown-utils'
import {slug} from '../utils/slugger'

export interface ReportOptions {
  listSuites: 'all' | 'failed'
  listTests: 'all' | 'failed' | 'none'
}

const defaultOptions: ReportOptions = {
  listSuites: 'all',
  listTests: 'all'
}

export function getReport(results: TestRunResult[], options: ReportOptions = defaultOptions): string {
  core.info('Generating check run summary')

  const maxReportLength = 65535
  applySort(results)

  const opts = {...options}
  let report = renderReport(results, opts)
  if (getByteLength(report) <= maxReportLength) {
    return report
  }

  if (opts.listTests === 'all') {
    core.info("Test report summary is too big - setting 'listTests' to 'failed'")
    opts.listTests = 'failed'
    report = renderReport(results, opts)
    if (getByteLength(report) <= maxReportLength) {
      return report
    }
  }

  if (opts.listSuites === 'all') {
    core.info("Test report summary is too big - setting 'listSuites' to 'failed'")
    opts.listSuites = 'failed'
    report = renderReport(results, opts)
    if (getByteLength(report) <= maxReportLength) {
      return report
    }
  }

  if (opts.listTests !== 'none') {
    core.info("Test report summary is too big - setting 'listTests' to 'none'")
    opts.listTests = 'none'
    report = renderReport(results, opts)
    if (getByteLength(report) <= maxReportLength) {
      return report
    }
  }

  core.warning(`Test report summary exceeded limit of ${maxReportLength} bytes`)
  const badge = getReportBadge(results)
  const msg = `**Test report summary exceeded limit of ${maxReportLength} bytes and was removed**`
  return `${badge}\n${msg}`
}

function applySort(results: TestRunResult[]): void {
  results.sort((a, b) => a.path.localeCompare(b.path))
  for (const res of results) {
    res.suites.sort((a, b) => a.name.localeCompare(b.name))
  }
}

function getByteLength(text: string): number {
  return Buffer.byteLength(text, 'utf8')
}

function renderReport(results: TestRunResult[], options: ReportOptions): string {
  const sections: string[] = []
  const badge = getReportBadge(results)
  sections.push(badge)

  const runs = getTestRunsReport(results, options)
  sections.push(...runs)

  return sections.join('\n')
}

function getReportBadge(results: TestRunResult[]): string {
  const passed = results.reduce((sum, tr) => sum + tr.passed, 0)
  const skipped = results.reduce((sum, tr) => sum + tr.skipped, 0)
  const failed = results.reduce((sum, tr) => sum + tr.failed, 0)
  return getBadge(passed, failed, skipped)
}

function getBadge(passed: number, failed: number, skipped: number): string {
  const text = []
  if (passed > 0) {
    text.push(`${passed} passed`)
  }
  if (failed > 0) {
    text.push(`${failed} failed`)
  }
  if (skipped > 0) {
    text.push(`${skipped} skipped`)
  }
  const message = text.length > 0 ? text.join(', ') : 'none'

  let color = 'success'
  if (failed > 0) {
    color = 'critical'
  } else if (passed === 0 && failed === 0) {
    color = 'yellow'
  }
  const hint = failed > 0 ? 'Tests failed' : 'Tests passed successfully'
  const uri = encodeURIComponent(`tests-${message}-${color}`)
  return `![${hint}](https://img.shields.io/badge/${uri})`
}

function getTestRunsReport(testRuns: TestRunResult[], options: ReportOptions): string[] {
  const sections: string[] = []

  if (testRuns.length > 1) {
    const tableData = testRuns.map((tr, runIndex) => {
      const time = formatTime(tr.time)
      const name = tr.path
      const addr = makeRunSlug(runIndex).link
      const nameLink = link(name, addr)
      const passed = tr.passed > 0 ? `${tr.passed}${Icon.success}` : ''
      const failed = tr.failed > 0 ? `${tr.failed}${Icon.fail}` : ''
      const skipped = tr.skipped > 0 ? `${tr.skipped}${Icon.skip}` : ''
      return [nameLink, passed, failed, skipped, time]
    })

    const resultsTable = table(
      ['Report', 'Passed', 'Failed', 'Skipped', 'Time'],
      [Align.Left, Align.Right, Align.Right, Align.Right, Align.Right],
      ...tableData
    )
    sections.push(resultsTable)
  }

  const suitesReports = testRuns.map((tr, i) => getSuitesReport(tr, i, options)).flat()
  sections.push(...suitesReports)
  return sections
}

function getSuitesReport(tr: TestRunResult, runIndex: number, options: ReportOptions): string[] {
  const sections: string[] = []

  const trSlug = makeRunSlug(runIndex)
  const nameLink = `<a id="${trSlug.id}" href="${trSlug.link}">${tr.path}</a>`
  const icon = getResultIcon(tr.result)
  sections.push(`## ${nameLink} ${icon}`)

  const time = formatTime(tr.time)
  const headingLine2 =
    tr.tests > 0
      ? `**${tr.tests}** tests were completed in **${time}** with **${tr.passed}** passed, **${tr.failed}** failed and **${tr.skipped}** skipped.`
      : 'No tests found'
  sections.push(headingLine2)

  const suites = options.listSuites === 'failed' ? tr.failedSuites : tr.suites
  if (suites.length > 0) {
    const suitesTable = table(
      ['Test suite', 'Passed', 'Failed', 'Skipped', 'Time'],
      [Align.Left, Align.Right, Align.Right, Align.Right, Align.Right],
      ...suites.map((s, suiteIndex) => {
        const tsTime = formatTime(s.time)
        const tsName = s.name
        const skipLink = options.listTests === 'none' || (options.listTests === 'failed' && s.result !== 'failed')
        const tsAddr = makeSuiteSlug(runIndex, suiteIndex).link
        const tsNameLink = skipLink ? tsName : link(tsName, tsAddr)
        const passed = s.passed > 0 ? `${s.passed}${Icon.success}` : ''
        const failed = s.failed > 0 ? `${s.failed}${Icon.fail}` : ''
        const skipped = s.skipped > 0 ? `${s.skipped}${Icon.skip}` : ''
        return [tsNameLink, passed, failed, skipped, tsTime]
      })
    )
    sections.push(suitesTable)
  }

  if (options.listTests !== 'none') {
    const tests = suites.map((ts, suiteIndex) => getTestsReport(ts, runIndex, suiteIndex, options)).flat()

    if (tests.length > 1) {
      sections.push(...tests)
    }
  }

  return sections
}

function getTestsReport(ts: TestSuiteResult, runIndex: number, suiteIndex: number, options: ReportOptions): string[] {
  const groups = options.listTests === 'failed' ? ts.failedGroups : ts.groups
  if (groups.length === 0) {
    return []
  }

  const sections: string[] = []

  const tsName = ts.name
  const tsSlug = makeSuiteSlug(runIndex, suiteIndex)
  const tsNameLink = `<a id="${tsSlug.id}" href="${tsSlug.link}">${tsName}</a>`
  const icon = getResultIcon(ts.result)
  sections.push(`### ${tsNameLink} ${icon}`)

  const tsTime = formatTime(ts.time)
  const headingLine2 = `**${ts.tests}** tests were completed in **${tsTime}** with **${ts.passed}** passed, **${ts.failed}** failed and **${ts.skipped}** skipped.`
  sections.push(headingLine2)

  for (const grp of groups) {
    const tests = options.listTests === 'failed' ? grp.failedTests : grp.tests
    if (tests.length === 0) {
      continue
    }
    const grpHeader = grp.name ? `\n**${grp.name}**` : ''
    const testsTable = table(
      ['Result', 'Test', 'Time'],
      [Align.Center, Align.Left, Align.Right],
      ...grp.tests.map(tc => {
        const name = tc.name
        const time = formatTime(tc.time)
        const result = getResultIcon(tc.result)
        return [result, name, time]
      })
    )

    sections.push(grpHeader, testsTable)
  }

  return sections
}

function makeRunSlug(runIndex: number): {id: string; link: string} {
  // use prefix to avoid slug conflicts after escaping the paths
  return slug(`r${runIndex}`)
}

function makeSuiteSlug(runIndex: number, suiteIndex: number): {id: string; link: string} {
  // use prefix to avoid slug conflicts after escaping the paths
  return slug(`r${runIndex}s${suiteIndex}`)
}

function getResultIcon(result: TestExecutionResult): string {
  switch (result) {
    case 'success':
      return Icon.success
    case 'skipped':
      return Icon.skip
    case 'failed':
      return Icon.fail
    default:
      return ''
  }
}
