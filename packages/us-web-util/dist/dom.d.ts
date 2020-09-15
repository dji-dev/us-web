import { LngLat } from './types';
/**
 * Requests current user's location.
 *
 * https://developers.google.com/web/fundamentals/native-hardware/user-location/
 */
export declare function requestUserLocation(): Promise<LngLat>;
/**
 * Injects a JS script into the <head> tag.
 *
 * @param src JS file URL.
 * @returns Promise that resolves when the script is loaded.
 */
export declare function injectScript(src: string): Promise<void>;
/**
 * Returns true if {@param el} is scrolled to the bottom,
 * within {@param threshold}.
 */
export declare function isScrolledToBottom(el: Element, threshold?: number): boolean;
/**
 * Returns true if {@param el}'s scroll height is larger
 * than the client height.
 */
export declare function hasScrollBar(el: Element): boolean;
/**
 * Returns a full stylesheet for the application.
 *
 * This will include CSS Modules from Vue or React w/ proper Webpack
 * config.
 */
export declare function getAllStyles(): string;
/**
 * If we're on 'vanilla' Mobile Safari. Will not be true
 * for Chrome for iOS.
 *
 * Modified from this analysis of different user-agents:
 * https://stackoverflow.com/posts/29696509/revisions
 */
export declare function isMobileSafari(): boolean;
