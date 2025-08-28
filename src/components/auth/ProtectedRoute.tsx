import { Navigate, Outlet } from 'react-router-dom'
import { useStore } from '@/store/useStore'
import { Routes } from '@/lib/constants'

interface ProtectedRouteProps {
  children?: React.ReactNode
  redirectTo?: string
}

export function ProtectedRoute({ children, redirectTo = Routes.LOGIN }: ProtectedRouteProps) {
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  // You could also check for a token in localStorage as a fallback
  const token = localStorage.getItem('token')
  const hasAuth = isAuthenticated || !!token

  if (!hasAuth) {
    // Redirect to login page if not authenticated
    return <Navigate to={redirectTo} replace />
  }

  // Render children if provided, otherwise render Outlet for nested routes
  return children ? <>{children}</> : <Outlet />
}
