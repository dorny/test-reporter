import Zip from 'adm-zip'

export interface ReportInput {
  trxZip: Zip
  reports: {
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
