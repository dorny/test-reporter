export interface StackTraceElement {
  classLoader: string | undefined
  moduleNameAndVersion: string | undefined
  tracePath: string
  fileName: string
  lineStr: string
}

// classloader and module name are optional:
// at <CLASSLOADER>/<MODULE_NAME_AND_VERSION>/<FULLY_QUALIFIED_METHOD_NAME>(<FILE_NAME>:<LINE_NUMBER>)
// https://github.com/eclipse-openj9/openj9/issues/11452#issuecomment-754946992
const re = /^\s*at (\S+\/\S*\/)?(.*)\((.*):(\d+)\)$/

export function parseStackTraceElement(stackTraceLine: string): StackTraceElement | undefined {
  const match = stackTraceLine.match(re)
  if (match !== null) {
    const [_, maybeClassLoaderAndModuleNameAndVersion, tracePath, fileName, lineStr] = match
    const {classLoader, moduleNameAndVersion} = parseClassLoaderAndModule(maybeClassLoaderAndModuleNameAndVersion)
    return {
      classLoader,
      moduleNameAndVersion,
      tracePath,
      fileName,
      lineStr
    }
  }
  return undefined
}

function parseClassLoaderAndModule(maybeClassLoaderAndModuleNameAndVersion?: string): {
  classLoader?: string
  moduleNameAndVersion?: string
} {
  if (maybeClassLoaderAndModuleNameAndVersion) {
    const res = maybeClassLoaderAndModuleNameAndVersion.split('/')
    const classLoader = res[0]
    let moduleNameAndVersion: string | undefined = res[1]
    if (moduleNameAndVersion === '') {
      moduleNameAndVersion = undefined
    }
    return {classLoader, moduleNameAndVersion}
  }
  return {classLoader: undefined, moduleNameAndVersion: undefined}
}
