export type NormalizedErrorResponse = {
  success: false
  message: string
  error: true
  statusCode?: number
}

export type ParsedErrorDetails = {
  message: string
  statusCode?: number
  code?: string
}

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
    if (options?.statusCode !== undefined) {
      this.statusCode = options.statusCode
    }
    if (options?.code !== undefined) {
      this.code = options.code
    }
  }
}

export function isAppHttpError(value: unknown): value is AppHttpError {
  return value instanceof AppHttpError
}
