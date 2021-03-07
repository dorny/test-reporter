export interface JunitReport {
  testsuites: TestSuites
}

export interface TestSuites {
  $: {
    name: string
    tests: string
    failures: string // assertion failed
    errors: string // unhandled exception during test execution
    time: string
  }
  testsuite?: TestSuite[]
}

export interface TestSuite {
  $: {
    name: string
    tests: string
    errors: string
    failures: string
    skipped: string
    time: string
    timestamp?: Date
  }
  testcase: TestCase[]
}

export interface TestCase {
  $: {
    classname: string
    file?: string
    name: string
    time: string
  }
  failure?: string[]
  skipped?: string[]
}
