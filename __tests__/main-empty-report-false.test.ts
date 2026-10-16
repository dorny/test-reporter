import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

// Runs the action entry point against a 0-byte report (issue #620).
describe('empty report file (fail-on-empty=false)', () => {
  it('skips the file instead of crashing the parser', async () => {
    const emptyFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'tr-empty-')), 'empty.xml')
    fs.writeFileSync(emptyFile, '')
    const inputs: {[k: string]: string} = {
      name: 'Empty',
      path: emptyFile,
      reporter: 'java-junit',
      'list-suites': 'all',
      'list-tests': 'all',
      'list-files': 'none',
      'max-annotations': '0',
      'fail-on-error': 'false',
      'fail-on-empty': 'false',
      'only-summary': 'false',
      'use-actions-summary': 'true',
      collapsed: 'auto',
      token: 'x'
    }
    for (const [k, v] of Object.entries(inputs)) process.env[`INPUT_${k.toUpperCase().replace(/ /g, '_')}`] = v
    process.env.GITHUB_SHA = 'abc'
    process.env.GITHUB_RUN_ID = '1'
    process.env.GITHUB_REPOSITORY = 'o/r'
    const out: string[] = []
    const realWrite = process.stdout.write.bind(process.stdout)
    process.stdout.write = ((chunk: string | Uint8Array) => {
      out.push(String(chunk))
      return true
    }) as typeof process.stdout.write
    await import('../src/main.js')
    await new Promise(r => setTimeout(r, 500))
    process.stdout.write = realWrite
    process.exitCode = undefined
    const errors = out.filter(l => l.startsWith('::error::')).map(l => l.trim())
    expect(errors).toEqual([])
  })
})
