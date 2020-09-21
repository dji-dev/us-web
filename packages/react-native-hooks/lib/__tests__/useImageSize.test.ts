import { renderHook, act } from '@testing-library/react-hooks'
import { useState } from 'react'

import useImageSize from '../useImageSize'

jest.mock('react-native', () => {
    return {
        Image: {
            getSize(
                image: string,
                cb: (width: number, height: number) => unknown,
                errCb: (err?: any) => unknown
            ): void {
                if (!image) {
                    errCb("Doesn't exist!")
                    return
                }

                cb(200, 300)
            },
        },
    }
})

describe('useImageSize', () => {
    it('works within expected functionality', () => {
        const { result: stateResult } = renderHook(() => useState<string>(''))
        const { result, rerender } = renderHook(() => useImageSize(stateResult.current[0]))

        expect(stateResult.error).toBeFalsy()
        expect(result.error).toBeFalsy()

        expect(result.current).toEqual({
            width: 0,
            height: 0,
        })

        act(() => {
            stateResult.current[1]('non-null value')
            rerender()
        })

        expect(result.current).toEqual({
            width: 200,
            height: 300,
        })

        act(() => {
            stateResult.current[1]('')
            rerender()
        })

        expect(result.current).toEqual({
            width: 0,
            height: 0,
        })
    })
})
