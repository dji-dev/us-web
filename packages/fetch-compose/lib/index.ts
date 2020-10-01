/* eslint-disable no-shadow */
import fetch from 'cross-fetch'
import withRetry from '@zeit/fetch-retry'

import withJSON from './withJSON'
import withThrowNonOk from './withThrowNonOk'
import withTimeout, { AbortController } from './withTimeout'
import withJWTToken, { CredentialProvider } from './withJWTToken'

import { Fetch } from './types'

export {
    withRetry,
    withJSON,
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
 * - Throws an error on non-2xx HTTP responses.
 * - Allows request to specify a timeout, with default of 10s.
 */
export default function createFetch(fetchVal?: Fetch<RequestInit>) {
    return withJSON(withThrowNonOk(withTimeout(fetchVal ?? fetch)))
}
