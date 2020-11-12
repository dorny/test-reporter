export interface JunitReport {
  testsuites: TestSuites
}

export interface TestSuites {
  $: {
    name: string
    tests: number
    failures: number // assertion failed
    errors: number // unhandled exception during test execution
    time: number
  }
  testsuite: TestSuite[]
}

export interface TestSuite {
  $: {
    name: string
    tests: number
    errors: number
    failures: number
    skipped: number
    time: number
    timestamp?: Date
  }
  testcase: TestCase[]
}

export interface TestCase {
  $: {
    classname: string
    file?: string
    name: string
    time: number
  }
  failure?: string[]
  skipped?: string[]
}
