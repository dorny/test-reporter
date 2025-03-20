import * as core from '@actions/core'
import * as github from '@actions/github'
import {GitHub} from '@actions/github/lib/utils'

import {LocalFileProvider} from './input-providers/local-file-provider'
import {FileContent} from './input-providers/input-provider'
import {ParseOptions, TestParser} from './test-parser'
import {TestRunResult, TestRunResultWithUrl} from './test-results'
import {getAnnotations} from './report/get-annotations'
import {getReport} from './report/get-report'

import {DotnetTrxParser} from './parsers/dotnet-trx/dotnet-trx-parser'

import {normalizeDirPath, normalizeFilePath} from './utils/path-utils'
import {getCheckRunContext} from './utils/github-utils'
import {Icon} from './utils/markdown-utils'
import {IncomingWebhook} from '@slack/webhook'
import fs from 'fs'
import bent from 'bent'
import {cwd} from 'process'

async function main(): Promise<void> {
  try {
    const testReporter = new TestReporter()
    await testReporter.run()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error)
    else core.setFailed(JSON.stringify(error))
  }
}

class TestReporter {
  readonly artifact = core.getInput('artifact', {required: false})
  readonly name = core.getInput('name', {required: true})
  readonly path = core.getInput('path', {required: true})
  readonly pathReplaceBackslashes = core.getInput('path-replace-backslashes', {required: false}) === 'true'
  readonly reporter = core.getInput('reporter', {required: true})
  readonly listSuites = core.getInput('list-suites', {required: true}) as 'all' | 'failed'
  readonly listTests = core.getInput('list-tests', {required: true}) as 'all' | 'failed' | 'none'
  readonly maxAnnotations = parseInt(core.getInput('max-annotations', {required: true}))
  readonly failOnError = core.getInput('fail-on-error', {required: true}) === 'true'
  readonly failOnEmpty = core.getInput('fail-on-empty', {required: true}) === 'true'
  readonly workDirInput = core.getInput('working-directory', {required: false})
  readonly onlySummary = core.getInput('only-summary', {required: false}) === 'true'
  readonly token = core.getInput('token', {required: true})
  readonly slackWebhook = core.getInput('slack-url', {required: false})
  readonly githubEvent = core.getInput('github-event', {required: false})
  readonly resultsEndpoint = core.getInput('test-results-endpoint', {required: false})
  readonly resultsEndpointSecret = core.getInput('test-results-endpoint-secret', {required: false})
  readonly octokit: InstanceType<typeof GitHub>
  readonly context = getCheckRunContext()

  constructor() {
    this.octokit = github.getOctokit(this.token)

    if (this.listSuites !== 'all' && this.listSuites !== 'failed') {
      core.setFailed(`Input parameter 'list-suites' has invalid value`)
      return
    }

    if (this.listTests !== 'all' && this.listTests !== 'failed' && this.listTests !== 'none') {
      core.setFailed(`Input parameter 'list-tests' has invalid value`)
      return
    }

    if (isNaN(this.maxAnnotations) || this.maxAnnotations < 0 || this.maxAnnotations > 50) {
      core.setFailed(`Input parameter 'max-annotations' has invalid value`)
      return
    }
  }

  async run(): Promise<void> {
    if (this.workDirInput) {
      core.info(`Changing directory to '${this.workDirInput}'`)
      process.chdir(this.workDirInput)
    }

    core.info(`Check runs will be created with SHA=${this.context.sha}`)

    // Split path pattern by ',' and optionally convert all backslashes to forward slashes
    // fast-glob (micromatch) always interprets backslashes as escape characters instead of directory separators
    const pathsList = this.path.split(',')
    const pattern = this.pathReplaceBackslashes ? pathsList.map(normalizeFilePath) : pathsList

    const inputProvider = new LocalFileProvider(this.name, pattern)

    const parseErrors = this.maxAnnotations > 0
    const trackedFiles = parseErrors ? await inputProvider.listTrackedFiles() : []
    const workDir = this.artifact ? undefined : normalizeDirPath(process.cwd(), true)

    if (parseErrors) core.info(`Found ${trackedFiles.length} files tracked by GitHub`)

    const options: ParseOptions = {
      workDir,
      trackedFiles,
      parseErrors
    }

    core.info(`Using test report parser '${this.reporter}'`)
    const parser = this.getParser(this.reporter, options)

    const results: TestRunResultWithUrl[] = []
    const input = await inputProvider.load()

    if (this.resultsEndpoint?.length > 0) {
      try {
        const readStream = input.trxZip.toBuffer()
        const version = fs.existsSync('test/EVA.TestSuite.Core/bin/Release/version.txt')
          ? fs.readFileSync('test/EVA.TestSuite.Core/bin/Release/version.txt').toString()
          : null
        const commitID = fs.existsSync('test/EVA.TestSuite.Core/bin/Release/commit.txt')
          ? fs.readFileSync('test/EVA.TestSuite.Core/bin/Release/commit.txt').toString()
          : null

        core.info(
          `Using EVA version ${version}, commit ${commitID}, branch ${this.context.branch}, current directory: ${cwd()}`
        )

        const post = bent(this.resultsEndpoint, 'POST', {}, 200)
        await post(
          `TestResults?Secret=${this.resultsEndpointSecret}${version ? '&EVAVersion=' + version : ''}${
            commitID ? '&EVACommitID=' + commitID : ''
          }&EVABranch=${encodeURI(this.context.branch)}`,
          readStream
        )
        core.info(`Uploaded TRX files`)
      } catch (ex) {
        core.warning(`Could not upload TRX ZIP file: ${ex}`)
      }
    }

    for (const [reportName, files] of Object.entries(input.reports)) {
      try {
        core.startGroup(`Creating test report ${reportName}`)
        const tr = await this.createReport(parser, reportName, files)
        if (tr != null) {
          results.push(tr)
        }
      } finally {
        core.endGroup()
      }
    }

    const isFailed = results.some(tr => tr.results.some(r => r.isFailed))
    const conclusion = isFailed ? 'failure' : 'success'
    const passed = results.reduce((sum, tr) => sum + tr.passed, 0)
    const failed = results.reduce((sum, tr) => sum + tr.failed, 0)
    const skipped = results.reduce((sum, tr) => sum + tr.skipped, 0)
    const time = results.reduce((sum, tr) => sum + tr.time, 0)

    core.setOutput('conclusion', conclusion)
    core.setOutput('passed', passed)
    core.setOutput('failed', failed)
    core.setOutput('skipped', skipped)
    core.setOutput('time', time)

    if (results.some(r => r.shouldFail)) {
      core.setFailed(`Failed test were found and the results could not be written to github, so fail this step.`)

      let counter = 0
      core.startGroup('Failed tests')
      for (const r of results.filter(r => r.shouldFail)) {
        for (const rr of r.results) {
          for (const s of rr.failedSuites) {
            for (const g of s.failedGroups) {
              for (const t of g.failedTests) {
                if (++counter > 10) {
                  core.endGroup()
                  return
                }

                core.info(`${t.name}: ${t.error?.message}`)
              }
            }
          }
        }
      }

      core.endGroup()
      return
    }

    if (this.failOnError && isFailed) {
      core.setFailed(`Failed test were found and 'fail-on-error' option is set to ${this.failOnError}`)
      return
    }

    if (results.length === 0 && this.failOnEmpty) {
      core.setFailed(`No test report files were found`)
      return
    }
  }

  async createReport(parser: TestParser, name: string, files: FileContent[]): Promise<TestRunResultWithUrl | null> {
    if (files.length === 0) {
      core.warning(`No file matches path ${this.path}`)
    }

    core.info(`Processing test results for check run ${name}`)

    const results: TestRunResult[] = []
    const result: TestRunResultWithUrl = new TestRunResultWithUrl(results, null)

    for (const {file, content} of files) {
      try {
        core.info(`Processing test results from ${file}`)
        const tr = await parser.parse(file, content)
        results.push(tr)
      } catch (error) {
        core.error(`Processing test results from ${file} failed`)
        throw error
      }
    }

    core.info(`Creating check run ${name}`)
    try {
      const existingChecks = await this.octokit.rest.checks.listForRef({
        ref: this.context.sha,
        ...github.context.repo,
        check_name: name,
        status: 'queued'
      })

      const check =
        existingChecks?.data?.total_count > 0
          ? await this.octokit.rest.checks.get({
              check_run_id: existingChecks.data.check_runs[0].id,
              ...github.context.repo
            })
          : await this.octokit.rest.checks.create({
              head_sha: this.context.sha,
              name,
              status: 'in_progress',
              output: {
                title: name,
                summary: ''
              },
              ...github.context.repo
            })

      if (check.data.status === 'queued') {
        await this.octokit.rest.checks.update({
          check_run_id: check.data.id,
          status: 'in_progress',
          output: {
            title: name,
            summary: ''
          },
          ...github.context.repo
        })
      }

      if (files.length === 0) {
        await this.octokit.rest.checks.update({
          check_run_id: check.data.id,
          status: 'completed',
          output: {
            title: name,
            summary: 'No test result files found'
          },
          conclusion: 'failure',
          ...github.context.repo
        })
        return null
      }

      core.info('Creating report summary')
      const {listSuites, listTests, onlySummary} = this
      const baseUrl = check.data.html_url || ''
      const summary = getReport(results, {listSuites, listTests, baseUrl, onlySummary})

      core.info('Creating annotations')
      const annotations = getAnnotations(results, this.maxAnnotations)

      const isFailed = results.some(tr => tr.result === 'failed')
      const conclusion = isFailed ? 'failure' : 'success'
      const icon = isFailed ? Icon.fail : Icon.success

      core.info(`Updating check run conclusion (${conclusion}) and output`)
      const resp = await this.octokit.rest.checks.update({
        check_run_id: check.data.id,
        conclusion,
        status: 'completed',
        output: {
          title: `${name} ${icon}`,
          summary,
          annotations
        },
        ...github.context.repo
      })
      core.info(`Check run create response: ${resp.status}`)
      core.info(`Check run URL: ${resp.data.url}`)
      core.info(`Check run HTML: ${resp.data.html_url}`)
      core.setOutput('url', resp.data.url)
      core.setOutput('url_html', resp.data.html_url)
      core.info(`Check run details: ${resp.data.details_url}`)
      result.checkUrl = resp.data.html_url

      if (this.slackWebhook && this.context.branch === 'master') {
        const webhook = new IncomingWebhook(this.slackWebhook)
        const passed = results.reduce((sum, tr) => sum + tr.passed, 0)
        const skipped = results.reduce((sum, tr) => sum + tr.skipped, 0)
        const failed = results.reduce((sum, tr) => sum + tr.failed, 0)

        const req = {
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*${name}*`
              }
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `:large_green_circle: ${passed} :large_orange_circle: ${skipped} :red_circle: ${failed} <${resp.data.html_url}|(view)>`
              }
            }
          ]
        }

        results.map((tr, runIndex) => {
          if (tr.failed === 0) return
          let runName = tr.path.slice(0, tr.path.indexOf('/TestResults/'))
          runName = runName.startsWith('test/') ? runName.slice(5) : runName

          req.blocks.push({
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `:red_circle: ${tr.failed} in <${resp.data.html_url}#r${runIndex}|${runName}>`
            }
          })

          if (failed <= 10) {
            const failedTests: string[] = []
            tr.failedSuites.map(suite => {
              suite.failedGroups.map(group => {
                group.failedTests.map(test => {
                  failedTests.push(`- <${suite.link}|${test.name}>`)
                })
              })
            })

            req.blocks.push({
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: failedTests.join('\n')
              }
            })
          }
        })

        if (this.githubEvent === 'schedule' || failed > 0) {
          await webhook.send(req)
        }
      }
    } catch (error) {
      core.error(`Could not create check to store the results`)
    }

    return result
  }

  getParser(reporter: string, options: ParseOptions): TestParser {
    return new DotnetTrxParser(options)
  }
}

main()
