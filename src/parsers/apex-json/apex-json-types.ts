export interface RootObject {
  result: Result
}

export interface Result {
  summary: SuiteSummary
  tests: Test[]
  coverage: SuiteCoverage
}

export interface SuiteCoverage {
  coverage?: Coverage[]
  records: ApexRecord[]
  summary: SuiteCoverageSummary
}

export interface SuiteCoverageSummary {
  totalLines: number
  coveredLines: number
  orgWideCoverage: string
  testRunCoverage: string
}

export interface ApexRecord {
  ApexTestClass: ApexTestClass
  Coverage: RecordCoverage
  TestMethodName: string
  NumLinesCovered: number
  ApexClassOrTrigger: ApexTestClass
  NumLinesUncovered: number
}

export interface RecordCoverage {
  coveredLines: number[]
  uncoveredLines: number[]
}

export interface ApexTestClass {
  Id: string
  Name: string
}

export interface Coverage {
  id: string
  name: string
  totalLines: number
  lines: Lines
  totalCovered: number
  coveredPercent: number
}

export type Lines = Record<number, number>

export interface Test {
  Id: string
  QueueItemId: string
  StackTrace: null
  Message: null
  AsyncApexJobId: string
  MethodName: string
  Outcome: string
  ApexClass: ApexClass
  RunTime: number
  FullName: string
}

export interface ApexClass {
  Id: string
  Name: string
  NamespacePrefix: string
}

export interface SuiteSummary {
  failRate: string
  failing: number
  hostname: string
  orgId: string
  outcome: string
  passRate: string
  passing: number
  skipped: number
  testRunId: string
  testStartTime: string
  testsRan: number
  userId: string
  username: string
  commandTime: string
  testExecutionTime: string
  testTotalTime: string
  orgWideCoverage: string
  testRunCoverage: string
}
