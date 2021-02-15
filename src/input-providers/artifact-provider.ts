import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'

import Zip from 'adm-zip'
import picomatch from 'picomatch'

import {FileContent, InputProvider, ReportInput} from './input-provider'
import {downloadArtifact, listFiles} from '../utils/github-utils'

export class ArtifactProvider implements InputProvider {
  private readonly artifactNameMatch: (name: string) => boolean
  private readonly fileNameMatch: (name: string) => boolean
  private readonly getReportName: (name: string) => string

  constructor(
    readonly octokit: InstanceType<typeof GitHub>,
    readonly artifact: string,
    readonly name: string,
    readonly pattern: string[],
    readonly sha: string,
    readonly runId: number,
    readonly token: string
  ) {
    if (this.artifact.startsWith('/')) {
      const endIndex = this.artifact.lastIndexOf('/')
      const rePattern = this.artifact.substring(1, endIndex)
      const reOpts = this.artifact.substring(endIndex + 1)
      const re = new RegExp(rePattern, reOpts)
      this.artifactNameMatch = (str: string) => re.test(str)
      this.getReportName = (str: string) => {
        const match = str.match(re)
        if (match === null) {
          throw new Error(`Artifact name '${str}' does not match regex ${this.artifact}`)
        }
        let reportName = this.name
        for (let i = 1; i < match.length; i++) {
          reportName = reportName.replace(new RegExp(`$${i}`, 'g'), match[i])
        }
        return reportName
      }
    } else {
      this.artifactNameMatch = (str: string) => str === this.artifact
      this.getReportName = () => this.name
    }

    this.fileNameMatch = picomatch(pattern)
  }

  async load(): Promise<ReportInput> {
    const result: ReportInput = {}

    const resp = await this.octokit.actions.listWorkflowRunArtifacts({
      ...github.context.repo,
      run_id: this.runId
    })

    if (resp.data.artifacts.length === 0) {
      core.warning(`No artifacts found in run ${this.runId}`)
      return {}
    }

    const artifacts = resp.data.artifacts.filter(a => this.artifactNameMatch(a.name))
    if (artifacts.length === 0) {
      core.warning(`No artifact matches ${this.artifact}`)
      return {}
    }

    for (const art of artifacts) {
      await downloadArtifact(this.octokit, art.id, art.name, this.token)
      const reportName = this.getReportName(art.name)
      const files: FileContent[] = []
      const zip = new Zip(art.name)
      for (const entry of zip.getEntries()) {
        const file = entry.name
        if (entry.isDirectory || !this.fileNameMatch(file)) continue
        const content = zip.readAsText(entry)
        files.push({file, content})
      }
      if (result[reportName]) {
        result[reportName].push(...files)
      } else {
        result[reportName] = files
      }
    }

    return result
  }

  async listTrackedFiles(): Promise<string[]> {
    return listFiles(this.octokit, this.sha)
  }
}
