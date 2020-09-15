import { useEffect } from 'react'
import { AppState } from 'react-native'

/**
 * React Hook that will call whenever the
 * [AppState](https://reactnative.dev/docs/appstate) changes.
 *
 * @author Jiuyi Zhang <jiuyi.zhang@dji.com>
 */
export default function useAppState(callback: () => unknown) {
    useEffect(() => {
        let previousState = ''

        const handleStatusChange = (nextState: string) => {
            if (previousState === 'background' && nextState === 'active') {
                callback()
            }
            previousState = nextState
        }

        AppState.addEventListener('change', handleStatusChange)
        return () => {
            AppState.removeEventListener('change', handleStatusChange)
        }
    }, [callback])
}
