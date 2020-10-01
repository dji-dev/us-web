import { Headers } from 'cross-fetch'

import withJSON from '../withJSON'

const URL = Math.random().toString()

describe('withJSON', () => {
    it('transforms plain object', () => {
        const body = {
            name: 'Michael',
        }

        const fn = jest.fn()
        const fetcher = withJSON(fn)

        fetcher(URL, { body })

        expect(fn).toBeCalledTimes(1)

        const [callUrl, callOpts] = fn.mock.calls[0]

        expect(callUrl).toBe(URL)
        expect(callOpts).toBeTruthy()
        expect(callOpts.body).toBe(JSON.stringify(body))
        expect(callOpts.headers).toBeInstanceOf(Headers)
        expect((callOpts.headers as Headers).get('Content-Type')).toBe('application/json')
    })

    it("doesn't transform non-plain object", () => {
        function Cls() {}

        // @ts-ignore
        const body = new Cls()
        Object.assign(body, {
            name: 'Michael',
        })

        const fn = jest.fn()
        const fetcher = withJSON(fn)

        fetcher(URL, { body })

        expect(fn).toBeCalledTimes(1)

        const [callUrl, callOpts] = fn.mock.calls[0]

        expect(callUrl).toBe(URL)
        expect(callOpts).toBeTruthy()
        expect(callOpts.body).toBe(body)
    })

    it('retains Content-Type if already set', () => {
        const body = {
            name: 'Michael',
        }

        const fn = jest.fn()
        const fetcher = withJSON(fn)

        fetcher(URL, { body, headers: { 'content-type': 'application/rjson' } })

        expect(fn).toBeCalledTimes(1)

        const [, callOpts] = fn.mock.calls[0]

        expect(callOpts).toBeTruthy()
        expect(callOpts.headers).toBeInstanceOf(Headers)
        expect((callOpts.headers as Headers).get('Content-Type')).toBe('application/rjson')
    })
})
