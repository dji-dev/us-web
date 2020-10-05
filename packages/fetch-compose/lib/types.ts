/**
 * Generic type for WHATWG Fetch API.
 */
export type Fetch<T extends RequestInit> = (
    req: RequestInfo,
    opts?: Partial<T>
) => Promise<Response>
