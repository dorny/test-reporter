import * as fs from 'fs'
import * as path from 'path'

import {normalizeFilePath} from '../src/utils/path-utils.js'

import {fileURLToPath} from 'url'
import {dirname} from 'path'

import {
  convertUnrealState,
  sanitizeJSONContentString,
  TestPathsMapElement,
  UnrealJsonParser
} from '../src/parsers/unreal-engine/unreal-json-parser.js'
import {
  aReport,
  FakeSingleUnrealTest,
  UnrealEngineTestExample,
  UnrealReportWithSingleTest
} from '../src/parsers/unreal-engine/fakes.js'
import {TestCaseResult, TestExecutionResult, TestGroupResult, TestSuiteResult} from '../src/test-results.js'
import {UnrealReport} from '../src/parsers/unreal-engine/unreal-json-types.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function getElementData(root: TestPathsMapElement, ix: number) {
  const el = root.childElements[ix]
  const suiteName = el.findSuiteName()
  const f = el.findGroupNode()
  const groupNames = el.findGroupNames()
  const groups = el.findGroups()
  return {el, suiteName, f, groupNames, groups}
}

describe('TestPathsMapElement', () => {
  const twoSingleSuitesWithSingleGroups = aReport(['First.Suite.SomeGroup', 'SecondSuite.AnotherGroup'])
  const treeOfSuitesAndGroups = aReport([
    'First.Suite.SomeGroup',
    'First.Suite.AnotherGroup',
    'First.Suite2.SomeGroup',
    'AnotherSuite2WithNoGroups'
  ])
  it.each([
    ['twoSingleSuitesWithSingleGroups', twoSingleSuitesWithSingleGroups],
    ['treeOfSuitesAndGroups', treeOfSuitesAndGroups]
  ])(`%s`, () => {
    const root = new TestPathsMapElement('root')
    for (const t of twoSingleSuitesWithSingleGroups.tests) {
      root.insertTest(t.fullTestPath.split(/\./), t)
    }
    {
      const {suiteName, f, groupNames, groups} = getElementData(root, 0)
      expect(groups.length).toBe(1)
      expect(groupNames).toStrictEqual([['SomeGroup']])
      expect(suiteName).toStrictEqual('First.Suite')
      expect(f?.elementName).toStrictEqual('SomeGroup')
    }
    {
      const {suiteName, f, groupNames, groups} = getElementData(root, 1)
      expect(groups.length).toBe(1)
      expect(groupNames).toStrictEqual([['AnotherGroup']])
      expect(suiteName).toStrictEqual('SecondSuite')
      expect(f?.elementName).toStrictEqual('AnotherGroup')
    }
  })

  const complexReport = {
    ...aReport(
      ['First.Suite', 'Seconde.Suite', 'LastSuite'],
      [
        ['Group.With.Long.Name', 'Group'],
        ['Fancy Group', 'Trick Group', 'Möbel Gruppe'],
        ['Fancy Another Group', 'What Group', 'Grünes Gruppe']
      ],
      5,
      'Wild.Test_' // this 'Wild' should be interpreted as part of the group
    )
  }

  it(`Handles complex test`, async () => {
    const root = new TestPathsMapElement('root')
    for (const t of complexReport.tests) {
      root.insertTest(t.fullTestPath.split(/\./), t)
    }
    {
      const {suiteName, f, groupNames, groups} = getElementData(root, 0)
      expect(groups.length).toBe(2)
      expect(groupNames).toStrictEqual([
        ['Group', 'With', 'Long', 'Name', 'Wild'],
        ['Group', 'Wild']
      ])
      expect(suiteName).toStrictEqual('First.Suite')
      expect(f?.elementName).toStrictEqual('Group')
    }
    {
      const {suiteName, f, groupNames, groups} = getElementData(root, 2)
      expect(suiteName).toStrictEqual('LastSuite')
      expect(f?.elementName).toStrictEqual('LastSuite')
      expect(groups.length).toBe(3)
      expect(groupNames).toStrictEqual([
        ['Fancy Another Group', 'Wild'],
        ['What Group', 'Wild'],
        ['Grünes Gruppe', 'Wild']
      ])
    }
  })
})

describe('basic test', () => {
  it('TestSuiteResult and other helpers work as expected', async () => {
    const {succeeded, failed, notRun, totalDuration, tests} = UnrealReportWithSingleTest
    const {testDisplayName, duration, state} = tests[0]
    const expectedState = convertUnrealState(state)
    const testcase = new TestCaseResult(testDisplayName, expectedState, duration)
    const group = new TestGroupResult('AGroup', [testcase])
    const suite = new TestSuiteResult('Private.Test.ThisIs.Not', [group], duration)

    const passCount = tests.filter(t => t.state === 'Success').length
    const failedTests = tests.filter(t => t.state === 'Fail')
    const failCount = failedTests.length
    const groupResult: TestExecutionResult = failCount > 0 ? 'failed' : 'success'
    const skipCount = tests.filter(t => t.state === 'Skipped').length
    const time = tests.reduce((prev, curr) => prev + curr.duration, 0)
    expect(succeeded).toStrictEqual(passCount)
    expect(failed).toStrictEqual(failCount)
    expect(notRun).toStrictEqual(skipCount)
    expect(totalDuration).toStrictEqual(time)
    expect(testcase.name).toStrictEqual(testDisplayName)
    expect(testcase.error).toBeUndefined()
    expect(testcase.result).toStrictEqual<TestExecutionResult>(expectedState)
    expect(testcase.time).toEqual(duration)
    expect(group.name).toStrictEqual('AGroup')
    expect(group.passed).toStrictEqual(passCount)
    expect(group.failed).toStrictEqual(failCount)
    expect(group.skipped).toStrictEqual(skipCount)
    expect(group.failedTests).toStrictEqual(failedTests)
    expect(group.result).toStrictEqual(groupResult)
    expect(group.tests).toStrictEqual([testcase])
    expect(group.time).toStrictEqual(time)
    expect(suite.name).toStrictEqual('Private.Test.ThisIs.Not')
    expect(suite.failed).toStrictEqual(failCount)
  })

  it('handles a basic single test suite with success state', async () => {
    const testContent = FakeSingleUnrealTest
    const FAKE_PATH = '/fake/file/path'
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})
    const result = await parser.parse(FAKE_PATH, testContent)

    const {succeeded, failed, notRun, totalDuration, tests} = UnrealReportWithSingleTest
    const {testDisplayName, duration, state} = tests[0]
    const expectedState = convertUnrealState(state)
    const testcase = new TestCaseResult(testDisplayName, expectedState, duration)
    const group = new TestGroupResult('EMPTY_GROUP_NAME', [testcase])
    const suite = new TestSuiteResult('Private.Test.ThisIs.Not.AGroup', [group], duration)

    expect(result.failed).toStrictEqual(failed)
    expect(result.failedSuites).toStrictEqual([])
    expect(result.passed).toStrictEqual(succeeded)
    expect(result.path).toEqual(FAKE_PATH)
    expect(result.result).toStrictEqual<TestExecutionResult>(expectedState)
    expect(result.skipped).toStrictEqual(notRun)
    expect(result.tests).toStrictEqual(tests.length)
    expect(result.time).toStrictEqual(totalDuration)
    expect(result.suites).toStrictEqual([suite])
  })
})

describe('UnrealJsonParser', () => {
  const testSuiteResult = {
    path: '/tmp',
    suites: [
      {
        groups: [
          {
            name: 'SomeGroup',
            tests: [
              {
                name: 'Test1',
                result: 'skipped',
                time: 0
              },
              {
                name: 'Test2',
                result: 'success',
                time: 0.3
              }
            ]
          }
        ],
        name: 'Project.Functional Tests',
        totalTime: 0.3
      }
    ],
    totalTime: 0.3
  }

  it('A report from a string', async () => {
    // Processing here should preserve the spaces in the string 'Functional Tests'
    const fileContent = JSON.stringify(UnrealEngineTestExample)
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})
    const result = await parser.parse('/tmp', fileContent)
    expect(result).toMatchObject(testSuiteResult)
  })

  it('A report from a path', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'unreal-engine', 'unreal-test-report.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})
    const result = await parser.parse(filePath, fileContent)
    const testData: UnrealReport = JSON.parse(sanitizeJSONContentString(fileContent))
    expect(result.failed).toStrictEqual(testData.failed)
    expect(result.passed).toStrictEqual(testData.succeeded + testData.succeededWithWarnings)
    expect(result.path).toEqual(path.join('fixtures', 'unreal-engine', 'unreal-test-report.json'))
    expect(result.result).toStrictEqual<TestExecutionResult>(testData.failed > 0 ? 'failed' : 'success')
    expect(result.skipped).toStrictEqual(testData.notRun)
    expect(result.tests).toStrictEqual(testData.tests.length)
    expect(result.time).toStrictEqual(testData.totalDuration)
  })
})
