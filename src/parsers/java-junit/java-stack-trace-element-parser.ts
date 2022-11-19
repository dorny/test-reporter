export interface StackTraceElement {
  tracePath: string
  fileName: string
  lineStr: string
}

// simple format:
// at <FULLY_QUALIFIED_METHOD_NAME>(<FILE_NAME>:<LINE_NUMBER>)
const re = /^\s*at (.*)\((.*):(\d+)\)$/

export function parseStackTraceElement(stackTraceLine: string): StackTraceElement | undefined {
  const match = stackTraceLine.match(re)
  if (match !== null) {
    const [_, tracePath, fileName, lineStr] = match
    return {
      tracePath,
      fileName,
      lineStr
    }
  }
  return undefined
}
