/**
 * Public surface for centralized error handling (import from `@/utils/errors` when convenient).
 */
export {
  ERROR_MESSAGES,
  ERROR_MESSAGES_CLIENT,
  HTTP_STATUS,
  type HttpStatusConstant,
} from '@/utils/errors/errorConstants'
export {
  formatErrorMessage,
  getDefaultMessageForStatus,
  logoutUser,
  showAlert,
  type ShowAlertOptions,
} from '@/utils/errors/errorHelpers'
export type { NormalizedErrorResponse, ParsedErrorDetails } from '@/utils/errors/errorTypes'
export { AppHttpError, isAppHttpError } from '@/utils/errors/errorTypes'
export { extractErrorMessage, handleErrors } from '@/utils/errors/errorUtils'
