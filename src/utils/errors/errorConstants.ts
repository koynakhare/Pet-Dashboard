/**
 * Canonical HTTP status codes used across the app (aligned with enterprise APIs).
 */
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

export type HttpStatusConstant = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS]

/**
 * User-facing defaults per HTTP status (overridable by backend `message` when present).
 */
export const ERROR_MESSAGES: Readonly<
  Record<
    | typeof HTTP_STATUS.BAD_REQUEST
    | typeof HTTP_STATUS.UNAUTHORIZED
    | typeof HTTP_STATUS.FORBIDDEN
    | typeof HTTP_STATUS.NOT_FOUND
    | typeof HTTP_STATUS.CONFLICT
    | typeof HTTP_STATUS.UNPROCESSABLE_ENTITY
    | typeof HTTP_STATUS.TOO_MANY_REQUESTS
    | typeof HTTP_STATUS.INTERNAL_SERVER_ERROR
    | typeof HTTP_STATUS.BAD_GATEWAY
    | typeof HTTP_STATUS.SERVICE_UNAVAILABLE,
    string
  >
> = {
  [HTTP_STATUS.BAD_REQUEST]: 'The request could not be understood. Please check your input.',
  [HTTP_STATUS.UNAUTHORIZED]: 'Your session has expired or is invalid. Please sign in again.',
  [HTTP_STATUS.FORBIDDEN]: 'You do not have permission to perform this action.',
  [HTTP_STATUS.NOT_FOUND]: 'The requested resource was not found.',
  [HTTP_STATUS.CONFLICT]: 'This action conflicts with the current state. Please refresh and try again.',
  [HTTP_STATUS.UNPROCESSABLE_ENTITY]:
    'Validation failed. Please review the highlighted fields.',
  [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too many requests. Please wait a moment and try again.',
  [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Something went wrong on our side. Please try again later.',
  [HTTP_STATUS.BAD_GATEWAY]: 'The service is temporarily unavailable. Please try again later.',
  [HTTP_STATUS.SERVICE_UNAVAILABLE]:
    'The service is under maintenance or overloaded. Please try again later.',
} as const

/** Non-HTTP failure modes (network, client runtime). */
export const ERROR_MESSAGES_CLIENT = {
  NETWORK: 'Unable to reach the server. Check your connection and try again.',
  TIMEOUT: 'The request took too long and was cancelled. Please try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again.',
} as const
