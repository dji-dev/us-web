[@dji-dev/us-web-util](../README.md) › [Globals](../globals.md) › ["dom"](_dom_.md)

# Module: "dom"

## Index

### Variables

* [MAXIMUM_AGE_MINUTES](_dom_.md#const-maximum_age_minutes)
* [MINUTES_TO_SECONDS](_dom_.md#const-minutes_to_seconds)
* [SECONDS_TO_MILLISECONDS](_dom_.md#const-seconds_to_milliseconds)

### Functions

* [getAllStyles](_dom_.md#getallstyles)
* [hasScrollBar](_dom_.md#hasscrollbar)
* [injectScript](_dom_.md#injectscript)
* [isMobileSafari](_dom_.md#ismobilesafari)
* [isScrolledToBottom](_dom_.md#isscrolledtobottom)
* [requestUserLocation](_dom_.md#requestuserlocation)

## Variables

### `Const` MAXIMUM_AGE_MINUTES

• **MAXIMUM_AGE_MINUTES**: *30* = 30

*Defined in [dom.ts:3](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L3)*

___

### `Const` MINUTES_TO_SECONDS

• **MINUTES_TO_SECONDS**: *60* = 60

*Defined in [dom.ts:4](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L4)*

___

### `Const` SECONDS_TO_MILLISECONDS

• **SECONDS_TO_MILLISECONDS**: *1000* = 1000

*Defined in [dom.ts:5](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L5)*

## Functions

###  getAllStyles

▸ **getAllStyles**(): *string*

*Defined in [dom.ts:80](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L80)*

Returns a full stylesheet for the application.

This will include CSS Modules from Vue or React w/ proper Webpack
config.

**Returns:** *string*

___

###  hasScrollBar

▸ **hasScrollBar**(`el`: Element): *boolean*

*Defined in [dom.ts:70](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L70)*

Returns true if {@param el}'s scroll height is larger
than the client height.

**Parameters:**

Name | Type |
------ | ------ |
`el` | Element |

**Returns:** *boolean*

___

###  injectScript

▸ **injectScript**(`src`: string): *Promise‹void›*

*Defined in [dom.ts:41](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L41)*

Injects a JS script into the <head> tag.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`src` | string | JS file URL. |

**Returns:** *Promise‹void›*

Promise that resolves when the script is loaded.

___

###  isMobileSafari

▸ **isMobileSafari**(): *boolean*

*Defined in [dom.ts:96](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L96)*

If we're on 'vanilla' Mobile Safari. Will not be true
for Chrome for iOS.

Modified from this analysis of different user-agents:
https://stackoverflow.com/posts/29696509/revisions

**Returns:** *boolean*

___

###  isScrolledToBottom

▸ **isScrolledToBottom**(`el`: Element, `threshold`: number): *boolean*

*Defined in [dom.ts:58](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L58)*

Returns true if {@param el} is scrolled to the bottom,
within {@param threshold}.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`el` | Element | - |
`threshold` | number | 0 |

**Returns:** *boolean*

___

###  requestUserLocation

▸ **requestUserLocation**(): *Promise‹[LngLat](_types_.md#lnglat)›*

*Defined in [dom.ts:12](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/dom.ts#L12)*

Requests current user's location.

https://developers.google.com/web/fundamentals/native-hardware/user-location/

**Returns:** *Promise‹[LngLat](_types_.md#lnglat)›*
