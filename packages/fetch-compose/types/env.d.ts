declare module '@zeit/fetch-retry' {
    export interface RetryOptions {
        onRetry?: (error: any, opts: RequestInit & RetryOptions) => unknown
        retry?: {
            onRetry?: (error: any) => unknown
            maxRetryAfter?: number
        }
    }

    type Fetch = typeof fetch
    type RetryFetch = Fetch &
        ((input: RequestInfo, opts?: RequestInit & RetryOptions) => Promise<Response>)

    const func: (fetch: Fetch) => RetryFetch
    export default func
}
