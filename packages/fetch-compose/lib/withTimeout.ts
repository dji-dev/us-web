// @ts-ignore
import { AbortController as FakeAbortController } from 'abortcontroller-polyfill/src/abortcontroller'

import { Fetch } from './types'

const abortSelf = typeof global !== 'undefined' ? global : window

// eslint-disable-next-line no-restricted-globals
export const AbortController: typeof window.AbortController =
    abortSelf.AbortController || FakeAbortController

export interface TimeoutOptions {
    timeout: number
}

const DEFAULT_TIMEOUT = 10000

export class FakeAbortError extends Error {
    constructor() {
        super('Request stopped.')
        this.name = 'FakeAbortError'
    }
}

/**
 * Based on this:
 * https://stackoverflow.com/questions/46946380/fetch-api-request-timeout/57888548#57888548
 *
 * Will cancel request after timeout, with a default timeout of 10s.
 *
 * Allows an optional field named 'timeout'.
 */
export default function withTimeout<T extends RequestInit>(
    fetch: Fetch<T>,
    defaultTimeout: number = DEFAULT_TIMEOUT
): Fetch<T & TimeoutOptions> {
    return (req, opts = {}) => {
        const timeoutValue = opts.timeout ?? defaultTimeout

        const controller = new AbortController()
        const promise = fetch(req, { ...opts, signal: controller.signal })

        // Make sure to listen to original AbortController if exists.
        if (opts.signal) {
            opts.signal.addEventListener('abort', () => controller.abort())
        }

        // Set a timeout.
        const timeout = setTimeout(() => controller.abort(), timeoutValue)

        return promise
            .finally(() => clearTimeout(timeout))
            .catch((err) => {
                // fetry-retry treats AbortError a special case,
                // so if we timed-out, re-throw as a generic error.
                if (err.toString().includes('AbortError')) {
                    throw new FakeAbortError()
                }

                throw err
            })
    }
}
