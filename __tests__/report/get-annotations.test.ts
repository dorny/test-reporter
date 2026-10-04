import {getAnnotations} from '../../src/report/get-annotations.js'
import {TestCaseResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../../src/test-results.js'

const sharedError = {
  path: 'ui-test/org/jedit/ui/test/UITest.groovy',
  line: 39,
  message: 'condition did not pass',
  details: 'geb.waiting.WaitTimeoutException: condition did not pass'
}

function createFailedTestRun(reportPath: string, testName: string): TestRunResult {
  const test = new TestCaseResult(testName, 'failed', 0, sharedError)
  const group = new TestGroupResult('org.jedit.ui.test.UITest', [test])
  const suite = new TestSuiteResult('UITest', [group])
  return new TestRunResult(reportPath, [suite])
}

describe('getAnnotations', () => {
  it('creates separate annotations for different parameterized tests with identical errors', () => {
    const results = [
      createFailedTestRun('first-report.xml', 'foo [i: 1, #0]'),
      createFailedTestRun('second-report.xml', 'foo [i: 2, #1]')
    ]

    const annotations = getAnnotations(results, 10)

    expect(annotations).toHaveLength(2)
    expect(annotations.map(annotation => annotation.title)).toEqual([
      'UITest ► org.jedit.ui.test.UITest ► foo [i: 1, #0]',
      'UITest ► org.jedit.ui.test.UITest ► foo [i: 2, #1]'
    ])
  })

  it('merges duplicate annotations for the same test from different reports', () => {
    const results = [
      createFailedTestRun('first-report.xml', 'foo [i: 1, #0]'),
      createFailedTestRun('second-report.xml', 'foo [i: 1, #0]')
    ]

    const annotations = getAnnotations(results, 10)

    expect(annotations).toHaveLength(1)
    expect(annotations[0].message).toContain('first-report.xml\n  second-report.xml')
  })
})
