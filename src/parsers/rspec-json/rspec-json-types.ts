export interface RspecJson {
  version: number
  examples: RspecExample[]
  summary: RspecSummary
  summary_line: string
}

export interface RspecExample {
  id: string
  description: string
  full_description: string
  status: TestStatus
  file_path: string
  line_number: number
  run_time: number
  pending_message: string | null
  exception?: RspecException
}

type TestStatus = 'passed' | 'failed' | 'pending'

export interface RspecException {
  class: string
  message: string
  backtrace: string[]
}

export interface RspecSummary {
  duration: number
  example_count: number
  failure_count: number
  pending_count: number
  errors_outside_of_examples_count: number
}
