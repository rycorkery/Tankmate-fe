import { AxiosError } from 'axios'
import { type ZodSchema } from 'zod'
import { validateFormData, validateApiResponse } from '@/api/validation'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: unknown
}

export class TankmateApiError extends Error {
  status?: number
  code?: string
  details?: unknown

  constructor(error: ApiError) {
    super(error.message)
    this.name = 'TankmateApiError'
    this.status = error.status
    this.code = error.code
    this.details = error.details
  }
}

/**
 * Transforms various error types into standardized TankmateApiError
 */
export function handleApiError(error: unknown): TankmateApiError {
  if (error instanceof TankmateApiError) {
    return error
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status
    const data = error.response?.data

    // Handle common HTTP status codes
    switch (status) {
      case 400:
        return new TankmateApiError({
          message: data?.message || 'Invalid request data',
          status,
          code: 'BAD_REQUEST',
          details: data,
        })
      case 401:
        return new TankmateApiError({
          message: 'Authentication required',
          status,
          code: 'UNAUTHORIZED',
        })
      case 403:
        return new TankmateApiError({
          message: 'Access forbidden',
          status,
          code: 'FORBIDDEN',
        })
      case 404:
        return new TankmateApiError({
          message: data?.message || 'Resource not found',
          status,
          code: 'NOT_FOUND',
        })
      case 422:
        return new TankmateApiError({
          message: 'Validation failed',
          status,
          code: 'VALIDATION_ERROR',
          details: data?.errors || data,
        })
      case 429:
        return new TankmateApiError({
          message: 'Too many requests. Please try again later.',
          status,
          code: 'RATE_LIMITED',
        })
      case 500:
        return new TankmateApiError({
          message: 'Internal server error',
          status,
          code: 'SERVER_ERROR',
        })
      default:
        return new TankmateApiError({
          message: data?.message || error.message || 'Network error occurred',
          status,
          code: 'NETWORK_ERROR',
          details: data,
        })
    }
  }

  if (error instanceof Error) {
    return new TankmateApiError({
      message: error.message,
      code: 'UNKNOWN_ERROR',
    })
  }

  return new TankmateApiError({
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
    details: error,
  })
}

/**
 * Base service class with validation and error handling
 */
export abstract class BaseApiService {
  /**
   * Validates request data before sending to API
   */
  protected validateRequest<T>(schema: ZodSchema<T>, data: unknown): T {
    return validateFormData(schema, data, 'Request')
  }

  /**
   * Validates API response data
   */
  protected validateResponse<T>(schema: ZodSchema<T>, data: unknown): T {
    return validateApiResponse(schema, data, 'API')
  }

  /**
   * Wraps API calls with error handling
   */
  protected async executeApiCall<T>(apiCall: () => Promise<T>, errorContext?: string): Promise<T> {
    try {
      return await apiCall()
    } catch (error) {
      const apiError = handleApiError(error)
      if (errorContext) {
        apiError.message = `${errorContext}: ${apiError.message}`
      }
      throw apiError
    }
  }
}
