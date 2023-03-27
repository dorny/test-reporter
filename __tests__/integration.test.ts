import fs from 'fs'
import {LocalFileProvider} from '../src/input-providers/local-file-provider'

const input: Record<string, string> = {
  name: 'Test Results',
  path: 'test-report.xml',
  reporter: 'pytest-junit',
  'path-replace-backslashes': 'false',
  'list-suites': 'all',
  'list-tests': 'all',
  'max-annotations': '10',
  'fail-on-error': 'true',
  'only-summary': 'false',
  token: '***'
}

const update = jest.fn().mockReturnValue({data: {}, status: 0})

jest.mock('@actions/core', () => ({
  getInput: jest.fn().mockImplementation((name: string) => input[name]),
  setFailed: jest.fn(),
  setOutput: jest.fn(),
  startGroup: jest.fn(),
  endGroup: jest.fn(),
  info: jest.fn(),
  warning: jest.fn()
}))
jest.mock('@actions/github', () => {
  return {
    getOctokit: jest.fn().mockReturnValue({
      rest: {
        checks: {
          update,
          create: jest.fn().mockReturnValue({data: {}})
        }
      }
    }),
    context: {
      eventName: '',
      payload: {}
    }
  }
})

jest.mock('../src/input-providers/local-file-provider')

describe('integration test', () => {
  it('pytest', async () => {
    jest.spyOn(LocalFileProvider.prototype, 'load').mockResolvedValue({
      'report-tb-short.xml': [
        {
          file: 'report-tb-short.xml',
          content: fs.readFileSync(__dirname + '/fixtures/external/pytest/report-tb-short.xml', {encoding: 'utf8'})
        }
      ]
    })
    jest
      .spyOn(LocalFileProvider.prototype, 'listTrackedFiles')
      .mockResolvedValue(['addons/product_changes/tests/first_test.py'])

    await import('../src/main')
    // trick to wait for the pending "main" Promise
    await new Promise(resolve => setTimeout(resolve))

    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(
      expect.objectContaining({
        output: expect.objectContaining({
          annotations: [
            expect.objectContaining({
              path: 'addons/product_changes/tests/first_test.py'
            })
          ]
        })
      })
    )
  })
})
