import type { AppDispatch } from '@/redux/store'
import { HTTP_STATUS } from '@/utils/errors/errorConstants'
import { formatErrorMessage, logoutUser, showAlert } from '@/utils/errors/errorHelpers'
import type { NormalizedErrorResponse } from '@/utils/errors/errorTypes'

export function handleErrors(
  error: unknown,
  _dispatch: AppDispatch,
  silent = false,
): NormalizedErrorResponse {
  const parsed = formatErrorMessage(error)
  const statusCode = parsed.statusCode

  if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
    logoutUser()
    if (!silent) {
      showAlert(parsed.message, { dedupeKey: 'client-http-401' })
    }
    return {
      success: false,
      message: parsed.message,
      error: true,
      statusCode,
    }
  }

  if (!silent) {
    const dedupeKey =
      statusCode !== undefined
        ? `client-http-${statusCode}`
        : parsed.code !== undefined
          ? `client-code-${parsed.code}`
          : 'client-error-unknown'
    showAlert(parsed.message, { dedupeKey })
  }

  return {
    success: false,
    message: parsed.message,
    error: true,
    ...(statusCode !== undefined ? { statusCode } : {}),
  }
}

export function extractErrorMessage(error: unknown): string {
  return formatErrorMessage(error).message
}
