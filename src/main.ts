import * as core from '@actions/core'
import * as github from '@actions/github'
import * as fs from 'fs'
import glob from 'fast-glob'

import {ParseOptions, TestParser} from './test-parser'
import {TestRunResult} from './test-results'
import {getAnnotations} from './report/get-annotations'
import {getReport} from './report/get-report'

import {DartJsonParser} from './parsers/dart-json/dart-json-parser'
import {DotnetTrxParser} from './parsers/dotnet-trx/dotnet-trx-parser'
import {JestJunitParser} from './parsers/jest-junit/jest-junit-parser'

import {normalizeDirPath} from './utils/file-utils'
import {listFiles} from './utils/git'
import {getCheckRunSha} from './utils/github-utils'
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
  const parseErrors = maxAnnotations > 0
  const trackedFiles = parseErrors ? await listFiles() : []

  const options: ParseOptions = {
    trackedFiles,
    workDir,
    parseErrors
  }

  core.info(`Using test report parser '${reporter}'`)
  const parser = getParser(reporter, options)

  const files = await getFiles(path)
  if (files.length === 0) {
    core.setFailed(`No file matches path '${path}'`)
    return
  }

  const results: TestRunResult[] = []
  for (const file of files) {
    core.info(`Processing test report ${file}`)
    const content = await fs.promises.readFile(file, {encoding: 'utf8'})
    const tr = await parser.parse(file, content)
    results.push(tr)
  }

  core.info('Creating report summary')
  const summary = getReport(results, {listSuites, listTests})

  core.info('Creating annotations')
  const annotations = getAnnotations(results, maxAnnotations)

  const isFailed = results.some(tr => tr.result === 'failed')
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
      summary,
      annotations
    },
    ...github.context.repo
  })

  const passed = results.reduce((sum, tr) => sum + tr.passed, 0)
  const failed = results.reduce((sum, tr) => sum + tr.failed, 0)
  const skipped = results.reduce((sum, tr) => sum + tr.skipped, 0)
  const time = results.reduce((sum, tr) => sum + tr.time, 0)

  core.setOutput('conclusion', conclusion)
  core.setOutput('passed', passed)
  core.setOutput('failed', failed)
  core.setOutput('skipped', skipped)
  core.setOutput('time', time)

  if (failOnError && isFailed) {
    core.setFailed(`Failed test has been found and 'fail-on-error' option is set to ${failOnError}`)
  }
}

function getParser(reporter: string, options: ParseOptions): TestParser {
  switch (reporter) {
    case 'dart-json':
      return new DartJsonParser(options)
    case 'dotnet-trx':
      return new DotnetTrxParser(options)
    case 'flutter-machine':
      return new DartJsonParser(options)
    case 'jest-junit':
      return new JestJunitParser(options)
    default:
      throw new Error(`Input variable 'reporter' is set to invalid value '${reporter}'`)
  }
}

export async function getFiles(pattern: string): Promise<string[]> {
  const tasks = pattern.split(',').map(async pat => glob(pat, {dot: true}))
  const paths = await Promise.all(tasks)
  return paths.flat()
}

run()
