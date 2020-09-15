import { useState, useEffect } from 'react'
import { Image } from 'react-native'

/**
 * React Hook that returns the size of the given {@param image}
 * using [Image.getSize](https://reactnative.dev/docs/image.html#getsize).
 *
 * @author Jiuyi Zhang <jiuyi.zhang@dji.com>
 */
export default function useImageSize(image: string): { width: number; height: number } {
    const [size, setSize] = useState([0, 0])

    useEffect(() => {
        if (!image) {
            return () => {}
        }

        let cancelled = false
        Image.getSize(
            image,
            (width, height) => {
                if (cancelled) {
                    return
                }

                setSize([width, height])
            },
            (error) => {
                if (cancelled) {
                    return
                }

                throw error
            }
        )

        return () => {
            cancelled = true
        }
    }, [image])

    return {
        width: size[0],
        height: size[1],
    }
}
