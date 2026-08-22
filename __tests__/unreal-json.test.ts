import * as fs from 'fs'
import * as path from 'path'

import {normalizeFilePath} from '../src/utils/path-utils.js'

import {fileURLToPath} from 'url'
import {dirname} from 'path'

import {TestPathsMapElement, UnrealJsonParser} from '../src/parsers/unreal-engine/unreal-json-parser.js'
import {aReport} from '../src/parsers/unreal-engine/fakes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('TestPathsMapElement', () => {
  const twoSingleSuitesWithSingleGroups = aReport(['FirstSuite.SomeGroup', 'SecondSuite'])
  it('Handles single suite names with groups', async () => {
    const root = new TestPathsMapElement('root')
    for (const t of twoSingleSuitesWithSingleGroups.tests) {
      root.insertTest(t.fullTestPath.split(/\./), t)
    }
    {
      const el = root.childElements[0]
      const suiteName = el.findSuiteName()
      const f = el.findGroupNode()
      const groupNames = f?.groupNames() ?? []
      const groups = f?.groups() ?? []

      expect(groups.length).toBe(1)
      expect(groupNames).toStrictEqual([['SomeGroup']])
      expect(suiteName).toStrictEqual('FirstSuite')
      expect(f?.elementName).toStrictEqual('SomeGroup')
    }
    {
      const el = root.childElements[1]
      const suiteName = el.findSuiteName()
      const f = el.findGroupNode()
      const groupNames = f?.groupNames() ?? []
      const groups = f?.groups() ?? []

      expect(groups.length).toBe(0)
      expect(groupNames).toStrictEqual([])
      expect(suiteName).toStrictEqual('SecondSuite')
      expect(f?.elementName).toStrictEqual('SecondSuite')
    }
  })
})

describe('UnrealJsonParser', () => {
  it('A report from a path', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'unreal-engine', 'unreal-test-report.json')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const parser = new UnrealJsonParser()
    const result = await parser.parse(filePath, fileContent)
    expect(result.tests).toBe(0)
    expect(result.result).toBe('success')
  })
})
