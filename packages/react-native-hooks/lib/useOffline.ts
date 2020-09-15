import { useNetInfo } from '@react-native-community/netinfo'

/**
 * React Hook that returns if the device is currently offline.
 *
 * If the network is not yet ready to query, returns `true` to prevent
 * UI glitches.
 */
export default function useOffline(): boolean {
    const { type, isConnected, isInternetReachable } = useNetInfo()

    return (
        type === 'none' ||
        (type !== 'unknown' && (isConnected === false || isInternetReachable === false))
    )
}
