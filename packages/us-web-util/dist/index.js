export { default as debounce } from 'lodash.debounce';
export { default as throttle } from 'lodash.throttle';
export { default as deepMerge } from 'deepmerge';
export { default as deepClone } from 'clone-deep';

var MAXIMUM_AGE_MINUTES = 30;
var MINUTES_TO_SECONDS = 60;
var SECONDS_TO_MILLISECONDS = 1000;
/**
 * Requests current user's location.
 *
 * https://developers.google.com/web/fundamentals/native-hardware/user-location/
 */
function requestUserLocation() {
    return new Promise(function (resolve, reject) {
        if (!navigator.geolocation) {
            var err = new Error('Geolocation is not supported by this browser.');
            reject(err);
            throw err;
        }
        // console.log('Requesting user location')
        navigator.geolocation.getCurrentPosition(function (_a) {
            var coords = _a.coords;
            return resolve([coords.longitude, coords.latitude]);
        }, function (err) { return reject(err); }, {
            // 30 minutes in milliseconds
            // https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/maximumAge
            maximumAge: MAXIMUM_AGE_MINUTES * MINUTES_TO_SECONDS * SECONDS_TO_MILLISECONDS,
            enableHighAccuracy: false
        });
    });
}
/**
 * Injects a JS script into the <head> tag.
 *
 * @param src JS file URL.
 * @returns Promise that resolves when the script is loaded.
 */
function injectScript(src) {
    return new Promise(function (resolve, reject) {
        var _a;
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.addEventListener('load', function () { return resolve(); });
        script.addEventListener('error', function (err) { return reject(err); });
        script.src = src;
        (_a = document.querySelector('head')) === null || _a === void 0 ? void 0 : _a.appendChild(script);
    });
}
/**
 * Returns true if {@param el} is scrolled to the bottom,
 * within {@param threshold}.
 */
function isScrolledToBottom(el, threshold) {
    if (threshold === void 0) { threshold = 0; }
    var scrollTop = el.scrollTop;
    var height = el.getBoundingClientRect().height;
    var scrollHeight = el.scrollHeight;
    return scrollTop + height >= scrollHeight - threshold;
}
/**
 * Returns true if {@param el}'s scroll height is larger
 * than the client height.
 */
function hasScrollBar(el) {
    return el.clientHeight < el.scrollHeight;
}
/**
 * Returns a full stylesheet for the application.
 *
 * This will include CSS Modules from Vue or React w/ proper Webpack
 * config.
 */
function getAllStyles() {
    var styles = [];
    document.querySelectorAll('head > style').forEach(function (el) {
        styles.push(el.innerHTML);
    });
    return styles.join('\n');
}
/**
 * If we're on 'vanilla' Mobile Safari. Will not be true
 * for Chrome for iOS.
 *
 * Modified from this analysis of different user-agents:
 * https://stackoverflow.com/posts/29696509/revisions
 */
function isMobileSafari() {
    var ua = window.navigator.userAgent;
    var isIOS = !!((ua.match(/ipad/i) || ua.match(/iphone/i)) && ua.match(/webkit/i));
    var isChromeIOS = !!ua.match(/crios/i);
    return isIOS && !isChromeIOS;
}

/**
 * For use with Array#sort as the default comparator converts to
 * strings beforehand.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
function compareFunc(a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
/**
 * Constrains a number between {@param min} and {@param max}.
 *
 * @param min
 * @param max
 */
function constrain(a, min, max) {
    if (a < min) {
        return min;
    }
    if (max != null && a > max) {
        return max;
    }
    return a;
}
/**
 * In some cases, it is useful at runtime to know if
 * we're inside of a Jest environment.
 */
function getIsJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}
/**
 * Using JSON.parse and JSON.stringify to clone a JS object.
 */
function jsonClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
/**
 * Removes any subdomains from the host.
 *
 * Example: abc.google.com -> google.com
 */
function getRootHostname(hostname, baseParts) {
    if (baseParts === void 0) { baseParts = 2; }
    var parts = hostname.split('.');
    if (parts.length <= baseParts) {
        return hostname;
    }
    return parts.slice(-baseParts).join('.');
}
/**
 * Simple implementation of the invariant pattern (used by Facebook).
 */
function invariant(condition, message) {
    if (!condition) {
        if (__DEV__) {
            throw new Error(message);
        }
        else {
            throw new Error('Invariant Error');
        }
    }
}

export { compareFunc, constrain, getAllStyles, getIsJest, getRootHostname, hasScrollBar, injectScript, invariant, isMobileSafari, isScrolledToBottom, jsonClone, requestUserLocation };
