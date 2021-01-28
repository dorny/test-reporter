import * as core from '@actions/core'
import * as github from '@actions/github'
import * as fs from 'fs'
import glob from 'fast-glob'
import {parseDartJson} from './parsers/dart-json/dart-json-parser'
import {parseDotnetTrx} from './parsers/dotnet-trx/dotnet-trx-parser'
import {parseJestJunit} from './parsers/jest-junit/jest-junit-parser'
import {getReport} from './report/get-report'
import {FileContent, ParseOptions, ParseTestResult} from './parsers/parser-types'
import {normalizeDirPath} from './utils/file-utils'
import {listFiles} from './utils/git'
import {enforceCheckRunLimits, getCheckRunSha} from './utils/github-utils'
import {Icon} from './utils/markdown-utils'

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
  const listSuites = core.getInput('list-suites', {required: true})
  const listTests = core.getInput('list-tests', {required: true})
  const maxAnnotations = parseInt(core.getInput('max-annotations', {required: true}))
  const failOnError = core.getInput('fail-on-error', {required: true}) === 'true'
  const workDirInput = core.getInput('working-directory', {required: false})
  const token = core.getInput('token', {required: true})

  if (listSuites !== 'all' && listSuites !== 'failed') {
    core.setFailed(`Input parameter 'list-suites' has invalid value`)
    return
  }

  if (listTests !== 'all' && listTests !== 'failed' && listTests !== 'none') {
    core.setFailed(`Input parameter 'list-tests' has invalid value`)
    return
  }

  if (isNaN(maxAnnotations) || maxAnnotations < 0 || maxAnnotations > 50) {
    core.setFailed(`Input parameter 'max-annotations' has invalid value`)
    return
  }

  if (workDirInput) {
    core.info(`Changing directory to ${workDirInput}`)
    process.chdir(workDirInput)
  }

  const workDir = normalizeDirPath(process.cwd(), true)
  const octokit = github.getOctokit(token)
  const sha = getCheckRunSha()

  // We won't need tracked files if we are not going to create annotations
  const annotations = maxAnnotations > 0
  const trackedFiles = annotations ? await listFiles() : []

  const opts: ParseOptions = {
    trackedFiles,
    workDir,
    annotations
  }

  const parser = getParser(reporter)
  const files = await getFiles(path)

  if (files.length === 0) {
    core.setFailed(`No file matches path '${path}'`)
    return
  }

  core.info(`Using test report parser '${reporter}'`)
  const result = await parser(files, opts)

  enforceCheckRunLimits(result, maxAnnotations)
  const isFailed = result.testRuns.some(tr => tr.result === 'failed')
  const conclusion = isFailed ? 'failure' : 'success'
  const icon = isFailed ? Icon.fail : Icon.success

  core.info(`Creating check run '${name}' with conclusion '${conclusion}'`)
  await octokit.checks.create({
    head_sha: sha,
    name,
    conclusion,
    status: 'completed',
    output: {
      title: `${name} ${icon}`,
      summary: getReport(result.testRuns, {listSuites, listTests}),
      annotations: result.annotations
    },
    ...github.context.repo
  })

  core.setOutput('conclusion', conclusion)
  if (failOnError && isFailed) {
    core.setFailed(`Failed test has been found and 'fail-on-error' option is set to ${failOnError}`)
  }
}

function getParser(reporter: string): ParseTestResult {
  switch (reporter) {
    case 'dart-json':
      return parseDartJson
    case 'dotnet-trx':
      return parseDotnetTrx
    case 'flutter-machine':
      return parseDartJson
    case 'jest-junit':
      return parseJestJunit
    default:
      throw new Error(`Input variable 'reporter' is set to invalid value '${reporter}'`)
  }
}

export async function getFiles(pattern: string): Promise<FileContent[]> {
  const paths = (await Promise.all(pattern.split(',').map(async pat => glob(pat, {dot: true})))).flat()

  const files = Promise.all(
    paths.map(async path => {
      core.info(`Reading test report '${path}'`)
      const content = await fs.promises.readFile(path, {encoding: 'utf8'})
      return {path, content}
    })
  )

  return files
}

run()
