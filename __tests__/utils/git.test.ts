import {jest} from '@jest/globals'

const getInput = jest.fn<(name: string) => string>()
const getExecOutput = jest.fn<() => Promise<{stdout: string}>>()
const startGroup = jest.fn()
const endGroup = jest.fn()
const info = jest.fn()

jest.unstable_mockModule('@actions/core', () => ({getInput, startGroup, endGroup, info}))
jest.unstable_mockModule('@actions/exec', () => ({getExecOutput}))

const {listFiles} = await import('../../src/utils/git.js')

describe('tracked-file discovery logging', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it.each([
    ['', false],
    ['false', false],
    ['true', true]
  ])('uses silent-git=%s without changing captured files', async (input, silent) => {
    getInput.mockReturnValue(input)
    getExecOutput.mockResolvedValue({stdout: 'src/first.ts\u0000src/second.ts\u0000'})

    await expect(listFiles()).resolves.toEqual(['src/first.ts', 'src/second.ts'])

    expect(getInput).toHaveBeenCalledWith('silent-git')
    expect(getExecOutput).toHaveBeenCalledWith('git', ['ls-files', '-z'], {silent})
    expect(endGroup).toHaveBeenCalledTimes(1)
  })

  it('closes the log group when Git fails', async () => {
    getInput.mockReturnValue('true')
    getExecOutput.mockRejectedValue(new Error('Git failed'))

    await expect(listFiles()).rejects.toThrow('Git failed')

    expect(endGroup).toHaveBeenCalledTimes(1)
  })
})
