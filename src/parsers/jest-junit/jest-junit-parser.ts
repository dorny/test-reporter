import {TestResult} from '../test-parser'
import {parseStringPromise} from 'xml2js'
import GithubSlugger from 'github-slugger'

import {JunitReport, TestCase, TestSuite, TestSuites} from './jest-junit-types'
import {Align, Icon, link, table, exceptionCell} from '../../utils/markdown-utils'
import {parseAttribute} from '../../utils/xml-utils'

export async function parseJestJunit(content: string): Promise<TestResult> {
  const junit = (await parseStringPromise(content, {
    attrValueProcessors: [parseAttribute]
  })) as JunitReport
  const testsuites = junit.testsuites

  const slugger = new GithubSlugger()
  const success = !(testsuites.$?.failures > 0 || testsuites.$?.errors > 0)

  return {
    success,
    output: {
      title: junit.testsuites.$.name,
      summary: getSummary(success, junit, slugger)
    }
  }
}

function getSummary(success: boolean, junit: JunitReport, slugger: GithubSlugger): string {
  const stats = junit.testsuites.$

  const icon = success ? Icon.success : Icon.fail
  const time = `${stats.time.toFixed(3)}s`

  const skipped = getSkippedCount(junit.testsuites)
  const failed = stats.errors + stats.failures
  const passed = stats.tests - failed - skipped

  const heading = `# ${stats.name} ${icon}`
  const headingLine = `**${stats.tests}** tests were completed in **${time}** with **${passed}** passed, **${skipped}** skipped and **${failed}** failed.`

  const suitesSummary = junit.testsuites.testsuite.map(ts => {
    const skip = ts.$.skipped
    const fail = ts.$.errors + ts.$.failures
    const pass = ts.$.tests - fail - skip
    const tm = `${ts.$.time.toFixed(3)}s`
    const result = success ? Icon.success : Icon.fail
    const slug = slugger.slug(`${ts.$.name} ${result}`).replace(/_/g, '')
    const tsAddr = `#${slug}`
    const name = link(ts.$.name, tsAddr)
    return [result, name, ts.$.tests, tm, pass, fail, skip]
  })

  const summary = table(
    ['Result', 'Suite', 'Tests', 'Time', `Passed ${Icon.success}`, `Failed ${Icon.fail}`, `Skipped ${Icon.skip}`],
    [Align.Center, Align.Left, Align.Right, Align.Right, Align.Right, Align.Right, Align.Right],
    ...suitesSummary
  )

  const suites = junit.testsuites?.testsuite?.map(ts => getSuiteSummary(ts)).join('\n')
  const suitesSection = `## Test Suites\n\n${suites}`

  return `${heading}\n${headingLine}\n${summary}\n${suitesSection}`
}

function getSkippedCount(suites: TestSuites): number {
  return suites.testsuite.reduce((sum, suite) => sum + suite.$.skipped, 0)
}

function getSuiteSummary(suite: TestSuite): string {
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

  return `### ${suite.$.name} ${icon}\n\n${content}`
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
