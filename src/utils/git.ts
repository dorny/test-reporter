import * as core from '@actions/core'
import {getExecOutput} from '@actions/exec'

export async function listFiles(): Promise<string[]> {
  return []
}

function fixStdOutNullTermination(): void {
  // Previous command uses NULL as delimiters and output is printed to stdout.
  // We have to make sure next thing written to stdout will start on new line.
  // Otherwise things like ::set-output wouldn't work.
  core.info('')
}
