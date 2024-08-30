import path from 'node:path';
import fs from 'node:fs';

import { ParseOptions } from '../src/test-parser';
import { normalizeFilePath } from '../src/utils/path-utils';
import { ApexJsonParser } from '../src/parsers/apex-json/apex-json-parsers';
import { getReport } from '../src/report/get-report';

describe('apex-json tests', () => {
    it('produces empty test run result when there are no test cases', async () => {
        const fixturePath = path.join(__dirname, 'fixtures', 'empty', 'apex-json.json')
        const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
        const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

        const opts: ParseOptions = {
          parseErrors: true,
          trackedFiles: []
        }

        const parser = new ApexJsonParser(opts)
        const result = await parser.parse(filePath, fileContent)
        expect(result.tests).toBe(0)
        expect(result.result).toBe('success')
    });

    it('matches report snapshot', async () => {
        const opts: ParseOptions = {
          parseErrors: true,
          trackedFiles: []
        }

        const fixturePath = path.join(__dirname, 'fixtures', 'apex-json.json')
        const outputPath = path.join(__dirname, '__outputs__', 'apex-json.md')
        const filePath = normalizeFilePath(path.relative(__dirname, fixturePath))
        const fileContent = fs.readFileSync(fixturePath, {encoding: 'utf8'})

        const parser = new ApexJsonParser(opts)
        const result = await parser.parse(filePath, fileContent)
        expect(result).toMatchSnapshot()

        const report = getReport([result])
        fs.mkdirSync(path.dirname(outputPath), {recursive: true})
        fs.writeFileSync(outputPath, report)
      })
});
