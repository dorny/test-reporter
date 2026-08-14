import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

import {LocalFileProvider} from '../../src/input-providers/local-file-provider.js'
import {normalizeFilePath} from '../../src/utils/path-utils.js'

describe('LocalFileProvider', () => {
  const originalCwd = process.cwd()
  let workspace: string

  beforeEach(() => {
    workspace = fs.mkdtempSync(path.join(os.tmpdir(), 'test-reporter-'))
    process.chdir(workspace)
  })

  afterEach(() => {
    process.chdir(originalCwd)
    fs.rmSync(workspace, {force: true, recursive: true})
  })

  function writeReport(filePath: string, content: string): void {
    fs.mkdirSync(path.dirname(filePath), {recursive: true})
    fs.writeFileSync(filePath, content)
  }

  it('ignores matching report paths', async () => {
    writeReport('test-report.junit.xml', 'root')
    writeReport('packages/api/test-report.junit.xml', 'package')
    writeReport('node_modules/root-package/test-report.junit.xml', 'root node_modules')
    writeReport('packages/api/node_modules/nested-package/test-report.junit.xml', 'nested node_modules')

    const provider = new LocalFileProvider('Tests', ['**/test-report.junit.xml'], ['**/node_modules/**'])
    const input = await provider.load()

    expect(input.Tests.map(({file}) => normalizeFilePath(file)).sort()).toEqual([
      'packages/api/test-report.junit.xml',
      'test-report.junit.xml'
    ])
    expect(input.Tests.map(({content}) => content).sort()).toEqual(['package', 'root'])
  })
})
