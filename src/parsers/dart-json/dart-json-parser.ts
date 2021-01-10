import {Annotation, ParseOptions, TestResult} from '../parser-types'

import {normalizeFilePath} from '../../utils/file-utils'
import {Align, Icon, link, table} from '../../utils/markdown-utils'
import {slug} from '../../utils/slugger'

import {
  ReportEvent,
  Suite,
  Group,
  TestStartEvent,
  TestDoneEvent,
  ErrorEvent,
  isSuiteEvent,
  isGroupEvent,
  isTestStartEvent,
  isTestDoneEvent,
  isErrorEvent,
  isDoneEvent
} from './dart-json-types'

class TestRun {
  constructor(readonly suites: TestSuite[], readonly success: boolean, readonly time: number) {}
  get count(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.count, 0)
  }
  get passed(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.passed, 0)
  }
  get failed(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.failed, 0)
  }
  get skipped(): number {
    return Object.values(this.suites).reduce((sum, g) => sum + g.skipped, 0)
  }
}

class TestSuite {
  constructor(readonly suite: Suite) {}
  groups: {[id: number]: TestGroup} = {}
  get count(): number {
    return Object.values(this.groups).reduce((sum, g) => sum + g.count, 0)
  }
  get passed(): number {
    return Object.values(this.groups).reduce((sum, g) => sum + g.passed, 0)
  }
  get failed(): number {
    return Object.values(this.groups).reduce((sum, g) => sum + g.failed, 0)
  }
  get skipped(): number {
    return Object.values(this.groups).reduce((sum, g) => sum + g.skipped, 0)
  }
  get time(): number {
    return Object.values(this.groups).reduce((sum, g) => sum + g.time, 0)
  }
}

class TestGroup {
  constructor(readonly group: Group) {}
  tests: TestCase[] = []
  get count(): number {
    return this.tests.length
  }
  get passed(): number {
    return this.tests.reduce((sum, t) => (t.isPassed ? sum + 1 : sum), 0)
  }
  get failed(): number {
    return this.tests.reduce((sum, t) => (t.isFailed ? sum + 1 : sum), 0)
  }
  get skipped(): number {
    return this.tests.reduce((sum, t) => (t.isSkipped ? sum + 1 : sum), 0)
  }
  get time(): number {
    return this.tests.reduce((sum, t) => sum + t.time, 0)
  }
}

class TestCase {
  constructor(readonly testStart: TestStartEvent) {
    this.groupId = testStart.test.groupIDs[testStart.test.groupIDs.length - 1]
  }
  readonly groupId: number
  testDone?: TestDoneEvent
  error?: ErrorEvent
  get isPassed(): boolean {
    return this.testDone?.result === 'success' && !this.testDone?.skipped
  }
  get isFailed(): boolean {
    return this.testDone?.result !== 'success'
  }
  get isSkipped(): boolean {
    return this.testDone?.skipped === true
  }
  get time(): number {
    return this.testDone !== undefined ? this.testDone.time - this.testStart.time : 0
  }
}

export async function parseDartJson(content: string, options: ParseOptions): Promise<TestResult> {
  const testRun = getTestRun(content)
  const icon = testRun.success ? Icon.success : Icon.fail

  return {
    success: testRun.success,
    output: {
      title: `${options.name.trim()} ${icon}`,
      summary: getSummary(testRun),
      annotations: options.annotations ? getAnnotations(testRun, options.workDir, options.trackedFiles) : undefined
    }
  }
}

function getTestRun(content: string): TestRun {
  const lines = content.split(/\n\r?/g).filter(line => line !== '')
  const events = lines.map(str => JSON.parse(str)) as ReportEvent[]

  let success = false
  let totalTime = 0
  const suites: {[id: number]: TestSuite} = {}
  const tests: {[id: number]: TestCase} = {}

  for (const evt of events) {
    if (isSuiteEvent(evt)) {
      suites[evt.suite.id] = new TestSuite(evt.suite)
    } else if (isGroupEvent(evt)) {
      suites[evt.group.suiteID].groups[evt.group.id] = new TestGroup(evt.group)
    } else if (isTestStartEvent(evt) && evt.test.url !== null) {
      const test: TestCase = new TestCase(evt)
      const suite = suites[evt.test.suiteID]
      const group = suite.groups[evt.test.groupIDs[evt.test.groupIDs.length - 1]]
      group.tests.push(test)
      tests[evt.test.id] = test
    } else if (isTestDoneEvent(evt) && !evt.hidden) {
      tests[evt.testID].testDone = evt
    } else if (isErrorEvent(evt)) {
      tests[evt.testID].error = evt
    } else if (isDoneEvent(evt)) {
      success = evt.success
      totalTime = evt.time
    }
  }

  return new TestRun(Object.values(suites), success, totalTime)
}

function getSummary(tr: TestRun): string {
  const time = `${(tr.time / 1000).toFixed(3)}s`
  const headingLine = `**${tr.count}** tests were completed in **${time}** with **${tr.passed}** passed, **${tr.skipped}** skipped and **${tr.failed}** failed.`

  const suitesSummary = tr.suites.map((s, i) => {
    const icon = s.failed === 0 ? Icon.success : Icon.fail
    const tsTime = `${s.time}ms`
    const tsName = s.suite.path
    const tsAddr = makeSuiteSlug(i, tsName).link
    const tsNameLink = link(tsName, tsAddr)
    return [icon, tsNameLink, s.count, tsTime, s.passed, s.failed, s.skipped]
  })

  const summary = table(
    ['Result', 'Suite', 'Tests', 'Time', `Passed ${Icon.success}`, `Failed ${Icon.fail}`, `Skipped ${Icon.skip}`],
    [Align.Center, Align.Left, Align.Right, Align.Right, Align.Right, Align.Right, Align.Right],
    ...suitesSummary
  )

  const suites = tr.suites.map((ts, i) => getSuiteSummary(ts, i)).join('\n')
  const suitesSection = `# Test Suites\n\n${suites}`

  return `${headingLine}\n${summary}\n${suitesSection}`
}

function getSuiteSummary(ts: TestSuite, index: number): string {
  const icon = ts.failed === 0 ? Icon.success : Icon.fail

  const groups = Object.values(ts.groups)
  groups.sort((a, b) => (a.group.line ?? 0) - (b.group.line ?? 0))

  const content = groups
    .filter(grp => grp.count > 0)
    .map(grp => {
      const header = grp.group.name !== null ? `### ${grp.group.name}\n\n` : ''
      grp.tests.sort((a, b) => (a.testStart.test.line ?? 0) - (b.testStart.test.line ?? 0))
      const tests = table(
        ['Result', 'Test', 'Time'],
        [Align.Center, Align.Left, Align.Right],
        ...grp.tests.map(tc => {
          const name = tc.testStart.test.name
          const time = `${tc.time}ms`
          const result = getTestCaseIcon(tc)
          return [result, name, time]
        })
      )

      return `${header}${tests}\n`
    })
    .join('\n')

  const tsName = ts.suite.path
  const tsSlug = makeSuiteSlug(index, tsName)
  const tsNameLink = `<a id="${tsSlug.id}" href="${tsSlug.link}">${tsName}</a>`
  return `## ${tsNameLink} ${icon}\n\n${content}`
}

function makeSuiteSlug(index: number, name: string): {id: string; link: string} {
  // use "ts-$index-" as prefix to avoid slug conflicts after escaping the paths
  return slug(`ts-${index}-${name}`)
}

function getTestCaseIcon(test: TestCase): string {
  if (test.isFailed) return Icon.fail
  if (test.isSkipped) return Icon.skip
  return Icon.success
}

function getAnnotations(tr: TestRun, workDir: string, trackedFiles: string[]): Annotation[] {
  const annotations: Annotation[] = []
  for (const suite of tr.suites) {
    for (const group of Object.values(suite.groups)) {
      for (const test of group.tests) {
        if (test.error) {
          const err = getAnnotation(test, suite, workDir, trackedFiles)
          if (err !== null) {
            annotations.push(err)
          }
        }
      }
    }
  }

  return annotations
}

function getAnnotation(
  test: TestCase,
  testSuite: TestSuite,
  workDir: string,
  trackedFiles: string[]
): Annotation | null {
  const stack = test.error?.stackTrace ?? ''
  let src = exceptionThrowSource(stack, trackedFiles)
  if (src === null) {
    const file = getRelativePathFromUrl(test.testStart.test.url ?? '', workDir)
    if (!trackedFiles.includes(file)) {
      return null
    }
    src = {
      file,
      line: test.testStart.test.line ?? 0
    }
  }

  return {
    annotation_level: 'failure',
    start_line: src.line,
    end_line: src.line,
    path: src.file,
    message: `${test.error?.error}\n\n${test.error?.stackTrace}`,
    title: `[${testSuite.suite.path}] ${test.testStart.test.name}`
  }
}

function exceptionThrowSource(ex: string, trackedFiles: string[]): {file: string; line: number} | null {
  // imports from package which is tested are listed in stack traces as 'package:xyz/' which maps to relative path 'lib/'
  const packageRe = /^package:[a-zA-z0-9_$]+\//
  const lines = ex.split(/\r?\n/).map(str => str.replace(packageRe, 'lib/'))

  // regexp to extract file path and line number from stack trace
  const re = /^(.*)\s+(\d+):\d+\s+/
  for (const str of lines) {
    const match = str.match(re)
    if (match !== null) {
      const [_, fileStr, lineStr] = match
      const file = normalizeFilePath(fileStr)
      if (trackedFiles.includes(file)) {
        const line = parseInt(lineStr)
        return {file, line}
      }
    }
  }

  return null
}

function getRelativePathFromUrl(file: string, workdir: string): string {
  const prefix = 'file:///'
  if (file.startsWith(prefix)) {
    file = file.substr(prefix.length)
  }
  if (file.startsWith(workdir)) {
    file = file.substr(workdir.length)
  }
  return file
}
