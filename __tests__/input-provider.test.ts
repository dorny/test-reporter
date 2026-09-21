import * as path from 'path'
import {fileURLToPath} from 'url'

import {LocalFileProvider} from '../src/input-providers/local-file-provider.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('LocalFileProvider', () => {
  it('decodes a BOM-bearing report before returning file content', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'unreal-engine', 'unreal-test-report.json')
    const provider = new LocalFileProvider('reports', [fixturePath])

    const reports = await provider.load()
    const content = reports.reports[0].content

    expect(content.charCodeAt(0)).not.toBe(0xfeff)
    expect(JSON.parse(content).tests).toBeInstanceOf(Array)
  })
})
