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

export const FakeSingleUnrealTest = JSON.stringify(UnrealReportWithSingleTest)
