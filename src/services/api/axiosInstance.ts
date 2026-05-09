import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { formatErrorMessage } from '@/utils/errors/errorHelpers'
import { AppHttpError } from '@/utils/errors/errorTypes'
import { STORAGE_KEYS } from '@/utils/constants/storageKeys'
import { API_BASE_URL } from '@/config'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getStoredAuthToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  } catch {
    return null
  }
}

let authTokenOverride: string | null = null

export function setAuthTokenOverride(token: string | null): void {
  authTokenOverride = token
}

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authTokenOverride ?? getStoredAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const parsed = formatErrorMessage(error)
    return Promise.reject(
      new AppHttpError(parsed.message, {
        statusCode: parsed.statusCode,
        code: parsed.code,
      }),
    )
  },
)
