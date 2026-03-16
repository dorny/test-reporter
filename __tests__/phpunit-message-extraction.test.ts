import * as fs from 'fs'
import * as path from 'path'

import {PhpunitJunitParser} from '../src/parsers/phpunit-junit/phpunit-junit-parser.js'
import {ParseOptions} from '../src/test-parser.js'
import {normalizeFilePath} from '../src/utils/path-utils.js'

import {fileURLToPath} from 'url'
import {dirname} from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('phpunit-junit parser - message extraction', () => {
  it('extracts message from first line of error details when message attribute is not present', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'phpunit', 'phpunit-no-message-attr.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the failed test
    const suite = result.suites.find(s => s.name === 'DOMCasterTest')
    expect(suite).toBeDefined()

    const tests = suite!.groups.flatMap(g => g.tests)
    const failedTest = tests.find(t => t.name === 'testCastModernDocumentType')
    expect(failedTest).toBeDefined()
    expect(failedTest!.result).toBe('failed')
    expect(failedTest!.error).toBeDefined()

    // Verify that the message is extracted from the first line of error details
    expect(failedTest!.error!.message).toBe(
      'TypeError: Cannot assign DOMNodeList to property Dom\\Node::$childNodes of type Dom\\NodeList'
    )

    // Verify that full details are still captured
    expect(failedTest!.error!.details).toContain('TypeError: Cannot assign DOMNodeList to property Dom\\Node::$childNodes of type Dom\\NodeList')
    expect(failedTest!.error!.details).toContain('/home/runner/work/php-latest-builds/php-latest-builds/src/Symfony/Component/VarDumper/Caster/DOMCaster.php:190')
  })

  it('prefers message attribute when present', async () => {
    const fixturePath = path.join(__dirname, 'fixtures', 'external', 'phpunit', 'junit-basic.xml')
    const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
    const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse(filePath, fileContent)

    // Find the failed test that has a message attribute
    const authSuite = result.suites.find(s => s.name === 'Tests.Authentication')
    expect(authSuite).toBeDefined()

    const tests = authSuite!.groups.flatMap(g => g.tests)
    const failedTest = tests.find(t => t.name === 'testCase9')
    expect(failedTest).toBeDefined()
    expect(failedTest!.result).toBe('failed')
    expect(failedTest!.error).toBeDefined()

    // When message attribute is present, use it (with type prepended)
    expect(failedTest!.error!.message).toBe('AssertionError: Assertion error message')
  })

  it('uses type as message when neither message attribute nor details are available', async () => {
    // Create a minimal XML with only type attribute
    const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="TestSuite" tests="1" errors="1" time="0.001">
    <testcase name="testError" time="0.001">
      <error type="RuntimeException"/>
    </testcase>
  </testsuite>
</testsuites>`

    const opts: ParseOptions = {
      parseErrors: true,
      trackedFiles: []
    }

    const parser = new PhpunitJunitParser(opts)
    const result = await parser.parse('test.xml', xmlContent)

    const suite = result.suites.find(s => s.name === 'TestSuite')
    expect(suite).toBeDefined()

    const tests = suite!.groups.flatMap(g => g.tests)
    const failedTest = tests.find(t => t.name === 'testError')
    expect(failedTest).toBeDefined()
    expect(failedTest!.result).toBe('failed')
    expect(failedTest!.error).toBeDefined()

    // When only type is available, use it as message
    expect(failedTest!.error!.message).toBe('RuntimeException')
  })
})
