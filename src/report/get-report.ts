import * as core from '@actions/core'
import {TestExecutionResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../test-results'
import {Align, formatTime, Icon, link, table} from '../utils/markdown-utils'
import {DEFAULT_LOCALE} from '../utils/node-utils'
import {getFirstNonEmptyLine} from '../utils/parse-utils'
import {slug} from '../utils/slugger'

const DETAILS_CLOSE = '</details>'
// A blank line, so GitHub leaves the HTML block and renders the markdown inside it.
const DETAILS_SEPARATOR = ' '

const MAX_REPORT_LENGTH = 65535
const MAX_ACTIONS_SUMMARY_LENGTH = 1048576

export interface ReportOptions {
  listSuites: 'all' | 'failed' | 'none'
  listTests: 'all' | 'failed' | 'none'
  sortSuites: 'name' | 'time-desc'
  baseUrl: string
  onlySummary: boolean
  useActionsSummary: boolean
  badgeTitle: string
  reportTitle: string
  collapsed: 'auto' | 'always' | 'never'
  collapseSuites: boolean
  collapseGroups: boolean
}

export const DEFAULT_OPTIONS: ReportOptions = {
  listSuites: 'all',
  listTests: 'all',
  sortSuites: 'name',
  baseUrl: '',
  onlySummary: false,
  useActionsSummary: true,
  badgeTitle: 'tests',
  reportTitle: '',
  collapsed: 'auto',
  collapseSuites: false,
  collapseGroups: false
}

export function getReport(
  results: TestRunResult[],
  options: ReportOptions = DEFAULT_OPTIONS,
  shortSummary = ''
): string {
  applySort(results, options)

  const opts = {...options}
  let lines = renderReport(results, opts, shortSummary)
  let report = lines.join('\n')

  if (getByteLength(report) <= getMaxReportLength(options)) {
    return report
  }

  if (opts.listTests === 'all') {
    core.info("Test report summary is too big - setting 'listTests' to 'failed'")
    opts.listTests = 'failed'
    lines = renderReport(results, opts, shortSummary)
    report = lines.join('\n')
    if (getByteLength(report) <= getMaxReportLength(options)) {
      return report
    }
  }

  core.warning(`Test report summary exceeded limit of ${getMaxReportLength(options)} bytes and will be trimmed`)
  return trimReport(lines, options)
}

function getMaxReportLength(options: ReportOptions = DEFAULT_OPTIONS): number {
  return options.useActionsSummary ? MAX_ACTIONS_SUMMARY_LENGTH : MAX_REPORT_LENGTH
}

function trimReport(lines: string[], options: ReportOptions): string {
  const closingBlock = '```'
  const errorMsg = `**Report exceeded GitHub limit of ${getMaxReportLength(options)} bytes and has been trimmed**`
  // The deepest nesting anywhere in the report, not the depth it ends at: a
  // complete report is balanced, so the depth at the end is zero and would
  // reserve nothing for the sections left open wherever the trim lands.
  const maxDetailsClosingLength = detailsDepth(lines).peak * (DETAILS_CLOSE.length + 1)
  const maxErrorMsgLength = closingBlock.length + errorMsg.length + 2 + maxDetailsClosingLength
  const maxReportLength = getMaxReportLength(options) - maxErrorMsgLength

  let reportLength = 0
  let codeBlock = false
  let endLineIndex = 0
  for (endLineIndex = 0; endLineIndex < lines.length; endLineIndex++) {
    const line = lines[endLineIndex]
    const lineLength = getByteLength(line)

    reportLength += lineLength + 1
    if (reportLength > maxReportLength) {
      break
    }

    if (line === '```') {
      codeBlock = !codeBlock
    }
  }

  const reportLines = lines.slice(0, endLineIndex)
  if (codeBlock) {
    reportLines.push('```')
  }
  // The trim message must land outside every open <details>, or it is hidden in a
  // section the reader has to guess to expand.
  for (let i = detailsDepth(reportLines).open; i > 0; i--) {
    reportLines.push(DETAILS_CLOSE)
  }
  reportLines.push(errorMsg)
  return reportLines.join('\n')
}

function detailsDepth(lines: string[]): {open: number; peak: number} {
  let depth = 0
  let peak = 0
  for (const line of lines) {
    if (line.startsWith('<details')) {
      depth++
      peak = Math.max(peak, depth)
    } else if (line === DETAILS_CLOSE) {
      depth--
    }
  }
  return {open: Math.max(depth, 0), peak}
}

function applySort(results: TestRunResult[], options: ReportOptions): void {
  results.sort((a, b) => a.path.localeCompare(b.path, DEFAULT_LOCALE))
  for (const res of results) {
    if (options.sortSuites === 'time-desc') {
      res.suites.sort((a, b) => b.time - a.time)
    } else {
      res.suites.sort((a, b) => a.name.localeCompare(b.name, DEFAULT_LOCALE))
    }
  }
}

function getByteLength(text: string): number {
  return Buffer.byteLength(text, 'utf8')
}

function renderReport(results: TestRunResult[], options: ReportOptions, shortSummary: string): string[] {
  const sections: string[] = []

  const reportTitle: string = options.reportTitle.trim()
  if (reportTitle) {
    sections.push(`# ${reportTitle}`)
  }

  if (shortSummary) {
    sections.push(`## ${shortSummary}`)
  }

  const badge = getReportBadge(results, options)
  sections.push(badge)

  const runs = getTestRunsReport(results, options)
  sections.push(...runs)

  return sections
}

function getReportBadge(results: TestRunResult[], options: ReportOptions): string {
  const passed = results.reduce((sum, tr) => sum + tr.passed, 0)
  const skipped = results.reduce((sum, tr) => sum + tr.skipped, 0)
  const failed = results.reduce((sum, tr) => sum + tr.failed, 0)
  return getBadge(passed, failed, skipped, options)
}

export function getBadge(passed: number, failed: number, skipped: number, options: ReportOptions): string {
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
  const encodedBadgeTitle = encodeImgShieldsURIComponent(options.badgeTitle)
  const encodedMessage = encodeImgShieldsURIComponent(message)
  const encodedColor = encodeImgShieldsURIComponent(color)
  return `![${hint}](https://img.shields.io/badge/${encodedBadgeTitle}-${encodedMessage}-${encodedColor})`
}

function getTestRunsReport(testRuns: TestRunResult[], options: ReportOptions): string[] {
  const sections: string[] = []
  const totalFailed = testRuns.reduce((sum, tr) => sum + tr.failed, 0)

  // Determine if report should be collapsed based on collapsed option
  const shouldCollapse = options.collapsed === 'always' || (options.collapsed === 'auto' && totalFailed === 0)

  if (shouldCollapse) {
    sections.push(`<details><summary>Expand for details</summary>`)
    sections.push(DETAILS_SEPARATOR)
  }

  if (testRuns.length > 0 || options.onlySummary) {
    const tableData = testRuns
      .map((tr, originalIndex) => ({tr, originalIndex}))
      .filter(({tr}) => tr.passed > 0 || tr.failed > 0 || tr.skipped > 0)
      .map(({tr, originalIndex}) => {
        const time = formatTime(tr.time)
        const name = tr.path
        const addr = options.baseUrl + makeRunSlug(originalIndex, options).link
        const nameLink = link(name, addr)
        const passed = tr.passed > 0 ? `${tr.passed} ${Icon.success}` : ''
        const failed = tr.failed > 0 ? `${tr.failed} ${Icon.fail}` : ''
        const skipped = tr.skipped > 0 ? `${tr.skipped} ${Icon.skip}` : ''
        return [nameLink, passed, failed, skipped, time]
      })

    const resultsTable = table(
      ['Report', 'Passed', 'Failed', 'Skipped', 'Time'],
      [Align.Left, Align.Right, Align.Right, Align.Right, Align.Right],
      ...tableData
    )
    sections.push(resultsTable)
  }

  if (options.onlySummary === false) {
    const suitesReports = testRuns.map((tr, i) => getSuitesReport(tr, i, options)).flat()
    sections.push(...suitesReports)
  }

  if (shouldCollapse) {
    sections.push(DETAILS_CLOSE)
  }
  return sections
}

function getSuitesReport(tr: TestRunResult, runIndex: number, options: ReportOptions): string[] {
  const sections: string[] = []
  const suites = options.listSuites === 'failed' ? tr.failedSuites : tr.suites

  if (options.listSuites !== 'none') {
    const trSlug = makeRunSlug(runIndex, options)
    const nameLink = `<a id="${trSlug.id}" href="${options.baseUrl + trSlug.link}">${tr.path}</a>`
    const icon = getResultIcon(tr.result)
    sections.push(`## ${icon}\xa0${nameLink}`)

    const time = formatTime(tr.time)
    const flaky = tr.flaky > 0 ? ` **${tr.flaky}** of them only after being retried.` : ''
    const headingLine2 =
      tr.tests > 0
        ? `**${tr.tests}** tests were completed in **${time}** with **${tr.passed}** passed, **${tr.failed}** failed and **${tr.skipped}** skipped.${flaky}`
        : 'No tests found'
    sections.push(headingLine2)

    if (suites.length > 0) {
      const suitesTable = table(
        ['Test suite', 'Passed', 'Failed', 'Skipped', 'Retried', 'Time'],
        [Align.Left, Align.Right, Align.Right, Align.Right, Align.Right, Align.Right],
        ...suites.map((s, suiteIndex) => {
          const tsTime = formatTime(s.time)
          const tsName = s.name
          const skipLink = options.listTests === 'none' || (options.listTests === 'failed' && s.result !== 'failed')
          const tsAddr = options.baseUrl + makeSuiteSlug(runIndex, suiteIndex, options).link
          const tsNameLink = skipLink ? tsName : link(tsName, tsAddr)
          const passed = s.passed > 0 ? `${s.passed} ${Icon.success}` : ''
          const failed = s.failed > 0 ? `${s.failed} ${Icon.fail}` : ''
          const skipped = s.skipped > 0 ? `${s.skipped} ${Icon.skip}` : ''
          const flaky = s.flaky > 0 ? `${s.flaky} ${Icon.flaky}` : ''
          return [tsNameLink, passed, failed, skipped, flaky, tsTime]
        })
      )
      sections.push(suitesTable)
    }
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
  if (options.listTests === 'failed' && ts.result !== 'failed') {
    return []
  }
  const groups = ts.groups
  if (groups.length === 0) {
    return []
  }

  const sections: string[] = []

  const tsName = ts.name
  const tsSlug = makeSuiteSlug(runIndex, suiteIndex, options)
  const tsNameLink = `<a id="${tsSlug.id}" href="${options.baseUrl + tsSlug.link}">${tsName}</a>`
  const icon = getResultIcon(ts.result)
  if (options.collapseSuites) {
    // The anchor lives in the <summary>, which renders even while the section is
    // closed. Inside the body it would be unreachable: GitHub does not expand a
    // <details> to reveal the anchor a link targets.
    sections.push(DETAILS_SEPARATOR)
    // No href on the anchor: a link in the summary would swallow the click that is
    // supposed to open the section.
    sections.push(`<details><summary><a id="${tsSlug.id}"></a>${icon}\xa0${tsName}\xa0${formatCounts(ts)}</summary>`)
    sections.push(DETAILS_SEPARATOR)
  } else {
    sections.push(`### ${icon}\xa0${tsNameLink}`)
  }

  if (options.collapseGroups) {
    sections.push(...getCollapsedGroupsReport(groups, options))
  } else {
    sections.push('```')
    for (const grp of groups) {
      if (grp.name) {
        sections.push(grp.name)
      }
      sections.push(...getGroupTestLines(grp, options, grp.name ? '  ' : ''))
    }
    sections.push('```')
  }

  if (options.collapseSuites) {
    sections.push(DETAILS_CLOSE)
  }

  return sections
}

// A suite here is a whole test target, whose cases are grouped by the class that
// declares them. Listing them all inline puts thousands of lines behind one
// summary line, which is the wall the suite sections were closed to avoid.
function getCollapsedGroupsReport(groups: TestGroupResult[], options: ReportOptions): string[] {
  const sections: string[] = []

  for (const grp of groups) {
    const testLines = getGroupTestLines(grp, options, '')
    if (testLines.length === 0) {
      continue
    }

    if (grp.name) {
      sections.push(DETAILS_SEPARATOR)
      sections.push(`<details><summary>${getResultIcon(grp.result)}\xa0${grp.name}\xa0${formatCounts(grp)}</summary>`)
      sections.push(DETAILS_SEPARATOR)
    }

    sections.push('```', ...testLines, '```')

    if (grp.name) {
      sections.push(DETAILS_CLOSE)
    }
  }

  return sections
}

function getGroupTestLines(grp: TestGroupResult, options: ReportOptions, indent: string): string[] {
  const lines: string[] = []

  for (const tc of grp.tests) {
    if (options.listTests === 'failed' && tc.result !== 'failed') {
      continue
    }
    const result = getResultIcon(tc.result)
    const retried = tc.retries > 0 ? ` ${Icon.flaky} retried ${tc.retries}\xd7` : ''
    lines.push(`${indent}${result} ${tc.name}${retried}`)
    if (tc.error) {
      const errorLines = (tc.error.message ?? getFirstNonEmptyLine(tc.error.details)?.trim())
        ?.split(/\r?\n/g)
        .map(l => '\t' + l)
      if (errorLines) {
        lines.push(...errorLines)
      }
    }
  }

  return lines
}

function formatCounts(result: {passed: number; failed: number; skipped: number; flaky: number; time: number}): string {
  const counts = []
  if (result.passed > 0) {
    counts.push(`${result.passed} ${Icon.success}`)
  }
  if (result.failed > 0) {
    counts.push(`${result.failed} ${Icon.fail}`)
  }
  if (result.skipped > 0) {
    counts.push(`${result.skipped} ${Icon.skip}`)
  }
  if (result.flaky > 0) {
    counts.push(`${result.flaky} ${Icon.flaky}`)
  }
  return `${counts.join(' ')} (${formatTime(result.time)})`
}

function makeRunSlug(runIndex: number, options: ReportOptions): {id: string; link: string} {
  // use prefix to avoid slug conflicts after escaping the paths
  return slug(`r${runIndex}`, options)
}

function makeSuiteSlug(runIndex: number, suiteIndex: number, options: ReportOptions): {id: string; link: string} {
  // use prefix to avoid slug conflicts after escaping the paths
  return slug(`r${runIndex}s${suiteIndex}`, options)
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

function encodeImgShieldsURIComponent(component: string): string {
  return encodeURIComponent(component).replace(/-/g, '--').replace(/_/g, '__')
}
