import { AppState } from 'react-native'
import { renderHook, act } from '@testing-library/react-hooks'
import useAppState from '../useAppState'

jest.mock('react-native', () => {
    let listener: ((state: any) => unknown) | null = null
    let currentState: any

    return {
        AppState: {
            addEventListener(_: string, value: (state: any) => unknown) {
                listener = value
            },
            removeEventListener(_: string, value: (state: any) => unknown) {
                if (listener === value) {
                    listener = null
                }
            },
            get currentState() {
                return currentState
            },
            emit(state: any) {
                currentState = state
                if (listener) {
                    listener(currentState)
                }
            },
        },
    }
})

describe('useAppState', () => {
    it('works within expected functionality', () => {
        const fn = jest.fn()
        const { result } = renderHook(() => useAppState(fn))

        expect(result.error).toBeFalsy()
        expect(fn).not.toHaveBeenCalled()

        // App goes into background.
        act(() => {
            // @ts-ignore
            AppState.emit('background')
        })

        expect(result.error).toBeFalsy()
        expect(fn).not.toHaveBeenCalled()

        act(() => {
            // @ts-ignore
            AppState.emit('active')
        })

        expect(result.error).toBeFalsy()
        expect(fn).toHaveBeenCalled()
    })
})
