import { ERROR_MESSAGES, ERROR_MESSAGES_CLIENT, HTTP_STATUS } from '@/utils/errors/errorConstants'
import { type ParsedErrorDetails, isAppHttpError } from '@/utils/errors/errorTypes'
import { type AxiosError, isAxiosError } from 'axios'
import { get } from 'lodash'
import toast from 'react-hot-toast'

const NOTIFICATION_DEDUP_MS = 2800

const lastNotificationAt = new Map<string, number>()

export type ShowAlertOptions = {
  silent?: boolean
  dedupeKey?: string
}

export function showAlert(message: string, options?: ShowAlertOptions): void {
  if (options?.silent) {
    return
  }
  const key = options?.dedupeKey ?? message
  const now = Date.now()
  const prev = lastNotificationAt.get(key)
  if (prev !== undefined && now - prev < NOTIFICATION_DEDUP_MS) {
    return
  }
  lastNotificationAt.set(key, now)
  toast.error(message, { id: key, duration: 5000 })
}

export function logoutUser(): void {
  /* noop */
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function extractBackendMessage(data: unknown): string | undefined {
  if (data === null || data === undefined) {
    return undefined
  }
  if (typeof data === 'string' && data.trim().length > 0) {
    return data.trim()
  }

  const directMessage: unknown = get(data, 'message', undefined)
  if (typeof directMessage === 'string' && directMessage.trim().length > 0) {
    return directMessage.trim()
  }

  const title: unknown = get(data, 'title', undefined)
  if (typeof title === 'string' && title.trim().length > 0) {
    return title.trim()
  }

  const errorField: unknown = get(data, 'error', undefined)
  if (typeof errorField === 'string' && errorField.trim().length > 0) {
    return errorField.trim()
  }
  if (isRecord(errorField)) {
    const nested: unknown = get(errorField, 'message', undefined)
    if (typeof nested === 'string' && nested.trim().length > 0) {
      return nested.trim()
    }
  }

  const detail: unknown = get(data, 'detail', undefined)
  if (typeof detail === 'string' && detail.trim().length > 0) {
    return detail.trim()
  }
  if (Array.isArray(detail) && detail.every((x: unknown): x is string => typeof x === 'string')) {
    return detail.join(', ')
  }

  const errorsVal: unknown = get(data, 'errors', undefined)
  if (Array.isArray(errorsVal)) {
    const parts = errorsVal.filter((x): x is string => typeof x === 'string')
    if (parts.length > 0) {
      return parts.join(', ')
    }
  }
  if (isRecord(errorsVal)) {
    const flat = Object.values(errorsVal).flatMap((v) =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [],
    )
    if (flat.length > 0) {
      return flat.join(', ')
    }
  }

  return undefined
}

function messageForHttpStatus(status: number): string | undefined {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return ERROR_MESSAGES[HTTP_STATUS.BAD_REQUEST]
    case HTTP_STATUS.UNAUTHORIZED:
      return ERROR_MESSAGES[HTTP_STATUS.UNAUTHORIZED]
    case HTTP_STATUS.FORBIDDEN:
      return ERROR_MESSAGES[HTTP_STATUS.FORBIDDEN]
    case HTTP_STATUS.NOT_FOUND:
      return ERROR_MESSAGES[HTTP_STATUS.NOT_FOUND]
    case HTTP_STATUS.CONFLICT:
      return ERROR_MESSAGES[HTTP_STATUS.CONFLICT]
    case HTTP_STATUS.UNPROCESSABLE_ENTITY:
      return ERROR_MESSAGES[HTTP_STATUS.UNPROCESSABLE_ENTITY]
    case HTTP_STATUS.TOO_MANY_REQUESTS:
      return ERROR_MESSAGES[HTTP_STATUS.TOO_MANY_REQUESTS]
    case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      return ERROR_MESSAGES[HTTP_STATUS.INTERNAL_SERVER_ERROR]
    case HTTP_STATUS.BAD_GATEWAY:
      return ERROR_MESSAGES[HTTP_STATUS.BAD_GATEWAY]
    case HTTP_STATUS.SERVICE_UNAVAILABLE:
      return ERROR_MESSAGES[HTTP_STATUS.SERVICE_UNAVAILABLE]
    default:
      return undefined
  }
}

export function formatErrorMessage(error: unknown): ParsedErrorDetails {
  if (isAppHttpError(error)) {
    return {
      message: error.message,
      ...(error.statusCode !== undefined ? { statusCode: error.statusCode } : {}),
      ...(error.code !== undefined ? { code: error.code } : {}),
    }
  }

  if (isAxiosError(error)) {
    return formatAxiosError(error)
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return { message: error.message }
  }

  return {
    message: ERROR_MESSAGES_CLIENT.UNKNOWN,
    code: 'UNKNOWN',
  }
}

function formatAxiosError(error: AxiosError<unknown>): ParsedErrorDetails {
  const axiosCode = error.code
  const status = error.response?.status

  if (axiosCode === 'ECONNABORTED') {
    return {
      message: ERROR_MESSAGES_CLIENT.TIMEOUT,
      code: axiosCode,
    }
  }

  if (error.response === undefined && error.request !== undefined) {
    return {
      message: ERROR_MESSAGES_CLIENT.NETWORK,
      code: axiosCode ?? 'ERR_NETWORK',
    }
  }

  if (typeof status === 'number') {
    const fromBody = extractBackendMessage(error.response?.data)
    const fallback = messageForHttpStatus(status)
    const message =
      fromBody ??
      fallback ??
      (typeof error.message === 'string' && error.message.length > 0
        ? error.message
        : ERROR_MESSAGES_CLIENT.UNKNOWN)

    return {
      message,
      statusCode: status,
      ...(axiosCode !== undefined ? { code: axiosCode } : {}),
    }
  }

  const messageFallback =
    typeof error.message === 'string' && error.message.length > 0
      ? error.message
      : ERROR_MESSAGES_CLIENT.UNKNOWN

  return {
    message: messageFallback,
    ...(axiosCode !== undefined ? { code: axiosCode } : {}),
  }
}

export function getDefaultMessageForStatus(status: number): string {
  return messageForHttpStatus(status) ?? ERROR_MESSAGES_CLIENT.UNKNOWN
}
