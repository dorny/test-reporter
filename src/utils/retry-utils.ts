import * as core from '@actions/core'
import {setTimeout as sleep} from 'node:timers/promises'

const retryDelaysMs = [1000, 2000, 4000, 8000]

/**
 * Retries `fn` while it fails with HTTP 404.
 * Only meant for calls on a resource this run just created, where a 404 means GitHub has not caught up yet (#866).
 * Any other error, or a 404 after the last delay, is rethrown.
 */
export async function retryOnNotFound<T>(
  fn: () => Promise<T>,
  wait: (delayMs: number) => Promise<void> = sleep
): Promise<T> {
  for (const [retry, delayMs] of retryDelaysMs.entries()) {
    try {
      return await fn()
    } catch (error) {
      if ((error as {status?: number}).status !== 404) {
        throw error
      }
      core.debug(
        `GitHub has not made the newly created check run available yet. Retrying the update in ${delayMs / 1000}s (retry ${retry + 1} of ${retryDelaysMs.length}).`
      )
      await wait(delayMs)
    }
  }

  return fn()
}
