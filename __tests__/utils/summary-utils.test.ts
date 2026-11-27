import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import {fileURLToPath} from 'url'

import {DotnetTrxParser} from '../../src/parsers/dotnet-trx/dotnet-trx-parser.js'
import {DEFAULT_OPTIONS, getReport} from '../../src/report/get-report.js'
import {appendSummary} from '../../src/utils/summary-utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const summaryFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'test-reporter-')), 'summary.md')
const originalSummaryEnv = process.env.GITHUB_STEP_SUMMARY

// Builds the report main.ts writes for one artifact with `use-actions-summary` on (the default).
async function getArtifactReport(fixture: string): Promise<string> {
  const content = fs.readFileSync(path.join(__dirname, '..', 'fixtures', fixture), {encoding: 'utf8'})
  const result = await new DotnetTrxParser({parseErrors: true, trackedFiles: []}).parse(fixture, content)
  const shortSummary = `${result.passed} passed, ${result.failed} failed and ${result.skipped} skipped `
  return getReport([result], {...DEFAULT_OPTIONS, name: fixture}, shortSummary)
}

describe('appendSummary', () => {
  beforeAll(() => {
    process.env.GITHUB_STEP_SUMMARY = summaryFile
  })

  beforeEach(() => {
    fs.writeFileSync(summaryFile, '')
  })

  afterAll(() => {
    if (originalSummaryEnv === undefined) delete process.env.GITHUB_STEP_SUMMARY
    else process.env.GITHUB_STEP_SUMMARY = originalSummaryEnv
  })

  it('writes each report followed by a blank line', async () => {
    await appendSummary('first')
    await appendSummary('second')
    expect(fs.readFileSync(summaryFile, 'utf8')).toBe(`first${os.EOL}${os.EOL}second${os.EOL}${os.EOL}`)
  })

  it.each([
    ['a failed run, which ends in a code block', 'dotnet-trx.trx', '```'],
    ['a passed run, which ends in </details>', 'dotnet-trx-run-warning.trx', '</details>']
  ])('starts the next report after a blank line when the previous one is %s', async (_, fixture, lastLine) => {
    const first = await getArtifactReport(fixture)
    const second = await getArtifactReport('dotnet-xunitv3.trx')
    const firstLines = first.split('\n')
    expect(firstLines.at(-1)).toBe(lastLine)

    await appendSummary(first)
    await appendSummary(second)

    const lines = fs.readFileSync(summaryFile, 'utf8').split(/\r?\n/)
    const end = firstLines.length
    expect(lines.slice(end - 1, end + 2)).toEqual([lastLine, '', '## 1 passed, 3 failed and 0 skipped '])
  })
})
