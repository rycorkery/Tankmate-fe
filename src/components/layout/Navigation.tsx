import { Link } from 'react-router-dom'
import { TankmateButton } from '@/components/custom'

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-brand-ocean hover:text-brand-ocean-dark transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-ocean to-brand-aqua flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span>Tankmate</span>
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground hover:text-brand-ocean transition-colors"
              >
                Home
              </Link>
              <Link
                to="/features"
                className="text-sm font-medium text-muted-foreground hover:text-brand-ocean transition-colors"
              >
                Features
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground hover:text-brand-ocean transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-sm font-medium text-muted-foreground hover:text-brand-ocean transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <TankmateButton variant="ghost" size="sm">
                Login
              </TankmateButton>
            </Link>
            <Link to="/signup">
              <TankmateButton size="sm">Get Started</TankmateButton>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
