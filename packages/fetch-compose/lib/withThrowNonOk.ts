import { Fetch } from './types'

/**
 * Throws a generic Error if HTTP response is not "ok".
 */
export default function withThrowNonOk<T extends RequestInit>(fetch: Fetch<T>): Fetch<T> {
    return async (req, opts) => {
        const res = await fetch(req, opts)

        // Make sure any non-200 responses are thrown.
        if (!res.ok) {
            throw new Error(`${res.status} : ${res.statusText}`)
        }

        return res
    }
}
