import { stringify, StringifiableRecord } from 'query-string'

import { Fetch } from './types'

export interface QueryOptions {
    query: StringifiableRecord
}

/**
 * If Fetch options include an object 'query', this will be converted
 * into the search params of the URL.
 */
export default function withQuery<T extends RequestInit>(fetch: Fetch<T>): Fetch<T & QueryOptions> {
    return (req, opts) => {
        if (!opts || !opts.query) {
            return fetch(req, opts)
        }

        let { query, ...rest } = opts

        if (typeof req !== 'string') {
            throw new Error(
                'withQuery does not currently support passing Request objects as parameters.'
            )
        }

        req = req.toString() + (!req.includes('?') ? `?` : '&') + stringify(query)

        // @ts-ignore
        return fetch(req, rest)
    }
}
