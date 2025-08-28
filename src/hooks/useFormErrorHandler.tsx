import { useState } from 'react'

export interface FormErrors {
  [key: string]: string | undefined
  general?: string
}

export function useFormErrorHandler<T extends FormErrors>() {
  const [errors, setErrors] = useState<T>({} as T)

  const handleApiError = (error: any) => {
    const newErrors: FormErrors = {}
    
    // Check if it's an Axios error with a response
    if (error?.response?.data) {
      const responseData = error.response.data
      
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
        responseData.fieldErrors.forEach((fieldError: any) => {
          const field = fieldError.field
          if (field) {
            newErrors[field] = fieldError.message
          }
        })
      }
    } else if (error?.message) {
      // Fallback to generic error message
      newErrors.general = error.message
    } else {
      newErrors.general = 'An unexpected error occurred. Please try again.'
    }
    
    setErrors(newErrors as T)
  }

  const clearError = (field: keyof T) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
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
    clearAllErrors
  }
}