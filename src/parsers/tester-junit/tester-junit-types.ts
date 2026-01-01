export interface NetteTesterReport {
  testsuites: TestSuites
}

export interface SingleSuiteReport {
  testsuite: TestSuite
}

export interface TestSuites {
  $?: {
    time?: string
  }
  testsuite?: TestSuite[]
}

export interface TestSuite {
  $: {
    // NOTE: name attribute is intentionally omitted - Nette Tester doesn't provide it
    tests: string
    errors: string
    failures?: string
    skipped: string
    time: string
    timestamp?: string
  }
  testcase?: TestCase[]
}

export interface TestCase {
  $: {
    classname: string // File path, possibly with method or description prefix
    name: string // Usually same as classname
    time: string
  }
  failure?: Failure[]
  error?: Failure[]
  skipped?: string[]
}

export interface Failure {
  _?: string
  $?: {
    type?: string
    message?: string
  }
}
