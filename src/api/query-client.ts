import { QueryClient, type DefaultOptions } from '@tanstack/react-query'
import { TankmateApiError } from './services/base'

const queryConfig: DefaultOptions = {
  queries: {
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (
        error instanceof TankmateApiError &&
        error.status &&
        error.status >= 400 &&
        error.status < 500
      ) {
        return false
      }
      // Retry up to 3 times for server errors and network issues
      return failureCount < 3
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: false, // Don't retry mutations automatically
  },
}

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
})
