import { API_BASE_URL } from '@/config'
import { API_ENDPOINTS } from '@/utils/constants/apiEndpoints'

const FETCH_TIMEOUT_MS = 30_000

export class PetsFetchError extends Error {
  readonly status: number | undefined

  constructor(message: string, cause?: unknown, status?: number) {
    super(message, cause !== undefined ? { cause } : undefined)
    this.name = 'PetsFetchError'
    this.status = status
  }
}

function buildAbsolutePetsUrl(): string {
  const base = API_BASE_URL.replace(/\/$/, '')
  const path =
    typeof API_ENDPOINTS.PETS === 'string' && API_ENDPOINTS.PETS.startsWith('/')
      ? API_ENDPOINTS.PETS
      : `/${API_ENDPOINTS.PETS}`
  return `${base}${path}`
}

function abortableFetch(
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

export async function fetchPets(): Promise<unknown> {
  const url = buildAbsolutePetsUrl()
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  let response: Response
  try {
    response = await abortableFetch(
      url,
      {
        method: 'GET',
        headers,
        credentials: 'same-origin',
      },
      FETCH_TIMEOUT_MS,
    )
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      throw new PetsFetchError(`GET /pets timed out after ${FETCH_TIMEOUT_MS}ms`, cause)
    }
    throw new PetsFetchError('GET /pets network error', cause)
  }

  if (!response.ok) {
    throw new PetsFetchError(`HTTP ${response.status}`, undefined, response.status)
  }

  const text = await response.text()
  if (!text.trim()) {
    throw new PetsFetchError('Empty response body from GET /pets')
  }

  try {
    return JSON.parse(text) as unknown
  } catch (cause) {
    throw new PetsFetchError('Invalid JSON from GET /pets', cause)
  }
}
