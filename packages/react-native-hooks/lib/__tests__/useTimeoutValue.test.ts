import { renderHook } from '@testing-library/react-hooks'
import Animated from 'react-native-reanimated'

import useTimeoutValue from '../useTimeoutValue'

function getValue<T>(node: Animated.Node<T>): Promise<T> {
    return new Promise((resolve) => {
        Animated.call([node], ([value]) => resolve(value))
    })
}

describe('useImageSize', () => {
    it('works within expected functionality', async () => {
        const { result } = renderHook(() => useTimeoutValue(200))

        expect(result.error).toBeFalsy()
        expect(await getValue(result.current)).toBe(0)

        await new Promise((resolve) => setTimeout(() => resolve(), 100))
        expect(await getValue(result.current)).toBe(0)

        await new Promise((resolve) => setTimeout(() => resolve(), 150))
        expect(await getValue(result.current)).toBe(1)
    })
})
