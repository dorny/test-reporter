import * as fs from 'fs'
import glob from 'fast-glob'
import {FileContent, InputProvider, ReportInput} from './input-provider'
import Zip from 'adm-zip'
import path from 'path'

export class LocalFileProvider implements InputProvider {
  constructor(
    readonly name: string,
    readonly pattern: string[]
  ) {}

  async load(): Promise<ReportInput> {
    const result: FileContent[] = []
    const zip = new Zip()
    for (const pat of this.pattern) {
      const paths = await glob(pat, {dot: true})
      for (const file of paths) {
        const dir = path.dirname(file)
        zip.addLocalFile(file, dir)
        const content = await fs.promises.readFile(file, {encoding: 'utf8'})
        result.push({file, content})
      }
    }

    return {
      trxZip: zip,
      reports: {
        [this.name]: result
      }
    }
  }

  async listTrackedFiles(): Promise<string[]> {
    return []
  }
}
