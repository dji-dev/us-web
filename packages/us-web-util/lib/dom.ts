import { LngLat } from './types'

const MAXIMUM_AGE_MINUTES = 30
const MINUTES_TO_SECONDS = 60
const SECONDS_TO_MILLISECONDS = 1000

/**
 * Requests current user's location.
 *
 * https://developers.google.com/web/fundamentals/native-hardware/user-location/
 */
export function requestUserLocation(): Promise<LngLat> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            const err = new Error('Geolocation is not supported by this browser.')
            reject(err)
            throw err
        }

        // console.log('Requesting user location')

        navigator.geolocation.getCurrentPosition(
            ({ coords }) => resolve([coords.longitude, coords.latitude]),
            (err) => reject(err),
            {
                // 30 minutes in milliseconds
                // https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/maximumAge
                maximumAge: MAXIMUM_AGE_MINUTES * MINUTES_TO_SECONDS * SECONDS_TO_MILLISECONDS,
                enableHighAccuracy: false,
            }
        )
    })
}

/**
 * Injects a JS script into the <head> tag.
 *
 * @param src JS file URL.
 * @returns Promise that resolves when the script is loaded.
 */
export function injectScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.addEventListener('load', () => resolve())
        script.addEventListener('error', (err) => reject(err))

        script.src = src
        document.querySelector('head')?.appendChild(script)
    })
}

/**
 * Returns true if {@param el} is scrolled to the bottom,
 * within {@param threshold}.
 */
export function isScrolledToBottom(el: Element, threshold = 0) {
    const scrollTop = el.scrollTop
    const height = el.getBoundingClientRect().height
    const scrollHeight = el.scrollHeight

    return scrollTop + height >= scrollHeight - threshold
}

/**
 * Returns true if {@param el}'s scroll height is larger
 * than the client height.
 */
export function hasScrollBar(el: Element): boolean {
    return el.clientHeight < el.scrollHeight
}

/**
 * Returns a full stylesheet for the application.
 *
 * This will include CSS Modules from Vue or React w/ proper Webpack
 * config.
 */
export function getAllStyles(): string {
    const styles: string[] = []
    document.querySelectorAll('head > style').forEach((el) => {
        styles.push(el.innerHTML)
    })

    return styles.join('\n')
}

/**
 * If we're on 'vanilla' Mobile Safari. Will not be true
 * for Chrome for iOS.
 *
 * Modified from this analysis of different user-agents:
 * https://stackoverflow.com/posts/29696509/revisions
 */
export function isMobileSafari(): boolean {
    const ua = window.navigator.userAgent

    const isIOS = !!((ua.match(/ipad/i) || ua.match(/iphone/i)) && ua.match(/webkit/i))
    const isChromeIOS = !!ua.match(/crios/i)

    return isIOS && !isChromeIOS
}
