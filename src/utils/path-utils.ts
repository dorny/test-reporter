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

export function getBasePath(path: string, trackedFiles: string[]): string | undefined {
  if (trackedFiles.includes(path)) {
    return ''
  }

  for (const file of trackedFiles) {
    const pathParts = path.split('/')
    const originalLength = pathParts.length
    const fileParts = file.split('/')

    while (pathParts.length && pathParts.slice(-1)[0] === fileParts.slice(-1)[0]) {
      pathParts.pop()
      fileParts.pop()
    }

    // we found some matching path parts
    if (pathParts.length !== originalLength) {
      return pathParts.join('/')
    }
  }

  return undefined
}
