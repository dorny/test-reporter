import * as core from '@actions/core'

/**
 * Appends a report to the job summary, followed by a blank line.
 * With an `artifact` pattern, every matching artifact gets its own report in the same summary (#675).
 * The blank line closes the report's last block (a code block, or the `<details>` of a passed run),
 * so the next report's heading renders as a heading.
 */
export async function appendSummary(report: string): Promise<void> {
  await core.summary.addRaw(report, true).addEOL().write()
}
