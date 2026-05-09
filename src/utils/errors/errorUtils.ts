import type { AppDispatch } from '@/redux/store'
import { HTTP_STATUS } from '@/utils/errors/errorConstants'
import {
  formatErrorMessage,
  logoutUser,
  showAlert,
} from '@/utils/errors/errorHelpers'
import type { NormalizedErrorResponse } from '@/utils/errors/errorTypes'

/**
 * Enterprise entry point: normalize errors, optionally notify, and enforce auth policy (401).
 * Use from thunk `catch` blocks, route loaders, or global handlers.
 *
 * @param silent When `true`, skips toast notifications only. Session cleanup on 401 still runs.
 */
export async function handleErrors(
  error: unknown,
  dispatch: AppDispatch,
  silent = false,
): Promise<NormalizedErrorResponse> {
  const parsed = formatErrorMessage(error)
  const statusCode = parsed.statusCode

  if (statusCode === HTTP_STATUS.UNAUTHORIZED) {
    logoutUser(dispatch)
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
    statusCode,
  }
}

/**
 * Lightweight message extraction for interceptors and `rejectWithValue` (no side effects).
 */
export function extractErrorMessage(error: unknown): string {
  return formatErrorMessage(error).message
}
