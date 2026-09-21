import * as fs from 'fs'
import glob from 'fast-glob'
import {FileContent, InputProvider, ReportInput} from './input-provider.js'
import {listFiles} from '../utils/git.js'
import {decodeReportBytes} from '../utils/text-decoder.js'

export class LocalFileProvider implements InputProvider {
  constructor(
    readonly name: string,
    readonly pattern: string[]
  ) {}

  async load(): Promise<ReportInput> {
    const result: FileContent[] = []
    for (const pat of this.pattern) {
      const paths = await glob(pat, {dot: true})
      for (const file of paths) {
        const bytes = await fs.promises.readFile(file)
        const content = decodeReportBytes(file, bytes)
        result.push({file, content})
      }
    }

    return {[this.name]: result}
  }

  async listTrackedFiles(): Promise<string[]> {
    return listFiles()
  }
}
