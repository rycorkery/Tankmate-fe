import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { StorageKeys } from '@/lib/constants'
import { isTokenExpired, getUserFromToken, clearAuthTokens } from '@/lib/jwt'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, user, isAuthenticated } = useStore()

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem(StorageKeys.TOKEN)
    
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log('Token expired, clearing auth')
        clearAuthTokens()
        setUser(null)
      } else if (!user || !isAuthenticated) {
        // Token is valid but we don't have user data in store
        // This happens after a page refresh - extract user from token
        const userFromToken = getUserFromToken(token)
        if (userFromToken) {
          console.log('Restoring user from valid token')
          setUser(userFromToken)
        } else {
          // Token is valid but we can't extract user info
          console.warn('Could not extract user from token')
          clearAuthTokens()
          setUser(null)
        }
      }
    } else {
      // No token, ensure we're logged out
      if (isAuthenticated) {
        setUser(null)
      }
    }
  }, []) // Only run on mount

  return <>{children}</>
}