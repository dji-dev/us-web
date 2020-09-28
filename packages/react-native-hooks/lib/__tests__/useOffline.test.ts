import { renderHook } from '@testing-library/react-hooks'

import useOffline from '../useOffline'

describe('useImageSize', () => {
    it('works within expected functionality', () => {
        const { result } = renderHook(() => useOffline())

        expect(result.error).toBeFalsy()
        expect(result.current).toBeFalsy()
    })
})
