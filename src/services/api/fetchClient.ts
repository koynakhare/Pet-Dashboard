const DEFAULT_FETCH_TIMEOUT_MS = 30_000

export class FetchClientError extends Error {
  readonly status: number | undefined

  constructor(message: string, cause?: unknown, status?: number) {
    super(message, cause !== undefined ? { cause } : undefined)
    this.name = 'FetchClientError'
    this.status = status
  }
}

export function buildAbsoluteApiUrl(baseUrl: string, path: string): string {
  const base = baseUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export function abortableFetch(
  resource: Parameters<typeof fetch>[0],
  init: RequestInit,
  ms: number,
): Promise<Response> {
  const controller = new AbortController()
  const id = window.setTimeout(() => controller.abort(), ms)
  const merged: RequestInit = {
    ...init,
    signal: controller.signal,
  }
  const done = (): void => window.clearTimeout(id)
  return fetch(resource, merged).finally(done)
}

export type FetchJsonParams = {
  label: string
  method?: string
  headers?: HeadersInit
  credentials?: RequestCredentials
  timeoutMs?: number
}

export async function fetchJson(url: string, params: FetchJsonParams): Promise<unknown> {
  const {
    label,
    method = 'GET',
    headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials = 'same-origin',
    timeoutMs = DEFAULT_FETCH_TIMEOUT_MS,
  } = params

  let response: Response
  try {
    response = await abortableFetch(
      url,
      {
        method,
        headers,
        credentials,
      },
      timeoutMs,
    )
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw new FetchClientError(`${label} timed out after ${timeoutMs}ms`, cause)
    }
    throw new FetchClientError(`${label} network error`, cause)
  }

  if (!response.ok) {
    throw new FetchClientError(`HTTP ${response.status}`, undefined, response.status)
  }

  const text = await response.text()
  if (!text.trim()) {
    throw new FetchClientError(`Empty response body from ${label}`)
  }

  try {
    return JSON.parse(text) as unknown
  } catch (cause) {
    throw new FetchClientError(`Invalid JSON from ${label}`, cause)
  }
}
