import { Link } from 'react-router-dom'
import { TankmateButton } from '@/components/custom'
import { useStore } from '@/store/useStore'
import { ButtonVariant, Routes } from '@/lib/constants'
import { useNavigate } from 'react-router-dom'

export function Navigation() {
  const { user, isAuthenticated, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    navigate(Routes.LOGIN)
  }

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to={Routes.HOME}
              className="flex items-center space-x-2 text-xl font-bold text-brand-ocean hover:text-brand-ocean-dark transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-ocean to-brand-aqua flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span>Tankmate</span>
            </Link>
            {!isAuthenticated && (
              <div className="hidden md:flex space-x-6">
                <Link
                  to="/features"
                  className="text-sm font-medium text-muted-foreground hover:text-brand-ocean transition-colors"
                >
                  Features
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <TankmateButton variant={ButtonVariant.GHOST} size="sm">
                    Dashboard
                  </TankmateButton>
                </Link>
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-slate-600">
                    {user?.name || user?.email || 'User'}
                  </div>
                  <TankmateButton 
                    variant={ButtonVariant.OUTLINE} 
                    size="sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </TankmateButton>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <TankmateButton variant={ButtonVariant.GHOST} size="sm">
                    Login
                  </TankmateButton>
                </Link>
                <Link to="/signup">
                  <TankmateButton variant={ButtonVariant.DEFAULT} size="sm">
                    Get Started
                  </TankmateButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
