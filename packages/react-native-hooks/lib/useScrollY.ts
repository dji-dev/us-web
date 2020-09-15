import { useState } from 'react'
import Animated from 'react-native-reanimated'

export interface ScrollYHook {
    animatedScrollY: Animated.Value<number>
    onScroll: any
}

/**
 * This function is a hook-version of this tutorial for react-native-reanimated:
 * https://callstack.com/blog/reanimating-your-react-native-experience/
 */
export default function useScrollY(): ScrollYHook {
    const [value] = useState<Animated.Value<number>>(() => new Animated.Value(0))
    const [onScroll] = useState(() => {
        return Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            y: value,
                        },
                    },
                },
            ],
            { useNativeDriver: true }
        )
    })

    return {
        animatedScrollY: value,
        onScroll,
    }
}
