export interface NunitReport {
  'test-run': TestRun
}

export interface TestRun {
  $: {
    id: string
    runstate: string
    testcasecount: string
    result: string
    total: string
    passed: string
    failed: string
    inconclusive: string
    skipped: string
    asserts: string
    'engine-version': string
    'clr-version': string
    'start-time': string
    'end-time': string
    duration: string
  }
  'test-suite'?: TestSuite[]
}

export interface TestSuite {
  $: {
    name: string
    type: string
  }
  'test-case'?: TestCase[]
  'test-suite'?: TestSuite[]
}

export interface TestCase {
  $: {
    id: string
    name: string
    fullname: string
    methodname: string
    classname: string
    runstate: string
    seed: string
    result: string
    label: string
    'start-time': string
    'end-time': string
    duration: string
    asserts: string
  }
  failure?: TestFailure[]
}

export interface TestFailure {
  message?: string[]
  'stack-trace'?: string[]
}
