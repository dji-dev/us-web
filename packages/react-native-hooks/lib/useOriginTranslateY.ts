import { useMemo } from 'react'
import Animated from 'react-native-reanimated'

const { multiply, divide, sub } = Animated

/**
 * React Native does not support transform-origin, so we need to fake it
 * by controlling the translateY.
 *
 * Intended functionality: origin of scale is the top-center.
 */
export default function useOriginTranslateY(height: number, scale: Animated.Node<number>) {
    return useMemo(() => {
        return divide(multiply(-height, divide(sub(1, scale), 2)), scale)
    }, [height, scale])
}
