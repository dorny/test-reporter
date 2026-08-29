import {
  UnrealDevice,
  UnrealReport,
  UnrealTest,
  UnrealTestEvent,
  UnrealTestEventTypeRecord
} from './unreal-json-types.js'

export const aDevice: UnrealDevice = {
  deviceName: 'Cyberdyne-Systems-T2000.local',
  instance: 'F35C7BB1284BDF8F6E09B880ABB1710E',
  instanceName: 'Cyberdyne.Term2.local-68471',
  platform: 'MacEditor',
  oSVersion: 'macOS 26.5.2 25F84',
  model: 'Default',
  gPL: 'Apple M3 Max',
  cPUModel: 'Apple M3 Max',
  rAMInGB: 36,
  renderMode: 'SM6',
  rHI: '',
  appInstanceLog: ''
}

export const aTest: UnrealTest = {
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

export const anEventTypeRecord: UnrealTestEventTypeRecord = {
  type: 'Error',
  message: 'LogDialog: Your test failed',
  context: 'log',
  artifact: '00000000000000000000000000000000'
}

export const anEntry: UnrealTestEvent = {
  event: anEventTypeRecord,
  filename: 'src/Proj/Dialog.cpp',
  lineNumber: 63,
  timestamp: '2026.08.06-11.49.53'
}

export const UnrealReportWithSingleTest: UnrealReport = {
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

export function aTestWithResult(
  fullTestPath: string = 'SUITE.PATH.TEST',
  state: UnrealTest['state'] = 'Success',
  entries: UnrealTestEvent[] = []
): UnrealTest {
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

export function aReport(
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
export const UnrealEngineTestExample = {
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

export const FakeSingleUnrealTest = JSON.stringify(UnrealReportWithSingleTest)
