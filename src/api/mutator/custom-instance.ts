import Axios, { type AxiosRequestConfig, AxiosError } from 'axios'
import { config } from '@/config/env'
import { StorageKeys } from '@/lib/constants'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: config.api.fullUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: function (params) {
    // Custom serializer to handle nested objects properly
    const searchParams = new URLSearchParams()

    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'object' && value !== null) {
        // For nested objects like pageable, flatten them
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (nestedValue !== undefined && nestedValue !== null) {
            searchParams.append(`${nestedKey}`, String(nestedValue))
          }
        }
      } else if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    }

    return searchParams.toString()
  },
})

// Request interceptor for auth token
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Add auth token from localStorage if available
    const token = localStorage.getItem(StorageKeys.TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth tokens and reload page
      localStorage.removeItem(StorageKeys.TOKEN)
      localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
      // Redirect to login will be handled by ProtectedRoute component
      console.error('Authentication expired')
    }

    if (error.response?.status === 403) {
      // Handle forbidden
      console.error('Access forbidden')
    }

    if (error.response?.status && error.response.status >= 500) {
      // Handle server errors
      console.error('Server error occurred')
    }

    return Promise.reject(error)
  }
)

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // @ts-expect-error - Adding cancel method to promise
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}
