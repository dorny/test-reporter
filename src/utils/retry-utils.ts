import * as core from '@actions/core'

const sleep = async (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Retries `fn` while it fails with HTTP 404, waiting `delays[i]` ms before retry i+1.
 * Only meant for calls on a resource this run just created, where a 404 means GitHub has not caught up yet (#866).
 * Any other error, or a 404 after the last delay, is rethrown.
 */
export async function retryOnNotFound<T>(
  fn: () => Promise<T>,
  delays: number[] = [1000, 2000, 4000, 8000],
  wait: (ms: number) => Promise<void> = sleep
): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn()
    } catch (error) {
      if ((error as {status?: number}).status !== 404 || attempt >= delays.length) {
        throw error
      }
      core.info(`Got 404, retrying in ${delays[attempt] / 1000}s (attempt ${attempt + 1} of ${delays.length})`)
      await wait(delays[attempt])
    }
  }
}
