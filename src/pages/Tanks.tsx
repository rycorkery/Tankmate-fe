import { Link } from 'react-router-dom'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateCard, TankmateCardContent, TankmateCardHeader, TankmateCardTitle } from '@/components/custom/TankmateCard'
import { ButtonVariant, Routes, generateRoute } from '@/lib/constants'

export function Tanks() {
  // Mock data - in real app this would come from API
  const tanks = [
    { id: '1', name: 'Community Tank', type: 'Freshwater', size: '55 gallons', status: 'healthy' },
    { id: '2', name: 'Reef Tank', type: 'Saltwater', size: '75 gallons', status: 'needs attention' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Tanks</h1>
          <p className="text-slate-600">Manage and monitor your aquariums</p>
        </div>
        <Link to={Routes.TANK_CREATE}>
          <TankmateButton variant={ButtonVariant.DEFAULT}>
            Add New Tank
          </TankmateButton>
        </Link>
      </div>

      {tanks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-slate-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No tanks yet</h3>
          <p className="text-slate-600 mb-6">Get started by adding your first aquarium</p>
          <Link to={Routes.TANK_CREATE}>
            <TankmateButton variant={ButtonVariant.DEFAULT}>
              Add Your First Tank
            </TankmateButton>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tanks.map((tank) => (
            <Link key={tank.id} to={generateRoute.tankDetail(tank.id)}>
              <TankmateCard hoverable clickable>
                <TankmateCardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <TankmateCardTitle>{tank.name}</TankmateCardTitle>
                      <p className="text-sm text-slate-600">{tank.type} • {tank.size}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tank.status === 'healthy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tank.status}
                    </div>
                  </div>
                </TankmateCardHeader>
                <TankmateCardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Temperature:</span>
                      <span>78°F</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">pH:</span>
                      <span>7.2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Last maintained:</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </TankmateCardContent>
              </TankmateCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}