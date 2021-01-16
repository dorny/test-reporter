import core from '@actions/core'
import github from '@actions/github'
import fs from 'fs'
import glob from 'fast-glob'
import {parseDartJson} from './parsers/dart-json/dart-json-parser'
import {parseDotnetTrx} from './parsers/dotnet-trx/dotnet-trx-parser'
import {parseJestJunit} from './parsers/jest-junit/jest-junit-parser'
import {ParseOptions, ParseTestResult} from './parsers/parser-types'
import {normalizeDirPath} from './utils/file-utils'
import {listFiles} from './utils/git'
import {getCheckRunSha} from './utils/github-utils'

async function run(): Promise<void> {
  try {
    await main()
  } catch (error) {
    core.setFailed(error.message)
  }
}

async function main(): Promise<void> {
  const annotations = core.getInput('annotations', {required: true}) === 'true'
  const failOnError = core.getInput('fail-on-error', {required: true}) === 'true'
  const name = core.getInput('name', {required: true})
  const path = core.getInput('path', {required: true})
  const reporter = core.getInput('reporter', {required: true})
  const token = core.getInput('token', {required: true})
  const workDirInput = core.getInput('working-directory', {required: false})

  if (workDirInput) {
    core.info(`Changing directory to ${workDirInput}`)
    process.chdir(workDirInput)
  }

  const workDir = normalizeDirPath(process.cwd(), true)
  const octokit = github.getOctokit(token)
  const sha = getCheckRunSha()

  // We won't need tracked files if we are not going to create annotations
  const trackedFiles = annotations ? await listFiles() : []

  const opts: ParseOptions = {
    name,
    annotations,
    trackedFiles,
    workDir
  }

  const parser = getParser(reporter)
  const files = await getFiles(path)

  if (files.length === 0) {
    core.setFailed(`No file matches path ${path}`)
    return
  }

  const result = await parser(files[0].content, opts)
  const conclusion = result.success ? 'success' : 'failure'

  await octokit.checks.create({
    head_sha: sha,
    name,
    conclusion,
    status: 'completed',
    output: result.output,
    ...github.context.repo
  })

  core.setOutput('conclusion', conclusion)
  if (failOnError && !result.success) {
    core.setFailed(`Failed test has been found and 'fail-on-error' option is set to ${failOnError}.`)
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
      throw new Error(`Input parameter 'reporter' is set to invalid value '${reporter}'`)
  }
}

export async function getFiles(pattern: string): Promise<{path: string; content: string}[]> {
  const paths = await glob(pattern, {dot: true})
  return Promise.all(
    paths.map(async path => {
      const content = await fs.promises.readFile(path, {encoding: 'utf8'})
      return {path, content}
    })
  )
}

run()
