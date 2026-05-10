import { API_BASE_URL } from '@/config'
import { formatErrorMessage } from '@/utils/errors/errorHelpers'
import { AppHttpError } from '@/utils/errors/errorTypes'
import axios, { type AxiosError } from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const parsed = formatErrorMessage(error)
    return Promise.reject(
      new AppHttpError(parsed.message, {
        ...(parsed.statusCode !== undefined ? { statusCode: parsed.statusCode } : {}),
        ...(parsed.code !== undefined ? { code: parsed.code } : {}),
      }),
    )
  },
)
