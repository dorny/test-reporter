import {Endpoints} from '@octokit/types'

type OutputParameters = Endpoints['POST /repos/:owner/:repo/check-runs']['parameters']['output']

export type ParseTestResult = (content: string) => Promise<TestResult>

export interface TestResult {
  success: boolean
  output: OutputParameters
}
