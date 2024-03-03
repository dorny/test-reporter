import * as fs from 'fs'
import * as path from 'path'

import {SwiftXunitParser} from '../src/parsers/swift-xunit/swift-xunit-parser'
import {ParseOptions} from '../src/test-parser'
import {getReport} from '../src/report/get-report'
import {normalizeFilePath} from '../src/utils/path-utils'

describe('swift-xunit tests', () => {
  it('report from swift test results matches snapshot', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'swift-xunit.xml')
    const outputPath = path.join(__dirname, '__outputs__', 'swift-xunit.md')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const trackedFiles = ['Package.swift', 'Sources/AcmeLib/AcmeLib.swift', 'Tests/AcmeLibTests/AcmeLibTests.swift']
    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles
    }

    const parser = new SwiftXunitParser(opts)
    const result = await parser.parse(filePath, fileContent)
    expect(result).toMatchSnapshot()

    const report = getReport([result])
    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})
