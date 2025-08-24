import { StorageKeys } from '@/lib/constants'

interface JWTPayload {
  exp?: number
  iat?: number
  sub?: string
  email?: string
  name?: string
  userId?: string
  [key: string]: any
}

/**
 * Decode a JWT token without verifying signature (client-side only)
 * For actual signature verification, use the backend
 */
export function decodeJWT(token: string): JWTPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }
    
    // Decode the payload (second part)
    const payload = parts[1]
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decoded)
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJWT(token)
  if (!payload || !payload.exp) {
    return true // Consider invalid or missing exp as expired
  }
  
  // exp is in seconds, Date.now() is in milliseconds
  const expirationTime = payload.exp * 1000
  const currentTime = Date.now()
  
  // Add a small buffer (5 seconds) to account for clock differences
  return currentTime >= expirationTime - 5000
}

/**
 * Get user info from JWT token
 */
export function getUserFromToken(token: string): { id: string; email: string; name: string } | null {
  const payload = decodeJWT(token)
  if (!payload) {
    return null
  }
  
  return {
    id: payload.userId || payload.sub || '',
    email: payload.email || '',
    name: payload.name || '',
  }
}

/**
 * Check if we have a valid auth token
 */
export function hasValidAuth(): boolean {
  const token = localStorage.getItem(StorageKeys.TOKEN)
  if (!token) {
    return false
  }
  
  return !isTokenExpired(token)
}

/**
 * Clear all auth tokens
 */
export function clearAuthTokens(): void {
  localStorage.removeItem(StorageKeys.TOKEN)
  localStorage.removeItem(StorageKeys.REFRESH_TOKEN)
}