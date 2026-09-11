/**
 * Represents a device that a test ran on
 */
export type UnrealDevice = {
  /** User facing device name
   * @example Cyberdyne-Systems-T2000 */
  deviceName: string
  /** Unique instance ID for the device
   * @example F35C7BB1284BDF8F6E09B880ABB1710E */
  instance: string
  /** Device system name
   * @example  Sarah-Personal-MacBook-2.local-68471 */
  instanceName: string
  /** MacEditor
   * @example  Sarah-Personal-MacBook-2.local-68471 */
  platform: string
  /** macOS 26.5.2 25F84
   * @example  Sarah-Personal-MacBook-2.local-68471 */
  oSVersion: string
  /** Device model string,
   * @example  Apple M3 Max */
  model: string
  /** Seems to be model again, possibly license
   * @example  Apple M3 Max */
  gPL: string
  /** CPU of the device or emulator
   * @example  QEMU TCG CPU version 2.5+, for docker image
   * @example Intel(R) Xeon(R) Platinum 8259CL CPU @ 2.50GHz */
  cPUModel: string
  /** Device RAM in GB
   * @example  127 */
  rAMInGB: number
  /** Usually the shader model
   * @example  SM6, - shader model 6 on Mac
   * @examp D3D11_SM5, direct 3d on win */
  renderMode: string
  /** Rendering hardware
   * @example DirectX 11, */
  rHI: string
  /** Log file for the device, usually empty
   * @example /var/log/test.log */
  appInstanceLog: string
}

/**
 * An event that occurred in a test run, can be a log output
 * or a test failure.
 */
export type UnrealTestEventTypeRecord = {
  /** The type of event */
  type: 'Warning' | 'Error' | 'Debug' | 'Log'
  /** What is displayed in the event,
   * @example "LogDialog: #### SetBarkLineTimer: 7.000000" */
  message: string
  /** The context for the event, why was it output
   * @example "log" */
  context: string
  /** Path or binary of an artifact, usually empty, or zeroes */
  artifact: string
}

/**
 * An event frame for an event that occurred in a test run. If
 * the event is a test failure or crash the file name, and
 * line may be populated. The timestamp is usually present.
 */
export type UnrealTestEvent = {
  /** Definition of the event */
  event: UnrealTestEventTypeRecord
  /** A file name, in the case of errors or test failures
   * Note that these file names seem arbitrary, and may not be where
   * the test actually failed. Usually empty for log events.
   */
  filename: string
  /** Line number of the test failure, again seems arbitrary.
   * @example -1 */
  lineNumber: number
  /** Timestamp of when the event was logged
   * @example "2026.08.06-11.49.53" */
  timestamp: string
}

/**
 * Record that defines each test result.
 */
export type UnrealTest = {
  /** The name of the individual unit - leaf name of the fullTestPath
   * @example "SpawnEnemy" */
  testDisplayName: string
  /** The "path" in the Unreal Automation test UX. Bears no fixed relation to filepath
   * @example "System.Mass.ArchetypeEntityCollection.Create.SpawnEnemy" */
  fullTestPath: string
  /**  Outcome of the test */
  state: 'Success' | 'Skipped' | 'Fail'
  /** Identifier/s of the device/s it ran on
    F35C7BB1284BDF8F6E09B880ABB1710E */
  deviceInstance: string[]
  /** Wall clock time for this test
   *  @example 0.0080692917108535767 */
  duration: number
  /** Date/time - the test finished
   * @example 2026.08.10-11.45.59 */
  dateTime: string
  /** Log entries, stack traces and so on. */
  entries: UnrealTestEvent[]
  /**  Count of the number of warnings */
  warnings: number
  /**  Count of the number of errors */
  errors: number
  /**  Meant to be paths to artifacts, usually empty */
  artifacts: []
}

/**
 * Top level object in the Unreal report
 */
export type UnrealReport = {
  /** Array of devices this test ran on */
  devices: UnrealDevice[]
  /**  Date of test '2026.08.10-11.46.00' */
  reportCreatedOn: string
  /**  50 succeeded - count of successes */
  succeeded: number
  /**  2 succeeded with warnings on std err */
  succeededWithWarnings: number
  /**  1 failed */
  failed: number
  /**  0 not run, AKA skipped */
  notRun: number
  /**  Count of number running at once? Not a PID AFAICT, often 0 */
  inProcess: number
  /**  float: @example 0.41858440637588501 */
  totalDuration: number
  /**  Unknown - internal use */
  comparisonExported: boolean
  /**  Unknown - internal use */
  comparisonExportDirectory: string
  /**  Array of all tests */
  tests: UnrealTest[]
}
