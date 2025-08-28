import { useState } from 'react'

export interface FormErrors {
  [key: string]: string | undefined
  general?: string
}

export function useFormErrorHandler<T extends FormErrors>() {
  const [errors, setErrors] = useState<T>({} as T)

  const handleApiError = (error: unknown) => {
    const newErrors: FormErrors = {}

    // Check if it's an Axios error with a response
    if (error && typeof error === 'object' && 'response' in error) {
      const axiosError = error as { response: { data: any } }
      const responseData = axiosError.response.data

      // Handle validation errors from the API
      if (responseData.errors) {
        // Map field-specific errors
        Object.keys(responseData.errors).forEach((field) => {
          newErrors[field] = responseData.errors[field]
        })
      }

      // Handle general error message
      if (responseData.message) {
        newErrors.general = responseData.message
      }

      // Handle field violations (Spring Boot style)
      if (responseData.fieldErrors) {
        responseData.fieldErrors.forEach((fieldError: { field?: string; message?: string }) => {
          const field = fieldError.field
          if (field) {
            newErrors[field] = fieldError.message
          }
        })
      }
    } else if (error && typeof error === 'object' && 'message' in error) {
      // Fallback to generic error message
      newErrors.general = (error as Error).message
    } else {
      newErrors.general = 'An unexpected error occurred. Please try again.'
    }

    setErrors(newErrors as T)
  }

  const clearError = (field: keyof T) => {
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const clearAllErrors = () => {
    setErrors({} as T)
  }

  return {
    errors,
    setErrors,
    handleApiError,
    clearError,
    clearAllErrors,
  }
}
