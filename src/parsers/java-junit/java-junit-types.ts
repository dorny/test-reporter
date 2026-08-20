export interface JunitReport {
  testsuites: TestSuites
}

export interface SingleSuiteReport {
  testsuite: TestSuite
}

export interface TestSuites {
  $: {
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
  testcase?: TestCase[]
  testsuite?: TestSuite[]
}

export interface TestCase {
  $: {
    classname: string
    file?: string
    name: string
    time: string
  }
  failure?: string | Failure[]
  error?: string | Failure[]
  skipped?: string[]
  properties?: Properties[]
  // Set while merging repeated attempts; never present in the parsed XML.
  retries?: number
  retainedFailure?: string | Failure[]
  lastRepetition?: string
}

export interface Properties {
  property?: {
    $: {
      name: string
      value: string
    }
  }[]
}

export interface Failure {
  _: string
  $: {
    type?: string
    message: string
  }
}
