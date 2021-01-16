export function normalizeDirPath(path: string, addTrailingSlash: boolean): string {
  if (!path) {
    return path
  }

  path = normalizeFilePath(path)
  if (addTrailingSlash && !path.endsWith('/')) {
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
