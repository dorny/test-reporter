import { ParseOptions, TestParser } from '../../test-parser'

import { GoTestEvent } from './golang-json-types'
import { getExceptionSource } from '../../utils/node-utils'
import { getBasePath, normalizeFilePath } from '../../utils/path-utils'

import {
  TestExecutionResult,
  TestRunResult,
  TestSuiteResult,
  TestGroupResult,
  TestCaseResult,
  TestCaseError
} from '../../test-results'

export class GolangJsonParser implements TestParser {
  assumedWorkDir: string | undefined

  constructor(readonly options: ParseOptions) { }

  async parse(path: string, content: string): Promise<TestRunResult> {
    const events = await this.getGolangTestEvents(path, content)
    return this.getTestRunResult(path, events)
  }

  private async getGolangTestEvents(path: string, content: string): Promise<GoTestEvent[]> {
    return content.trim().split('\n').map((line, index) => {
      try {
        return JSON.parse(line) as GoTestEvent
      } catch (e) {
        throw new Error(`Invalid JSON at ${path} line ${index + 1}\n\n${e}`)
      }
    })
  }

  private getTestRunResult(path: string, events: GoTestEvent[]): TestRunResult {
    const eventGroups = new Map<string, GoTestEvent[]>()
    for (const event of events) {
      if (!event.Test) {
        continue
      }
      const k = `${event.Package}/${event.Test}`
      let g = eventGroups.get(k)
      if (!g) {
        g = []
        eventGroups.set(k, g)
      }
      g.push(event)
    }

    const suites: TestSuiteResult[] = []

    for (const eventGroup of eventGroups.values()) {
      const event = eventGroup[0]

      let suite = suites.find(s => s.name === event.Package)
      if (!suite) {
        suite = new TestSuiteResult(event.Package, [])
        suites.push(suite)
      }

      if (!event.Test) {
        continue
      }

      let groupName: string | null
      let rest: string[]
      [groupName, ...rest] = event.Test.split('/')
      let testName = rest.join('/')
      if (!testName) {
        testName = groupName
        groupName = null
      }

      let group = suite.groups.find(g => g.name === groupName)
      if (!group) {
        group = new TestGroupResult(groupName, [])
        suite.groups.push(group)
      }

      const lastEvent = eventGroup.at(-1)!

      const result: TestExecutionResult = lastEvent.Action === 'pass' ? 'success'
        : lastEvent.Action === 'skip' ? 'skipped'
          : 'failed'
      if (lastEvent.Elapsed === undefined) {
        throw new Error('missing elapsed on final test event')
      }
      const time: number = lastEvent.Elapsed * 1000

      let error: TestCaseError | undefined = undefined
      if (result !== 'success') {
        const outputEvents = eventGroup
          .filter(e => e.Action === 'output')
          .map(e => e.Output ?? '')
          // Go output prepends indentation to help group tests - remove it
          .map(o => o.replace(/^    /, ''))

        // First and last lines will be generic "test started" and "test finished" lines - remove them
        outputEvents.splice(0, 1)
        outputEvents.splice(-1, 1)

        const details = outputEvents.join('')
        error = {
          message: details,
          details: details
        }
      }

      group.tests.push(new TestCaseResult(testName, result, time, error))
    }

    return new TestRunResult(path, suites)
  }
}
