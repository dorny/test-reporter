import * as fs from 'fs'

export function getFileContent(path: string): string {
  if (!fs.existsSync(path)) {
    throw new Error(`File '${path}' not found`)
  }

  if (!fs.lstatSync(path).isFile()) {
    throw new Error(`'${path}' is not a file`)
  }

  return fs.readFileSync(path, {encoding: 'utf8'})
}
