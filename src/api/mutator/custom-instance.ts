import Axios, { type AxiosRequestConfig, AxiosError } from 'axios'
import { config } from '@/config/env'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: config.api.fullUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth token
AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    // Add auth token from store if available
    // const token = useStore.getState().user?.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
      // Handle unauthorized - logout user
      // useStore.getState().logout();
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
