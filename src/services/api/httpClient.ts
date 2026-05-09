import { axiosInstance } from '@/services/api/axiosInstance'
import type { AxiosRequestConfig } from 'axios'

export async function getRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.get<T>(url, config)
  return response.data
}

export async function postRequest<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.post<T>(url, body, config)
  return response.data
}

export async function putRequest<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.put<T>(url, body, config)
  return response.data
}

export async function deleteRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await axiosInstance.delete<T>(url, config)
  return response.data
}
