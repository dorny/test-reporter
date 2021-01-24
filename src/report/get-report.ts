import * as core from '@actions/core'
import {TestExecutionResult, TestRunResult, TestSuiteResult} from './test-results'
import {Align, Icon, link, table} from '../utils/markdown-utils'
import {slug} from '../utils/slugger'

export default function getReport(results: TestRunResult[]): string {
  const badge = getBadge(results)
  const runsSummary = results.map(getRunSummary).join('\n\n')
  const suites = results
    .flatMap(tr => tr.suites)
    .map((ts, i) => getSuiteSummary(ts, i))
    .join('\n')

  const suitesSection = `# Test Suites\n\n${suites}`
  return [badge, runsSummary, suitesSection].join('\n\n')
}

function getBadge(results: TestRunResult[]): string {
  const passed = results.reduce((sum, tr) => sum + tr.passed, 0)
  const skipped = results.reduce((sum, tr) => sum + tr.skipped, 0)
  const failed = results.reduce((sum, tr) => sum + tr.failed, 0)

  const passedText = passed > 0 ? `${passed} passed` : null
  const skippedText = skipped > 0 ? `${skipped} skipped` : null
  const failedText = failed > 0 ? `${failed} failed` : null
  const message = [passedText, skippedText, failedText].filter(s => s != null).join(', ') || 'none'
  let color = 'success'
  if (failed > 0) {
    color = 'critical'
  } else if (passed === 0 && failed === 0) {
    color = 'yellow'
  }

  const uri = encodeURIComponent(`tests-${message}-${color}`)
  const text = failed > 0 ? 'Tests failed' : 'Tests passed successfully'
  return `![${text}](https://img.shields.io/badge/${uri})`
}

function getRunSummary(tr: TestRunResult): string {
  core.info('Generating check run summary')
  const time = `${(tr.time / 1000).toFixed(3)}s`
  const headingLine1 = `### ${tr.path}`
  const headingLine2 = `**${tr.tests}** tests were completed in **${time}** with **${tr.passed}** passed, **${tr.skipped}** skipped and **${tr.failed}** failed.`

  const suitesSummary = tr.suites.map((s, i) => {
    const icon = getResultIcon(s.result)
    const tsTime = `${s.time}ms`
    const tsName = s.name
    const tsAddr = makeSuiteSlug(i, tsName).link
    const tsNameLink = link(tsName, tsAddr)
    return [icon, tsNameLink, s.tests, tsTime, s.passed, s.skipped, s.failed]
  })

  const summary = table(
    ['Result', 'Suite', 'Tests', 'Time', `Passed ${Icon.success}`, `Skipped ${Icon.skip}`, `Failed ${Icon.fail}`],
    [Align.Center, Align.Left, Align.Right, Align.Right, Align.Right, Align.Right, Align.Right],
    ...suitesSummary
  )

  return [headingLine1, headingLine2, summary].join('\n\n')
}

function getSuiteSummary(ts: TestSuiteResult, index: number): string {
  const icon = getResultIcon(ts.result)
  const content = ts.groups
    .map(grp => {
      const header = grp.name ? `### ${grp.name}\n\n` : ''
      const tests = table(
        ['Result', 'Test', 'Time'],
        [Align.Center, Align.Left, Align.Right],
        ...grp.tests.map(tc => {
          const name = tc.name
          const time = `${tc.time}ms`
          const result = getResultIcon(tc.result)
          return [result, name, time]
        })
      )

      return `${header}${tests}\n`
    })
    .join('\n')

  const tsName = ts.name
  const tsSlug = makeSuiteSlug(index, tsName)
  const tsNameLink = `<a id="${tsSlug.id}" href="${tsSlug.link}">${tsName}</a>`
  return `## ${tsNameLink} ${icon}\n\n${content}`
}

function makeSuiteSlug(index: number, name: string): {id: string; link: string} {
  // use "ts-$index-" as prefix to avoid slug conflicts after escaping the paths
  return slug(`ts-${index}-${name}`)
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
