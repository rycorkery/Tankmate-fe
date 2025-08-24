import { useStore } from '@/store/useStore'
import { TankmateCard, TankmateCardContent, TankmateCardHeader, TankmateCardTitle } from '@/components/custom/TankmateCard'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { ButtonVariant, Routes } from '@/lib/constants'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const { user, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    navigate(Routes.LOGIN)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome back, {user?.name || user?.email || 'User'}!</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>My Tanks</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-3xl font-bold text-brand-ocean mb-2">0</div>
            <p className="text-sm text-slate-600">Active aquariums</p>
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="mt-4 w-full"
              onClick={() => navigate(Routes.TANK_CREATE)}
            >
              Add Your First Tank
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>

        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Maintenance Tasks</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-3xl font-bold text-brand-teal mb-2">0</div>
            <p className="text-sm text-slate-600">Tasks due today</p>
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="mt-4 w-full"
              onClick={() => navigate(Routes.MAINTENANCE)}
            >
              View Schedule
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>

        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Water Quality</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-3xl font-bold text-brand-seafoam mb-2">--</div>
            <p className="text-sm text-slate-600">Last test: Never</p>
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="mt-4 w-full"
            >
              Log Test Results
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Recent Activity</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="text-center py-8 text-slate-500">
              <p className="mb-4">No recent activity</p>
              <p className="text-sm">Start by adding your first aquarium to begin tracking!</p>
            </div>
          </TankmateCardContent>
        </TankmateCard>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 flex flex-wrap gap-4">
        <TankmateButton 
          variant={ButtonVariant.DEFAULT}
          onClick={() => navigate(Routes.TANK_CREATE)}
        >
          Add Tank
        </TankmateButton>
        <TankmateButton 
          variant={ButtonVariant.SECONDARY}
          onClick={() => navigate(Routes.PROFILE)}
        >
          Edit Profile
        </TankmateButton>
        <TankmateButton 
          variant={ButtonVariant.SECONDARY}
          onClick={() => navigate(Routes.SETTINGS)}
        >
          Settings
        </TankmateButton>
        <TankmateButton 
          variant={ButtonVariant.GHOST}
          onClick={handleLogout}
          className="ml-auto text-red-600 hover:bg-red-50"
        >
          Logout
        </TankmateButton>
      </div>
    </div>
  )
}