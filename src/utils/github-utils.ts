import * as github from '@actions/github'
import {EventPayloads} from '@octokit/webhooks'

export function getCheckRunSha(): string {
  if (github.context.payload.pull_request) {
    const pr = github.context.payload.pull_request as EventPayloads.WebhookPayloadPullRequestPullRequest
    return pr.head.sha
  }

  return github.context.sha
}
