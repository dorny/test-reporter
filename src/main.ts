import * as core from '@actions/core'
import * as github from '@actions/github'
import {parseJestJunit} from './parsers/jest-junit/jest-junit-parser'
import {ParseTestResult} from './parsers/test-parser'
import {getFileContent} from './utils/file-utils'
import {getCheckRunSha} from './utils/github-utils'

async function run(): Promise<void> {
  try {
    await main()
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function main(): Promise<void> {
  const name = core.getInput('name', {required: true})
  const path = core.getInput('path', {required: true})
  const reporter = core.getInput('reporter', {required: true})
  const token = core.getInput('token', {required: true})

  const octokit = github.getOctokit(token)
  const sha = getCheckRunSha()

  const parser = getParser(reporter)
  const content = getFileContent(path)
  const result = await parser(content)

  await octokit.checks.create({
    head_sha: sha,
    name,
    status: 'completed',
    conclusion: result.success ? 'success' : 'failure',
    output: result.output,
    ...github.context.repo
  })
}

function getParser(reporter: string): ParseTestResult {
  switch (reporter) {
    case 'dotnet-trx':
      throw new Error('Not implemented yet!')
    case 'flutter-machine':
      throw new Error('Not implemented yet!')
    case 'jest-junit':
      return parseJestJunit
    default:
      throw new Error(`Input parameter 'reporter' is set to invalid value '${reporter}'`)
  }
}

run()
