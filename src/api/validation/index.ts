import { type ZodSchema, ZodError } from 'zod'

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: string[]
}

/**
 * Validates data against a Zod schema and returns structured result
 */
export function validateData<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data)
    return {
      success: true,
      data: validatedData,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        errors: error.issues.map((err) => `${err.path.join('.')}: ${err.message}`),
      }
    }
    return {
      success: false,
      errors: ['Unknown validation error'],
    }
  }
}

/**
 * Validates form data before API submission
 * Throws error with user-friendly messages if validation fails
 */
export function validateFormData<T>(schema: ZodSchema<T>, data: unknown, fieldName = 'form'): T {
  const result = validateData(schema, data)

  if (!result.success) {
    const errorMessage = result.errors?.join(', ') || 'Validation failed'
    throw new Error(`${fieldName} validation failed: ${errorMessage}`)
  }

  return result.data!
}

/**
 * Safe validation that returns undefined on error instead of throwing
 */
export function safeValidate<T>(schema: ZodSchema<T>, data: unknown): T | undefined {
  try {
    return schema.parse(data)
  } catch {
    return undefined
  }
}

/**
 * Validates API response data
 */
export function validateApiResponse<T>(schema: ZodSchema<T>, data: unknown, endpoint = 'API'): T {
  const result = validateData(schema, data)

  if (!result.success) {
    console.error(`${endpoint} response validation failed:`, result.errors)
    throw new Error(`Invalid ${endpoint} response format`)
  }

  return result.data!
}
