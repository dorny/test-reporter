import {createWriteStream} from 'fs'
import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'
import type {PullRequest, WorkflowRunEvent} from '@octokit/webhooks-types'
import {IncomingMessage} from 'http'
import * as stream from 'stream'
import {promisify} from 'util'
import got, {Progress} from 'got'
const asyncStream = promisify(stream.pipeline)

type WorkflowRunPR = WorkflowRunEvent['workflow_run']['pull_requests'][number]

export function getCheckRunContext(): {sha: string; runId: number} {
  if (github.context.eventName === 'workflow_run') {
    core.info('Action was triggered by workflow_run: using SHA and RUN_ID from triggering workflow')
    const event = github.context.payload as WorkflowRunEvent
    if (!event.workflow_run) {
      throw new Error("Event of type 'workflow_run' is missing 'workflow_run' field")
    }
    const prs = (event.workflow_run.pull_requests ?? []) as WorkflowRunPR[]
    const prShaMatch = prs.find(pr => pr.head?.ref === event.workflow_run.head_branch)?.head?.sha
    const prShaFirst = prs[0]?.head?.sha
    const sha = prShaMatch ?? prShaFirst ?? event.workflow_run.head_sha
    if (!sha) {
      throw new Error('Unable to resolve SHA from workflow_run (no PR head.sha or head_sha)')
    }
    return {
      sha,
      runId: event.workflow_run.id
    }
  }

  const runId = github.context.runId
  if (github.context.payload.pull_request) {
    core.info(`Action was triggered by ${github.context.eventName}: using SHA from head of source branch`)
    const pr = github.context.payload.pull_request as PullRequest
    return {sha: pr.head.sha, runId}
  }

  return {sha: github.context.sha, runId}
}

export async function downloadArtifact(
  octokit: InstanceType<typeof GitHub>,
  artifactId: number,
  fileName: string,
  token: string
): Promise<void> {
  core.startGroup(`Downloading artifact ${fileName}`)
  try {
    core.info(`Artifact ID: ${artifactId}`)

    const req = octokit.rest.actions.downloadArtifact.endpoint({
      ...github.context.repo,
      artifact_id: artifactId,
      archive_format: 'zip'
    })

    const headers = {
      Authorization: `Bearer ${token}`
    }

    const downloadStream = got.stream(req.url, {headers})
    const fileWriterStream = createWriteStream(fileName)

    downloadStream.on('redirect', (response: IncomingMessage) => {
      core.info(`Downloading ${response.headers.location}`)
    })
    downloadStream.on('downloadProgress', (progress: Progress) => {
      core.info(`Progress: ${progress.transferred} B`)
    })

    await asyncStream(downloadStream, fileWriterStream)
  } finally {
    core.endGroup()
  }
}

export async function listFiles(octokit: InstanceType<typeof GitHub>, sha: string): Promise<string[]> {
  core.startGroup('Fetching list of tracked files from GitHub')
  try {
    const commit = await octokit.rest.git.getCommit({
      commit_sha: sha,
      ...github.context.repo
    })
    const files = await listGitTree(octokit, commit.data.tree.sha, '')
    return files
  } finally {
    core.endGroup()
  }
}

async function listGitTree(octokit: InstanceType<typeof GitHub>, sha: string, path: string): Promise<string[]> {
  const pathLog = path ? ` at ${path}` : ''
  core.info(`Fetching tree ${sha}${pathLog}`)
  let truncated = false
  let tree = await octokit.rest.git.getTree({
    recursive: 'true',
    tree_sha: sha,
    ...github.context.repo
  })

  if (tree.data.truncated) {
    truncated = true
    tree = await octokit.rest.git.getTree({
      tree_sha: sha,
      ...github.context.repo
    })
  }

  const result: string[] = []
  for (const tr of tree.data.tree) {
    const file = `${path}${tr.path}`
    if (tr.type === 'blob') {
      result.push(file)
    } else if (tr.type === 'tree' && truncated) {
      const files = await listGitTree(octokit, tr.sha as string, `${file}/`)
      result.push(...files)
    }
  }

  return result
}
