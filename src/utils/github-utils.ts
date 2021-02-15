import {createWriteStream} from 'fs'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'
import {EventPayloads} from '@octokit/webhooks'
import * as stream from 'stream'
import {promisify} from 'util'
import got from 'got'
const asyncStream = promisify(stream.pipeline)

export function getCheckRunContext(): {sha: string; runId: number} {
  if (github.context.eventName === 'workflow_run') {
    const event = github.context.payload as EventPayloads.WebhookPayloadWorkflowRun
    if (!event.workflow_run) {
      throw new Error("Event of type 'workflow_run' is missing 'workflow_run' field")
    }
    return {
      sha: event.workflow_run.head_commit.id,
      runId: event.workflow_run.id
    }
  }

  const runId = github.context.runId
  if (github.context.eventName === 'pullrequest' && github.context.payload.pull_request) {
    const pr = github.context.payload.pull_request as EventPayloads.WebhookPayloadPullRequestPullRequest
    return {sha: pr.head.sha, runId}
  }

  return {sha: github.context.sha, runId}
}

export async function downloadArtifact(
  octokit: InstanceType<typeof GitHub>,
  artifactId: number,
  fileName: string
): Promise<void> {
  const resp = await octokit.actions.downloadArtifact({
    ...github.context.repo,
    artifact_id: artifactId,
    archive_format: 'zip'
  })

  const url = resp.headers.location

  if (url === undefined) {
    throw new Error('Location header was not found in API response')
  }

  const downloadStream = got.stream(url)
  const fileWriterStream = createWriteStream(fileName)

  downloadStream.on('downloadProgress', ({transferred, total, percent}) => {
    const percentage = Math.round(percent * 100)
    core.info(`progress: ${transferred}/${total} (${percentage}%)`)
  })

  core.startGroup(`Downloading ${fileName} from ${url}`)
  try {
    await asyncStream(downloadStream, fileWriterStream)
  } finally {
    core.endGroup()
  }
}

export async function listFiles(octokit: InstanceType<typeof GitHub>, sha: string): Promise<string[]> {
  core.info('Fetching list of tracked files from GitHub')
  const commit = await octokit.git.getCommit({
    commit_sha: sha,
    ...github.context.repo
  })
  return await listGitTree(octokit, commit.data.tree.sha, '')
}

async function listGitTree(octokit: InstanceType<typeof GitHub>, sha: string, path: string): Promise<string[]> {
  const tree = await octokit.git.getTree({
    tree_sha: sha,
    ...github.context.repo
  })

  const result: string[] = []
  for (const tr of tree.data.tree) {
    const file = `${path}${tr.path}`
    if (tr.type === 'tree') {
      const files = await listGitTree(octokit, tr.sha, `${file}/`)
      result.push(...files)
    } else {
      result.push(file)
    }
  }

  return result
}
