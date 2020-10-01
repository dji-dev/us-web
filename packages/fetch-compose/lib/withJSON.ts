import { Headers } from 'cross-fetch'
import isPlainObject from 'is-plain-object'

import { Fetch } from './types'

export interface JSONOptions {
    body: any
}

/**
 * If Fetch options include a plain-object 'body', this will be converted
 * into JSON with the Content-Type properly set to 'application/json' if not in 'headers'.
 */
export default function withJSON<T extends RequestInit>(fetch: Fetch<T>): Fetch<T & JSONOptions> {
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
