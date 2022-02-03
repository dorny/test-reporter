export interface ReportInput {
  artifactFilePaths: string[]
  [reportName: string]: any[]
}

export interface FileContent {
  file: string
  content: string
}

export interface InputProvider {
  load(): Promise<ReportInput>
  listTrackedFiles(): Promise<string[]>
}
