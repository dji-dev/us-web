[@dji-dev/us-web-util](../README.md) › [Globals](../globals.md) › ["index"](_index_.md)

# Module: "index"

## Index

### References

* [Alpha](_index_.md#alpha)
* [CompareResult](_index_.md#compareresult)
* [LngLat](_index_.md#lnglat)
* [Nullable](_index_.md#nullable)
* [createSVGViewBox](_index_.md#createsvgviewbox)
* [getAllStyles](_index_.md#getallstyles)
* [hasScrollBar](_index_.md#hasscrollbar)
* [injectScript](_index_.md#injectscript)
* [isMobileSafari](_index_.md#ismobilesafari)
* [isScrolledToBottom](_index_.md#isscrolledtobottom)
* [requestUserLocation](_index_.md#requestuserlocation)

### Variables

* [BASE_10](_index_.md#const-base_10)

### Functions

* [compareFunc](_index_.md#comparefunc)
* [constrain](_index_.md#constrain)
* [getIsJest](_index_.md#getisjest)
* [getRootHostname](_index_.md#getroothostname)
* [invariant](_index_.md#invariant)
* [jsonClone](_index_.md#jsonclone)
* [resolveIdleCallback](_index_.md#resolveidlecallback)
* [resolveTimeout](_index_.md#resolvetimeout)
* [roundFixed](_index_.md#roundfixed)

## References

###  Alpha

• **Alpha**:

___

###  CompareResult

• **CompareResult**:

___

###  LngLat

• **LngLat**:

___

###  Nullable

• **Nullable**:

___

###  createSVGViewBox

• **createSVGViewBox**:

___

###  getAllStyles

• **getAllStyles**:

___

###  hasScrollBar

• **hasScrollBar**:

___

###  injectScript

• **injectScript**:

___

###  isMobileSafari

• **isMobileSafari**:

___

###  isScrolledToBottom

• **isScrolledToBottom**:

___

###  requestUserLocation

• **requestUserLocation**:

## Variables

### `Const` BASE_10

• **BASE_10**: *10* = 10

*Defined in [index.ts:67](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L67)*

## Functions

###  compareFunc

▸ **compareFunc**(`a`: number, `b`: number): *[CompareResult](_index_.md#compareresult)*

*Defined in [index.ts:22](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L22)*

For use with Array#sort as the default comparator converts to
strings beforehand.

Reference:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

**Parameters:**

Name | Type |
------ | ------ |
`a` | number |
`b` | number |

**Returns:** *[CompareResult](_index_.md#compareresult)*

___

###  constrain

▸ **constrain**(`a`: number, `min`: number, `max?`: undefined | number): *number*

*Defined in [index.ts:40](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L40)*

Constrains a number between {@param min} and {@param max}.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`a` | number | - |
`min` | number | - |
`max?` | undefined &#124; number |   |

**Returns:** *number*

___

###  getIsJest

▸ **getIsJest**(): *boolean*

*Defined in [index.ts:56](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L56)*

In some cases, it is useful at runtime to know if
we're inside of a Jest environment.

**Returns:** *boolean*

___

###  getRootHostname

▸ **getRootHostname**(`hostname`: string, `baseParts`: number): *string*

*Defined in [index.ts:83](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L83)*

Removes any subdomains from the host.

Example: abc.google.com -> google.com

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`hostname` | string | - |
`baseParts` | number | 2 |

**Returns:** *string*

___

###  invariant

▸ **invariant**(`condition`: boolean, `message`: string): *void*

*Defined in [index.ts:96](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L96)*

Simple implementation of the invariant pattern (used by Facebook).

**Parameters:**

Name | Type |
------ | ------ |
`condition` | boolean |
`message` | string |

**Returns:** *void*

___

###  jsonClone

▸ **jsonClone**‹**T**›(`obj`: T): *T*

*Defined in [index.ts:63](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L63)*

Using JSON.parse and JSON.stringify to clone a JS object.

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`obj` | T |

**Returns:** *T*

___

###  resolveIdleCallback

▸ **resolveIdleCallback**(): *Promise‹void›*

*Defined in [index.ts:116](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L116)*

Resolve on next idle callback.

**Returns:** *Promise‹void›*

___

###  resolveTimeout

▸ **resolveTimeout**(`duration`: number): *Promise‹void›*

*Defined in [index.ts:109](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L109)*

Resolves the Promise after {@param duration}.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`duration` | number | 0 |

**Returns:** *Promise‹void›*

___

###  roundFixed

▸ **roundFixed**(`a`: number, `places`: number, `base`: number): *number*

*Defined in [index.ts:72](https://github.com/dji-dev/us-web/blob/85e3443/packages/us-web-util/lib/index.ts#L72)*

Rounds a number to a fixed set of decimal places.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`a` | number | - |
`places` | number | 0 |
`base` | number | BASE_10 |

**Returns:** *number*
