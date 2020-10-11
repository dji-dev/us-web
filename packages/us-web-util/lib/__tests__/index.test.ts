import 'promise-any-polyfill'

import {
    compareFunc,
    constrain,
    getIsJest,
    getRootHostname,
    jsonClone,
    resolveIdleCallback,
    resolveTimeout,
    roundFixed,
} from '../index'

describe('compareFunc', () => {
    it('works with easy numbers', () => {
        expect(compareFunc(9, 10)).toBe(-1)
        expect(compareFunc(10, 9)).toBe(1)
        expect(compareFunc(10, 10)).toBe(0)
    })

    it('works with negative numbers', () => {
        expect(compareFunc(-900, 10)).toBe(-1)
    })
})

describe('constrain', () => {
    it('works with trivial examples', () => {
        expect(constrain(0, 0, 1)).toBe(0)
        expect(constrain(0, 1, 1)).toBe(1)
        expect(constrain(2, 1, 1)).toBe(1)

        expect(constrain(10, 0, 20)).toBe(10)
        expect(constrain(-10, 0, 20)).toBe(0)
        expect(constrain(30, 0, 20)).toBe(20)

        expect(constrain(0, 0)).toBe(0)
        expect(constrain(0, 1)).toBe(1)
        expect(constrain(2, 1)).toBe(2)
    })
})

it('getIsJest', () => {
    expect(getIsJest()).toBeTruthy()
})

it('jsonClone', () => {
    const a = { b: {}, c: 1 }
    const clone = jsonClone(a)

    expect(a).not.toBe(clone)
    expect(a.b).not.toBe(clone.b)

    expect(a).toEqual(clone)
})

describe('roundFixed', () => {
    it('works with trivial examples', () => {
        expect(roundFixed(10, 2)).toBe(10)
        expect(roundFixed(20, -2)).toBe(0)
        expect(roundFixed(90, -2)).toBe(100)
    })

    it('works in other bases', () => {
        expect(roundFixed(16, 2, 2)).toBe(16)
        expect(roundFixed(0, -2, 2)).toBe(0)
        expect(roundFixed(15, -2, 2)).toBe(16)
    })
})

describe('getRootHostname', () => {
    it('works with trivial examples', () => {
        expect(getRootHostname('com')).toBe('com')
        expect(getRootHostname('dji.com')).toBe('dji.com')
        expect(getRootHostname('abc.dji.com')).toBe('dji.com')
        expect(getRootHostname('abc.123.xyz.hello.dji.com')).toBe('dji.com')
    })
})

describe('resolveTimeout', () => {
    it('resolves', async () => {
        await resolveTimeout(10)
    })

    it('will timeout', async () => {
        await Promise.any([
            resolveTimeout(300).then(() => {
                throw new Error('failed')
            }),
            new Promise((resolve) => setTimeout(resolve, 100)),
        ])
    })
})

describe('resolveIdleCallback', () => {
    it('resolves', async () => {
        await resolveIdleCallback()
    })
})
