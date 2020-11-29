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

export function normalizeDirPath(path: string, trailingSeparator: boolean): string {
  if (!path) {
    return path
  }

  path = normalizeFilePath(path)
  if (trailingSeparator && !path.endsWith('/')) {
    path += '/'
  }
  return path
}

export function normalizeFilePath(path: string): string {
  if (!path) {
    return path
  }

  return path.trim().replace(/\\/g, '/')
}
