export type UnrealDevice = {
  deviceName: string
  instance: string // F35C7BB1284BDF8F6E09B880ABB1710E
  /// Sarah-Personal-MacBook-2.local-68471,
  instanceName: string
  /// MacEditor,
  platform: string
  /// macOS 26.5.2 25F84
  oSVersion: string
  /// Default,
  model: string
  gPL: string
  /// QEMU TCG CPU version 2.5+, for docker image, or
  /// Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz,
  cPUModel: string
  /// 127
  rAMInGB: number
  /// SM6, - shader model 6 on mac, or D3D11_SM5, direct 3d on win
  renderMode: string
  /// DirectX 11, -
  rHI: string
  /// usually empty
  appInstanceLog: string
}

export type UnrealTestEventTypeRecord = {
  type: 'Warning' | 'Error' | 'Debug' | 'Log'
  ///  What displayed in the event, eg "LogDialog: #### SetBarkLineTimer: 7.000000"
  message: string
  ///  "log",
  context: string
  artifact: string
}

export type UnrealTestEvent = {
  event: UnrealTestEventTypeRecord
  ///  a file name, with stack traces
  filename: string
  ///  -1 / or some line number with stack traces
  lineNumber: number
  ///   "2026.08.06-11.49.53"
  timestamp: string
}

export type UnrealTest = {
  /// eg "SpawnEnemy" - leaf name of the fullTestPath
  testDisplayName: string
  /// eg: "System.Mass.ArchetypeEntityCollection.Create.SpawnEnemy"
  fullTestPath: string
  /// Outcome of the test
  state: 'Success' | 'Skipped' | 'Fail'
  /// F35C7BB1284BDF8F6E09B880ABB1710E - identifier/s of the device/s it ran on
  deviceInstance: string[]
  /// Wall clock time for this test eg 0.0080692917108535767, seconds
  duration: number
  ///  Date/time - it finished (I think) 2026.08.10-11.45.59
  dateTime: string
  /// Log entries, stack traces and so on.
  entries: UnrealTestEvent[] // array of events
  /// Count of the number of warnings
  warnings: number
  /// Count of the number of errors
  errors: number
  /// Meant to be paths to artifacts, usually empty
  artifacts: []
}

export type UnrealReport = {
  devices: UnrealDevice[]
  /// Date of test '2026.08.10-11.46.00'
  reportCreatedOn: string
  /// 50 succeeded - count of successes
  succeeded: number
  /// 2 succeeded with warnings on std err
  succeededWithWarnings: number
  /// 1 failed
  failed: number
  /// 0 not run skipped?
  notRun: number
  /// count of number running at once? Not a PID AFAICT, often 0
  inProcess: number
  /// float: 0.41858440637588501
  totalDuration: number
  comparisonExported: boolean
  comparisonExportDirectory: string
  tests: UnrealTest[]
}
