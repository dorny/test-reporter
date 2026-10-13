import {getAnnotations} from '../../src/report/get-annotations.js'
import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../src/test-results.js'

function createTestResult(path: string, failed: number): TestRunResult {
  const tests: TestCaseResult[] = []
  for (let i = 0; i < failed; i++) {
    tests.push(
      new TestCaseResult(`failed-test-${i}`, 'failed', 100, {
        details: 'Test failed',
        message: 'Assertion error'
      })
    )
  }

  const group = new TestGroupResult('test-group', tests)
  const suite = new TestSuiteResult('test-suite', [group])
  return new TestRunResult(path, [suite])
}

describe('getAnnotations', () => {
  it('returns no annotations when maxCount is 0', () => {
    const results = [createTestResult('failing-file.spec.ts', 3)]
    expect(getAnnotations(results, 0)).toEqual([])
  })

  it('returns all errors when there are fewer than maxCount', () => {
    const results = [createTestResult('failing-file.spec.ts', 3)]
    expect(getAnnotations(results, 50)).toHaveLength(3)
  })

  it('limits annotations to exactly maxCount', () => {
    const results = [createTestResult('failing-file.spec.ts', 60)]
    expect(getAnnotations(results, 50)).toHaveLength(50)
  })

  it('limits annotations to maxCount when errors equal maxCount + 1', () => {
    const results = [createTestResult('failing-file.spec.ts', 51)]
    expect(getAnnotations(results, 50)).toHaveLength(50)
  })
})
