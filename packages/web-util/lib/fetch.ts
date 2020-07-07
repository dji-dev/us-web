import createFetch from '@zeit/fetch-retry'

const TIMEOUT = 10000

/**
 * Based on the following gist:
 * https://gist.github.com/davej/728b20518632d97eef1e5a13bf0d05c7#gistcomment-3232643
 */
export const fetchWithTimeout: typeof fetch = (res: RequestInfo, opts: RequestInit = {}) => {
    const controller = new AbortController()
    const promise = fetch(res, { ...opts, signal: controller.signal })

    // Make sure to listen to original AbortController if exists.
    if (opts.signal) {
        opts.signal.addEventListener('abort', () => controller.abort())
    }

    // Set a timeout.
    const timeout = setTimeout(() => controller.abort(), TIMEOUT)

    return promise
        .finally(() => clearTimeout(timeout))
        .catch((err) => {
            // fetry-retry treats AbortError a special case,
            // so if we timed-out, re-throw as a generic error.
            if (err.toString().includes('AbortError')) {
                throw new Error('Request stopped.')
            }

            throw err
        })
}

export const fetchRetry = createFetch(fetchWithTimeout)
