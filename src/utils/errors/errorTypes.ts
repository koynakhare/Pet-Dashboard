/**
 * Normalized API / thunk error payload returned by `handleErrors`.
 */
export type NormalizedErrorResponse = {
  success: false
  message: string
  /** Always `true` for error results (explicit flag for consumers). */
  error: true
  statusCode?: number
}

/**
 * Intermediate shape produced while parsing unknown errors (before user-facing copy).
 */
export type ParsedErrorDetails = {
  message: string
  statusCode?: number
  /** Axios / runtime error code when available (e.g. `ECONNABORTED`, `ERR_NETWORK`). */
  code?: string
}

/**
 * Typed HTTP error thrown after the axios response interceptor so status is not lost.
 */
export class AppHttpError extends Error {
  override readonly name = 'AppHttpError'
  readonly statusCode?: number
  readonly code?: string

  constructor(
    message: string,
    options?: {
      statusCode?: number
      code?: string
    },
  ) {
    super(message)
    this.statusCode = options?.statusCode
    this.code = options?.code
  }
}

export function isAppHttpError(value: unknown): value is AppHttpError {
  return value instanceof AppHttpError
}
