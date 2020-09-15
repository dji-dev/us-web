/* eslint-disable no-shadow */
import fetch from 'cross-fetch'
import withRetry from '@zeit/fetch-retry'
import isPlainObject from 'is-plain-object'

type Fetch<T extends RequestInit> = (req: RequestInfo, opts?: Partial<T>) => Promise<Response>

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
 * Based on this gist:
 * https://gist.github.com/davej/728b20518632d97eef1e5a13bf0d05c7#gistcomment-3232643
 */
export function withTimeout<T extends RequestInit>(fetch: Fetch<T>): Fetch<T & TimeoutOptions> {
    return (req, opts = {}) => {
        const timeoutValue = opts.timeout ?? DEFAULT_TIMEOUT

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

export interface JSONOptions {
    body: any
}

/**
 * Automatically transforms a plain object in the body to JSON.
 */
export function withJSON<T extends RequestInit>(fetch: Fetch<T>): Fetch<T & JSONOptions> {
    return (req, opts) => {
        if (!opts) {
            return fetch(req, opts)
        }

        let { body, headers = {}, ...rest } = opts

        // Check if we're dealing with a JSON object.
        if (isPlainObject(body)) {
            body = JSON.stringify(body)

            // Normalize headers.
            headers = new Headers(headers)
            headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json')
        }

        // @ts-ignore
        return fetch(req, {
            body,
            headers,
            ...rest,
        })
    }
}

export function withThrowNonOk<T extends RequestInit>(fetch: Fetch<T>): Fetch<T> {
    return async (req, opts) => {
        const res = await fetch(req, opts)

        // Make sure any non-200 responses are thrown.
        if (!res.ok) {
            throw new Error(`${res.status} : ${res.statusText}`)
        }

        return res
    }
}

export { withRetry }

export default function createFetch(fetchVal?: Fetch<RequestInit>) {
    return withJSON(withThrowNonOk(withTimeout(fetchVal ?? fetch)))
}
