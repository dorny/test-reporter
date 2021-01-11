export class TestRunResult {
  constructor(readonly suites: TestSuiteResult[], private totalTime?: number) {}

  get tests(): number {
    return this.suites.reduce((sum, g) => sum + g.tests, 0)
  }

  get passed(): number {
    return this.suites.reduce((sum, g) => sum + g.passed, 0)
  }
  get failed(): number {
    return this.suites.reduce((sum, g) => sum + g.failed, 0)
  }
  get skipped(): number {
    return this.suites.reduce((sum, g) => sum + g.skipped, 0)
  }

  get time(): number {
    return this.totalTime ?? this.suites.reduce((sum, g) => sum + g.time, 0)
  }

  get result(): TestExecutionResult {
    return this.suites.some(t => t.result === 'failed') ? 'failed' : 'success'
  }
}

export class TestSuiteResult {
  constructor(readonly name: string, readonly groups: TestGroupResult[], private totalTime?: number) {}

  get tests(): number {
    return this.groups.reduce((sum, g) => sum + g.tests.length, 0)
  }

  get passed(): number {
    return this.groups.reduce((sum, g) => sum + g.passed, 0)
  }
  get failed(): number {
    return this.groups.reduce((sum, g) => sum + g.failed, 0)
  }
  get skipped(): number {
    return this.groups.reduce((sum, g) => sum + g.skipped, 0)
  }
  get time(): number {
    return this.totalTime ?? this.groups.reduce((sum, g) => sum + g.time, 0)
  }

  get result(): TestExecutionResult {
    return this.groups.some(t => t.result === 'failed') ? 'failed' : 'success'
  }
}

export class TestGroupResult {
  constructor(readonly name: string | undefined | null, readonly tests: TestCaseResult[]) {}

  get passed(): number {
    return this.tests.reduce((sum, t) => (t.result === 'success' ? sum + 1 : sum), 0)
  }
  get failed(): number {
    return this.tests.reduce((sum, t) => (t.result === 'failed' ? sum + 1 : sum), 0)
  }
  get skipped(): number {
    return this.tests.reduce((sum, t) => (t.result === 'skipped' ? sum + 1 : sum), 0)
  }
  get time(): number {
    return this.tests.reduce((sum, t) => sum + t.time, 0)
  }

  get result(): TestExecutionResult {
    return this.tests.some(t => t.result === 'failed') ? 'failed' : 'success'
  }
}

export class TestCaseResult {
  constructor(readonly name: string, readonly result: TestExecutionResult, readonly time: number) {}
}

export type TestExecutionResult = 'success' | 'skipped' | 'failed' | undefined
