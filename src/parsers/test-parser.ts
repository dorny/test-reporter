import {Endpoints} from '@octokit/types'

export type OutputParameters = Endpoints['POST /repos/{owner}/{repo}/check-runs']['parameters']['output']
export type Annotation = {
  path: string
  start_line: number
  end_line: number
  start_column?: number
  end_column?: number
  annotation_level: 'notice' | 'warning' | 'failure'
  message: string
  title?: string
  raw_details?: string
}

export type ParseTestResult = (content: string, options: ParseOptions) => Promise<TestResult>

export interface ParseOptions {
  annotations: boolean
  workDir: string
  trackedFiles: string[]
}

export interface TestResult {
  success: boolean
  output: OutputParameters
}
