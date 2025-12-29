export interface PhpunitReport {
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
    name: string
    tests?: string
    assertions?: string
    errors?: string
    failures?: string
    skipped?: string
    time: string
    file?: string
  }
  testcase?: TestCase[]
  testsuite?: TestSuite[]
}

export interface TestCase {
  $: {
    name: string
    class?: string
    classname?: string
    file?: string
    line?: string
    assertions?: string
    time: string
  }
  failure?: Failure[]
  error?: Failure[]
  skipped?: string[]
}

export interface Failure {
  _: string
  $?: {
    type?: string
    message?: string
  }
}
