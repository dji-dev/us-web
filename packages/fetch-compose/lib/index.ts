/* eslint-disable no-shadow */
import fetch from 'cross-fetch'
// @ts-ignore
import withRetryUntyped from '@zeit/fetch-retry'

import withJSON from './withJSON'
import withQuery from './withQuery'
import withThrowNonOk from './withThrowNonOk'
import withTimeout, { AbortController } from './withTimeout'
import withJWTToken, { CredentialProvider } from './withJWTToken'

import { Fetch } from './types'

export interface RetryOptions {
    onRetry?: (error: any, opts: RequestInit & RetryOptions) => unknown
    retry?: {
        onRetry?: (error: any) => unknown
        maxRetryAfter?: number
    }
}

function fakeWithRetry<T extends RequestInit>(fetch: Fetch<T>): Fetch<T & RetryOptions> {
    return fetch as any
}
export const withRetry: typeof fakeWithRetry = withRetryUntyped

export {
    withJSON,
    withQuery,
    withThrowNonOk,
    withTimeout,
    withJWTToken,
    CredentialProvider,
    AbortController,
    Fetch,
    fetch,
}

/**
 * Creates an opinionated default for fetch.
 *
 * - Automatically transforms a 'body' object into JSON request.
 * - Automatically appends a 'query' option into the search params of the request.
 * - Throws an error on non-2xx HTTP responses.
 * - Allows request to specify a timeout, with default of 10s.
 */
export default function createFetch(fetchVal?: Fetch<RequestInit>) {
    return withJSON(withQuery(withThrowNonOk(withTimeout(fetchVal ?? fetch))))
}
