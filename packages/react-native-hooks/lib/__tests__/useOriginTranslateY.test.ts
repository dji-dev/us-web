import { renderHook, act } from '@testing-library/react-hooks'
import Animated from 'react-native-reanimated'

import useOriginTranslateY from '../useOriginTranslateY'

function getValue<T>(node: Animated.Node<T>): Promise<T> {
    return new Promise((resolve) => {
        Animated.call([node], ([value]) => resolve(value))
    })
}

describe('useImageSize', () => {
    it('works within expected functionality', async () => {
        const height = 200
        let value = new Animated.Value<number>(1)

        const { result, rerender } = renderHook(() => useOriginTranslateY(height, value))

        expect(result.error).toBeFalsy()
        expect(await getValue(result.current)).toBe(0)

        act(() => {
            value = new Animated.Value<number>(0.5)
            rerender()
        })

        expect(await getValue(result.current)).toBe(-height / 2)
    })
})
