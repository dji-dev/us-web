import { Headers, Response } from 'cross-fetch'

import withJWTToken, { CredentialProvider } from '../withJWTToken'

describe('withJWTToken', () => {
    it("doesn't add credentials to other hostname", async () => {
        const provider: CredentialProvider = {
            baseHostname: 'https://dji.com',
            getToken: jest.fn(() => Promise.resolve('token 123')),
            refreshToken: jest.fn(),
        }

        const fn = jest.fn()
        const fetcher = withJWTToken(fn, provider)

        await fetcher('https://api.dji.com')

        expect(fn).toBeCalledTimes(1)

        const [callUrl, callOpts] = fn.mock.calls[0]

        expect(callUrl).toBe('https://api.dji.com')
        expect(callOpts).toBeTruthy()

        expect(provider.getToken).not.toHaveBeenCalled()
        expect(provider.refreshToken).not.toHaveBeenCalled()

        expect(callOpts.headers).not.toBeDefined()
    })

    it('adds credentials to other hostname successfully', async () => {
        const provider: CredentialProvider = {
            baseHostname: 'https://dji.com',
            getToken: jest.fn(() => Promise.resolve('token 123')),
            refreshToken: jest.fn(),
        }

        const fn: any = jest.fn(() => {
            return new Response('hello', { status: 204, statusText: 'Great!' })
        })
        const fetcher = withJWTToken(fn, provider)

        await fetcher('https://dji.com')

        expect(fn).toBeCalledTimes(1)

        const [callUrl, callOpts] = fn.mock.calls[0]

        expect(callUrl).toBe('https://dji.com')
        expect(callOpts).toBeTruthy()

        expect(provider.getToken).toHaveBeenCalled()
        expect(provider.refreshToken).not.toHaveBeenCalled()

        expect(callOpts.headers).toBeInstanceOf(Headers)
        expect((callOpts.headers as Headers).get('Authorization')).toBe('Bearer token 123')
    })

    it('refresh token only once', async () => {
        const provider: CredentialProvider = {
            baseHostname: 'https://dji.com',
            getToken: jest.fn(() => Promise.resolve('token 123')),
            refreshToken: jest.fn(),
        }

        const fn: any = jest.fn(() => {
            return new Response('hello', { status: 401, statusText: 'Unauthorized' })
        })
        const fetcher = withJWTToken(fn, provider)

        let error: any = null
        try {
            await fetcher('https://dji.com')
        } catch (e) {
            error = e
        }

        // Should be a 401, but still returned.
        expect(error).toBeFalsy()

        expect(fn).toBeCalledTimes(2)

        const [callUrl, callOpts] = fn.mock.calls[0]

        expect(callUrl).toBe('https://dji.com')
        expect(callOpts).toBeTruthy()

        expect(provider.getToken).toHaveBeenCalledTimes(2)
        expect(provider.refreshToken).toHaveBeenCalledTimes(1)

        expect(callOpts.headers).toBeInstanceOf(Headers)
        expect((callOpts.headers as Headers).get('Authorization')).toBe('Bearer token 123')
    })
})
