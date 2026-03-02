import * as github from '@actions/github'
import {getCheckRunContext} from '../src/utils/github-utils'

describe('GitHub workflow_run context resolution', () => {
  const originalContext = {
    eventName: github.context.eventName,
    payload: github.context.payload,
    runId: github.context.runId,
    sha: github.context.sha
  }

  afterEach(() => {
    github.context.eventName = originalContext.eventName
    github.context.payload = originalContext.payload
    github.context.runId = originalContext.runId
    github.context.sha = originalContext.sha
  })

  it('uses the head SHA from the PR matching workflow_run.head_branch when CI is triggered by a PR update', () => {
    github.context.eventName = 'workflow_run'
    github.context.payload = {
      workflow_run: {
        id: 9001,
        head_branch: 'feature/refactor-reporter',
        head_sha: 'merge-commit-sha-should-not-win',
        pull_requests: [
          {head: {ref: 'main', sha: 'sha-from-main-pr'}},
          {head: {ref: 'feature/refactor-reporter', sha: 'sha-from-updated-pr-head'}}
        ]
      }
    } as typeof github.context.payload

    expect(getCheckRunContext()).toEqual({
      sha: 'sha-from-updated-pr-head',
      runId: 9001
    })
  })

  it('falls back to the first associated PR head SHA when no PR branch matches (common with merge queue / detached branches)', () => {
    github.context.eventName = 'workflow_run'
    github.context.payload = {
      workflow_run: {
        id: 9002,
        head_branch: 'gh-readonly-queue/main/pr-742-123456',
        head_sha: 'merge-queue-commit-sha',
        pull_requests: [
          {head: {ref: 'feature/billing-fix', sha: 'sha-from-first-associated-pr'}},
          {head: {ref: 'feature/other-pr', sha: 'sha-from-second-associated-pr'}}
        ]
      }
    } as typeof github.context.payload

    expect(getCheckRunContext()).toEqual({
      sha: 'sha-from-first-associated-pr',
      runId: 9002
    })
  })

  it('uses workflow_run.head_sha when the run comes from a branch push with no related pull request', () => {
    github.context.eventName = 'workflow_run'
    github.context.payload = {
      workflow_run: {
        id: 9003,
        head_branch: 'main',
        head_sha: 'sha-from-push-on-main',
        pull_requests: []
      }
    } as typeof github.context.payload

    expect(getCheckRunContext()).toEqual({
      sha: 'sha-from-push-on-main',
      runId: 9003
    })
  })

  it('throws a clear error when webhook payload has neither PR head SHA nor workflow_run.head_sha', () => {
    github.context.eventName = 'workflow_run'
    github.context.payload = {
      workflow_run: {
        id: 9004,
        head_branch: 'feature/missing-sha',
        pull_requests: [{head: {ref: 'feature/missing-sha'}}]
      }
    } as typeof github.context.payload

    expect(() => getCheckRunContext()).toThrow('Unable to resolve SHA from workflow_run (no PR head.sha or head_sha)')
  })
})
