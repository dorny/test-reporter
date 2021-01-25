import {TestRunResult} from '../report/test-results'

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

export type ParseTestResult = (files: FileContent[], options: ParseOptions) => Promise<TestResult>

export type FileContent = {path: string; content: string}

export interface ParseOptions {
  annotations: boolean
  workDir: string
  trackedFiles: string[]
}

export interface TestResult {
  testRuns: TestRunResult[]
  annotations: Annotation[]
}
