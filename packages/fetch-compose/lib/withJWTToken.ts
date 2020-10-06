import { Headers } from 'cross-fetch'
import jwtDecode from 'jwt-decode'

import { Fetch } from './types'

const UNAUTHORIZED = 401

interface CredentialOptions {
    skipRefresh?: boolean
}

/**
 * Provider that is passed to 'withJWTToken'.
 */
export type CredentialProvider = {
    /**
     * Base hostname for what credentials should be offered.
     */
    baseHostname: string
    /**
     * Gets the current JWT token.
     */
    getToken: () => Promise<string>
    /**
     * Refresh the JWT token using the refresh token.
     *
     * **MUST** throw an error on unsuccessful refresh for the higher-order function
     * to work properly.
     */
    refreshToken: () => Promise<void>
}

const INVALID_TOKEN_ERROR = 'InvalidTokenError'

export interface Token {
    // When token expires in seconds.
    exp: number
}

/**
 * Handles adding the bearer token for authorized routes, otherwise
 * attempting to refresh the JWT token from backend.
 *
 * Requires an implementation of {@type CredentialProvider}
 *
 * Allows an optional field named 'skipRefresh'.
 */
export default function withJWTToken<T extends RequestInit, TK extends Token>(
    fetch: Fetch<T>,
    credentialProvider: CredentialProvider
): Fetch<T & CredentialOptions> {
    const func: Fetch<T & CredentialOptions> = async (req, opts = {}) => {
        const baseHostname = new URL(credentialProvider.baseHostname).hostname

        const url = typeof req === 'string' ? req : req.url
        const hostname = new URL(url).hostname

        // If we're not at the same hostname as the backend, then use normal fetch.
        if (hostname !== baseHostname) {
            return await fetch(req, opts)
        }

        const accessToken = await credentialProvider.getToken()
        // If we don't have any credentials (or account is guest), then just use normal fetch.
        if (!accessToken) {
            return await fetch(req, opts)
        }

        // Check ahead of time for expire of JWT.
        try {
            const { exp: seconds } = jwtDecode<TK>(accessToken)

            if (seconds <= Date.now() / 1000) {
                // Try to refresh token if 'expired'.
                await credentialProvider.refreshToken()

                return await func(req, {
                    ...opts,
                    skipRefresh: true,
                })
            }

            // eslint-disable-next-line no-empty
        } catch (e) {
            // We don't want to make many assumption about the JWT token,
            // so if there's an error just let it be.
            if (
                !e ||
                !(
                    e.name === INVALID_TOKEN_ERROR ||
                    (e.constructor && e.constructor.name === INVALID_TOKEN_ERROR) ||
                    e.toString().include(INVALID_TOKEN_ERROR)
                )
            ) {
                throw e
            }
        }

        let { headers = {}, ...rest } = opts
        // Normalize headers.
        headers = new Headers(headers)
        headers.set('Authorization', headers.get('Authorization') ?? `Bearer ${accessToken}`)

        // @ts-ignore
        const res = await fetch(req, {
            headers,
            ...rest,
        })

        // Try to refresh token.
        if (!res.ok && !opts.skipRefresh && res.status === UNAUTHORIZED) {
            await credentialProvider.refreshToken()

            // Retry the request again with new token.
            //
            // Usually this could cause infinite recursion, however refreshToken
            // will throw on any bad response.
            return await func(req, {
                ...opts,
                skipRefresh: true,
            })
        }

        return res
    }

    return func
}
