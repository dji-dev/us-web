import { Response } from 'cross-fetch'

import withThrowNonOk from '../withThrowNonOk'

const URL = Math.random().toString()

describe('withThrowNonOk', () => {
    it('successful on ok-response', async () => {
        const fn = jest.fn(async () => {
            return new Response('hello', { status: 204, statusText: 'Great!' })
        })
        const fetcher = withThrowNonOk(fn)

        await fetcher(URL)
        expect(fn).toBeCalledTimes(1)
    })

    it('fails on not-ok-response', async () => {
        const fn = jest.fn(async () => {
            return new Response('hello', { status: 500, statusText: 'Failed!' })
        })
        const fetcher = withThrowNonOk(fn)

        let error: any = null
        try {
            await fetcher(URL)
        } catch (e) {
            error = e
        }

        expect(fn).toBeCalledTimes(1)
        expect(error).toBeTruthy()
    })
})
