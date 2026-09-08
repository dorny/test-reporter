export interface TrxReport {
  TestRun: TestRun
}

export interface TestRun {
  Times: Times[]
  Results?: Results[]
  TestDefinitions?: TestDefinitions[]
  ResultSummary?: ResultSummary[]
}

export interface ResultSummary {
  $: {
    outcome: Outcome
  }
  RunInfos?: RunInfos[]
}

export interface RunInfos {
  RunInfo?: RunInfo[]
}

export interface RunInfo {
  $: {
    outcome: Outcome
  }
  Text?: string[]
}

export interface Times {
  $: {
    creation: string
    queuing: string
    start: string
    finish: string
  }
}

export interface TestDefinitions {
  UnitTest: UnitTest[]
}

export interface UnitTest {
  $: {
    id: string
  }
  TestMethod: TestMethod[]
}

export interface TestMethod {
  $: {
    className: string
    name: string
  }
}

export interface Results {
  UnitTestResult: UnitTestResult[]
}

export interface UnitTestResult {
  $: {
    testId: string
    testName: string
    duration?: string
    outcome: Outcome
  }
  Output: Output[]
}

export interface Output {
  ErrorInfo: ErrorInfo[]
}
export interface ErrorInfo {
  Message: string[]
  StackTrace: string[]
}

// VSTest writes any of its TestOutcome values here. Besides the three named
// below it can emit Timeout, Aborted, Error, NotRunnable, Inconclusive and
// others. An outcome without a mapping is treated as a failure, never as a pass.
export type Outcome = 'Passed' | 'NotExecuted' | 'Failed' | (string & {})
