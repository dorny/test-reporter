export interface ReportInput {
  artifactFilePaths: string[],
  versionArtifactPath?: string,
  reports : {
    [reportName: string]: FileContent[]
  }
}

export interface FileContent {
  file: string
  content: string
}

export interface InputProvider {
  load(): Promise<ReportInput>
  listTrackedFiles(): Promise<string[]>
}
