import { useEffect, useMemo } from 'react'
import Animated from 'react-native-reanimated'

/**
 * React Hook that returns a Reanimated value. This value is initially 0,
 * then next idle after {@param duration} (uses `setTimeout`) changes to
 * 1 on the JS thread.
 */
export default function useTimeoutValue(duration: number): Animated.Value<0 | 1> {
    const called = useMemo(() => new Animated.Value<0 | 1>(0), [])

    useEffect(() => {
        const id = setTimeout(() => {
            called.setValue(1)
        }, duration)

        return () => {
            clearTimeout(id)
        }
    }, [duration, called])

    return called
}
