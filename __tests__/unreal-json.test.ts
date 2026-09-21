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
import {TestCaseResult, TestExecutionResult, TestGroupResult, TestSuiteResult} from '../src/test-results.js'
import {
  UnrealDevice,
  UnrealReport,
  UnrealTest,
  UnrealTestEvent,
  UnrealTestEventTypeRecord
} from '../src/parsers/unreal-engine/unreal-json-types.js'
import stripBom from 'strip-bom'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const aDevice = device()
const UnrealReportWithSingleTest = unrealReportWithSingleTest()
const FakeSingleUnrealTest = JSON.stringify(UnrealReportWithSingleTest)

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
    const suite = new TestSuiteResult('Private.Test.ThisIs.Not', [group])

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
    const suite = new TestSuiteResult('Private.Test.ThisIs.Not.AGroup', [group])

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
        time: 0.3
      }
    ],
    time: 0.3
  }

  it('A report from a string', async () => {
    // Processing here should preserve the spaces in the string 'Functional Tests'
    const fileContent = JSON.stringify(UnrealEngineTestExample)
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})
    const result = await parser.parse('/tmp', fileContent)
    expect(result).toMatchObject(testSuiteResult)
  })
  it('resets parser state for each report', async () => {
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})
    const firstReport = {
      ...UnrealReportWithSingleTest,
      tests: [aTestWithResult('First.Test')]
    }
    const secondReport = {
      ...UnrealReportWithSingleTest,
      tests: [aTestWithResult('Second.Test')]
    }

    const firstResult = await parser.parse('/first', JSON.stringify(firstReport))
    const secondResult = await parser.parse('/second', JSON.stringify(secondReport))

    expect(firstResult.tests).toBe(1)
    expect(secondResult.tests).toBe(1)
    expect(secondResult.suites.map(suite => suite.name)).toStrictEqual(['Second'])
  })

  it('uses the final path segment for an empty test display name', async () => {
    const report = {
      ...UnrealReportWithSingleTest,
      tests: [{...aTestWithResult('Suite.Group.ReadableTest'), testDisplayName: ''}]
    }
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})

    const result = await parser.parse('/empty-name', JSON.stringify(report))

    expect(result.suites[0].groups[0].tests[0].name).toBe('ReadableTest')
  })

  it('uses each suite test time instead of the report time', async () => {
    const report = {
      ...UnrealReportWithSingleTest,
      totalDuration: 1,
      tests: [
        {...aTestWithResult('First.Test'), duration: 0.25},
        {...aTestWithResult('Second.Test'), duration: 0.75}
      ]
    }
    const parser = new UnrealJsonParser({parseErrors: false, trackedFiles: []})

    const result = await parser.parse('/suite-times', JSON.stringify(report))

    expect(result.time).toBe(1)
    expect(result.suites.map(suite => suite.time)).toStrictEqual([0.25, 0.75])
  })

  it('A report from a path', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'unreal-engine', 'unreal-test-report.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = stripBom(fs.readFileSync(fixturePath, {encoding: 'utf8'}))
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

function eventTypeRecord(): UnrealTestEventTypeRecord {
  return {
    type: 'Error',
    message: 'LogDialog: Your test failed',
    context: 'log',
    artifact: '00000000000000000000000000000000'
  }
}

function entry(): UnrealTestEvent {
  return {
    event: eventTypeRecord(),
    filename: 'src/Proj/Dialog.cpp',
    lineNumber: 63,
    timestamp: '2026.08.06-11.49.53'
  }
}

function device(): UnrealDevice {
  return {
    deviceName: 'Cyberdyne-Systems-T2000.local',
    instance: 'F35C7BB1284BDF8F6E09B880ABB1710E',
    instanceName: 'Cyberdyne.Term2.local-68471',
    platform: 'MacEditor',
    oSVersion: 'macOS 26.5.2 25F84',
    model: 'Default',
    gPU: 'Apple M3 Max',
    cPUModel: 'Apple M3 Max',
    rAMInGB: 36,
    renderMode: 'SM6',
    rHI: '',
    appInstanceLog: ''
  }
}

function unrealReportWithSingleTest(): UnrealReport {
  const aTest = aTestWithResult('Private.Test.ThisIs.Not.AGroup.Basic')
  return {
    devices: [aDevice],
    reportCreatedOn: '2026.08.10-11.46.00',
    succeeded: 1,
    succeededWithWarnings: 0,
    failed: 0,
    notRun: 0,
    inProcess: 0,
    totalDuration: aTest.duration,
    comparisonExported: false,
    comparisonExportDirectory: '',
    tests: [aTest]
  }
}

function aTestWithResult(
  fullTestPath: string = 'SUITE.PATH.TEST',
  state: UnrealTest['state'] = 'Success',
  entries: UnrealTestEvent[] = [entry()]
): UnrealTest {
  const aTest: UnrealTest = {
    testDisplayName: 'Basic',
    fullTestPath: 'Private.Test.ThisIs.Not.AGroup.Basic',
    state: 'Success',
    deviceInstance: ['F35C7BB1284BDF8F6E09B880ABB1710E'],
    duration: 0.0080692917108535767,
    dateTime: '2026.08.10-11.45.59',
    entries: [],
    warnings: 0,
    errors: 0,
    artifacts: []
  }
  let testDisplayName = 'DEFAULT_TEST_NAME'
  const dotIx = fullTestPath.lastIndexOf('.')
  if (dotIx !== -1) {
    testDisplayName = fullTestPath.substring(dotIx + 1)
    if (!testDisplayName || testDisplayName.length === 0) {
      throw Error('bad full test path - dots must be embedded.in.string.path')
    }
  }
  return {
    ...aTest,
    testDisplayName,
    fullTestPath,
    state,
    entries
  }
}

function aReport(
  suiteNames: string[] = ['SUITE'],
  groupNames: string[][] = [],
  testsPerGroup: number = 2,
  testNamePrefix: string = 'Test_'
): UnrealReport {
  const tests: UnrealTest[] = []
  for (let ix = 0; ix < suiteNames.length; ix++) {
    const suite = suiteNames[ix]
    if (groupNames.length > ix && groupNames[ix].length >= 1) {
      for (let jx = 0; jx < groupNames[ix].length; jx++) {
        for (let kx = 0; kx < testsPerGroup; kx++) {
          const suffix = testNamePrefix.length > 0 ? `.${testNamePrefix}${kx}` : ''
          const t = aTestWithResult(`${suite}.${groupNames[ix][jx]}${suffix}`)
          tests.push(t)
        }
      }
    } else {
      for (let kx = 0; kx < testsPerGroup; kx++) {
        const suffix = testNamePrefix.length > 0 ? `.${testNamePrefix}${kx}` : ''
        const t = aTestWithResult(`${suite}${suffix}`)
        tests.push(t)
        if (testNamePrefix.length === 0) {
          break // pretend testsPerGroup is 1, because there's no test names to differentiate
        }
      }
    }
  }
  return {
    ...UnrealReportWithSingleTest,
    tests
  }
}

/** From Unreal's website: https://dev.epicgames.com/documentation/unreal-engine/review-test-results-in-unreal-engine#json */
const UnrealEngineTestExample = {
  devices: [
    {
      deviceName: '00-00-000-00',
      instance: '878B6A854613D3B6A69CDEAFBA1C5DBA',
      platform: 'WindowsEditor',
      oSVersion: 'Windows Server 2022 (21H2) [10.0.20348.524] ',
      model: 'Default',
      gPU: 'Microsoft Basic Display Adapter',
      cPUModel: 'Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz',
      rAMInGB: 127,
      renderMode: 'D3D11_SM5',
      rHI: 'DirectX 11',
      appInstanceLog: ''
    }
  ],
  reportCreatedOn: '2000.01.01-12.00.00',
  succeeded: 1,
  succeededWithWarnings: 0,
  failed: 0,
  notRun: 0,
  inProcess: 0,
  totalDuration: 0.3,
  comparisonExported: false,
  comparisonExportDirectory: '',
  tests: [
    {
      testDisplayName: 'Test1',
      fullTestPath: 'Project.Functional Tests.SomeGroup.Test1',
      state: 'Skipped',
      deviceInstance: ['878B6A854613D3B6A69CDEAFBA1C5DBA'],
      duration: 0,
      dateTime: '2000.01.01-12.00.00',
      entries: [
        {
          event: {
            type: 'Info',
            message: 'Skipping test: Tests for review [config]',
            context: '',
            artifact: '00000000000000000000000000000000'
          },
          filename: '',
          lineNumber: -1,
          timestamp: '2000.01.01-12.00.00'
        }
      ],
      warnings: 0,
      errors: 0,
      artifacts: []
    },
    {
      testDisplayName: 'Test2',
      fullTestPath: 'Project.Functional Tests.SomeGroup.Test2',
      state: 'Success',
      deviceInstance: ['878B6A854613D3B6A69CDEAFBA1C5DBA'],
      duration: 0.3,
      dateTime: '2000.01.01-12.00.00',
      entries: [],
      warnings: 0,
      errors: 0,
      artifacts: []
    }
  ]
}
