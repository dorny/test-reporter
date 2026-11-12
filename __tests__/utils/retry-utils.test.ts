import {jest} from '@jest/globals'
import {retryOnNotFound} from '../../src/utils/retry-utils.js'

const httpError = (status: number): Error => Object.assign(new Error(`HTTP ${status}`), {status})
const noWait = async (): Promise<void> => {}

describe('retryOnNotFound', () => {
  it('returns the result without retrying when the call succeeds', async () => {
    const fn = jest.fn(async () => 'ok')
    await expect(retryOnNotFound(fn, [1, 2], noWait)).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('retries a 404 until the call succeeds', async () => {
    const fn = jest
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(httpError(404))
      .mockRejectedValueOnce(httpError(404))
      .mockResolvedValue('ok')
    const wait = jest.fn(noWait)
    await expect(retryOnNotFound(fn, [10, 20, 30], wait)).resolves.toBe('ok')
    expect(fn).toHaveBeenCalledTimes(3)
    expect(wait.mock.calls).toEqual([[10], [20]])
  })

  it('rethrows the 404 once the delays are used up', async () => {
    const fn = jest.fn<() => Promise<string>>().mockRejectedValue(httpError(404))
    await expect(retryOnNotFound(fn, [1, 2], noWait)).rejects.toMatchObject({status: 404})
    expect(fn).toHaveBeenCalledTimes(3)
  })

  it('does not retry other errors', async () => {
    const fn = jest.fn<() => Promise<string>>().mockRejectedValue(httpError(422))
    await expect(retryOnNotFound(fn, [1, 2], noWait)).rejects.toMatchObject({status: 422})
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
