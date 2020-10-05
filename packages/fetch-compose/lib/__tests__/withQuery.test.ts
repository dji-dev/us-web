import { Request } from 'cross-fetch'
import withQuery from '../withQuery'

const URL = Math.random().toString()

describe('withQuery', () => {
    it('works with basic example', () => {
        const fn = jest.fn()
        const fetcher = withQuery(fn)

        fetcher(URL, {
            query: {
                a: 1,
            },
        })

        expect(fn).toBeCalledTimes(1)

        const [callUrl] = fn.mock.calls[0]

        expect(callUrl).toBe(`${URL}?a=1`)
    })

    it('works with 2nd basic example', () => {
        const fn = jest.fn()
        const fetcher = withQuery(fn)

        fetcher(`${URL}?a=1`, {
            query: {
                b: 2,
            },
        })

        expect(fn).toBeCalledTimes(1)

        const [callUrl] = fn.mock.calls[0]

        expect(callUrl).toBe(`${URL}?a=1&b=2`)
    })

    it('fails with Request object', () => {
        const fn = jest.fn()
        const fetcher = withQuery(fn)

        let error: any = null
        try {
            fetcher(new Request(URL), {
                query: {
                    b: 2,
                },
            })
        } catch (e) {
            error = e
        }

        expect(error).toBeTruthy()
    })
})
