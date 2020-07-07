import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import deepMerge from 'deepmerge';
import deepClone from 'clone-deep';
import { CompareResult } from './types';
export * from './types';
export * from './dom';
export { debounce, throttle, deepMerge, deepClone };
/**
 * For use with Array#sort as the default comparator converts to
 * strings beforehand.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
export declare function compareFunc(a: number, b: number): CompareResult;
/**
 * Constrains a number between {@param min} and {@param max}.
 *
 * @param min
 * @param max
 */
export declare function constrain(a: number, min: number, max?: number): number;
/**
 * In some cases, it is useful at runtime to know if
 * we're inside of a Jest environment.
 */
export declare function getIsJest(): boolean;
/**
 * Using JSON.parse and JSON.stringify to clone a JS object.
 */
export declare function jsonClone<T>(obj: T): T;
/**
 * Removes any subdomains from the host.
 *
 * Example: abc.google.com -> google.com
 */
export declare function getRootHostname(hostname: string, baseParts?: number): string;
/**
 * Simple implementation of the invariant pattern (used by Facebook).
 */
export declare function invariant(condition: boolean, message: string): void;
