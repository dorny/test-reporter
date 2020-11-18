import {TestResult} from '../test-parser'
import {parseStringPromise} from 'xml2js'

import {JunitReport, TestCase, TestSuite, TestSuites} from './jest-junit-types'
import {Align, Icon, link, table, exceptionCell} from '../../utils/markdown-utils'
import {slug} from '../../utils/slugger'
import {parseAttribute} from '../../utils/xml-utils'

export async function parseJestJunit(content: string): Promise<TestResult> {
  const junit = (await parseStringPromise(content, {
    attrValueProcessors: [parseAttribute]
  })) as JunitReport
  const testsuites = junit.testsuites
  const success = !(testsuites.$?.failures > 0 || testsuites.$?.errors > 0)

  return {
    success,
    output: {
      title: junit.testsuites.$.name,
      summary: getSummary(success, junit)
    }
  }
}

function getSummary(success: boolean, junit: JunitReport): string {
  const stats = junit.testsuites.$

  const icon = success ? Icon.success : Icon.fail
  const time = `${stats.time.toFixed(3)}s`

  const skipped = getSkippedCount(junit.testsuites)
  const failed = stats.errors + stats.failures
  const passed = stats.tests - failed - skipped

  const heading = `# ${stats.name} ${icon}`
  const headingLine = `**${stats.tests}** tests were completed in **${time}** with **${passed}** passed, **${skipped}** skipped and **${failed}** failed.`

  const suitesSummary = junit.testsuites.testsuite.map((ts, i) => {
    const skip = ts.$.skipped
    const fail = ts.$.errors + ts.$.failures
    const pass = ts.$.tests - fail - skip
    const tm = `${ts.$.time.toFixed(3)}s`
    const result = success ? Icon.success : Icon.fail
    const tsName = ts.$.name
    const tsAddr = makeSuiteSlug(i, tsName).link
    const tsNameLink = link(tsName, tsAddr)
    return [result, tsNameLink, ts.$.tests, tm, pass, fail, skip]
  })

  const summary = table(
    ['Result', 'Suite', 'Tests', 'Time', `Passed ${Icon.success}`, `Failed ${Icon.fail}`, `Skipped ${Icon.skip}`],
    [Align.Center, Align.Left, Align.Right, Align.Right, Align.Right, Align.Right, Align.Right],
    ...suitesSummary
  )

  const suites = junit.testsuites?.testsuite?.map((ts, i) => getSuiteSummary(ts, i)).join('\n')
  const suitesSection = `## Test Suites\n\n${suites}`

  return `${heading}\n${headingLine}\n${summary}\n${suitesSection}`
}

function getSkippedCount(suites: TestSuites): number {
  return suites.testsuite.reduce((sum, suite) => sum + suite.$.skipped, 0)
}

function getSuiteSummary(suite: TestSuite, index: number): string {
  const success = !(suite.$?.failures > 0 || suite.$?.errors > 0)
  const icon = success ? Icon.success : Icon.fail

  const groups: {describe: string; tests: TestCase[]}[] = []
  for (const tc of suite.testcase) {
    let grp = groups.find(g => g.describe === tc.$.classname)
    if (grp === undefined) {
      grp = {describe: tc.$.classname, tests: []}
      groups.push(grp)
    }
    grp.tests.push(tc)
  }

  const content = groups
    .map(grp => {
      const header = grp.describe !== '' ? `#### ${grp.describe}\n\n` : ''
      const tests = table(
        ['Result', 'Test', 'Time', 'Details'],
        [Align.Center, Align.Left, Align.Right, Align.None],
        ...grp.tests.map(tc => {
          const name = tc.$.name
          const time = `${Math.round(tc.$.time * 1000)}ms`
          const result = getTestCaseIcon(tc)
          const ex = getTestCaseDetails(tc)
          return [result, name, time, ex]
        })
      )

      return `${header}${tests}\n`
    })
    .join('\n')

  const tsName = suite.$.name
  const tsSlug = makeSuiteSlug(index, tsName)
  const tsNameLink = `<a id="${tsSlug.id}" href="${tsSlug.link}">${tsName}</a>`
  return `### ${tsNameLink} ${icon}\n\n${content}`
}

function getTestCaseIcon(test: TestCase): string {
  if (test.failure) return Icon.fail
  if (test.skipped) return Icon.skip
  return Icon.success
}

function getTestCaseDetails(test: TestCase): string {
  if (test.skipped !== undefined) {
    return 'Skipped'
  }

  if (test.failure !== undefined) {
    const failure = test.failure.join('\n')
    return exceptionCell(failure)
  }

  return ''
}

function makeSuiteSlug(index: number, name: string): {id: string; link: string} {
  // use "ts-$index-" as prefix to avoid slug conflicts after escaping the paths
  return slug(`ts-${index}-${name}`)
}
