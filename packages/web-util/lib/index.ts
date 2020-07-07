import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import deepMerge from 'deepmerge'
import deepClone from 'clone-deep'

import { CompareResult } from './types'

export * from './types'
export * from './dom'
export * from './svg'
export * from './fetch'

// Re-exports from other libraries.
export { debounce, throttle, deepMerge, deepClone }

/**
 * For use with Array#sort as the default comparator converts to
 * strings beforehand.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
export function compareFunc(a: number, b: number): CompareResult {
    if (a < b) {
        return -1
    }

    if (a > b) {
        return 1
    }

    return 0
}

/**
 * Constrains a number between {@param min} and {@param max}.
 *
 * @param min
 * @param max
 */
export function constrain(a: number, min: number, max?: number): number {
    if (a < min) {
        return min
    }

    if (max != null && a > max) {
        return max
    }

    return a
}

/**
 * In some cases, it is useful at runtime to know if
 * we're inside of a Jest environment.
 */
export function getIsJest() {
    return process.env.JEST_WORKER_ID !== undefined
}

/**
 * Using JSON.parse and JSON.stringify to clone a JS object.
 */
export function jsonClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj))
}

const BASE_10 = 10

/**
 * Rounds a number to a fixed set of decimal places.
 */
export function roundFixed(a: number, places: number = 0, base: number = BASE_10): number {
    const factor = Math.pow(base, places)

    return Math.round(a * factor) / factor
}

/**
 * Removes any subdomains from the host.
 *
 * Example: abc.google.com -> google.com
 */
export function getRootHostname(hostname: string, baseParts: number = 2): string {
    const parts = hostname.split('.')

    if (parts.length <= baseParts) {
        return hostname
    }

    return parts.slice(-baseParts).join('.')
}

/**
 * Simple implementation of the invariant pattern (used by Facebook).
 */
export function invariant(condition: boolean, message: string) {
    if (!condition) {
        if (__DEV__) {
            throw new Error(message)
        } else {
            throw new Error('Invariant Error')
        }
    }
}

/**
 * Resolves the Promise after {@param duration}.
 */
export function resolveTimeout(duration: number = 0): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, duration))
}

/**
 * Resolve on next idle callback.
 */
export function resolveIdleCallback(): Promise<void> {
    if (typeof requestIdleCallback !== 'undefined') {
        return new Promise((resolve) => requestIdleCallback(() => resolve()))
    }

    return resolveTimeout(1)
}
