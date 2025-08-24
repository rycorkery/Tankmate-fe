import { useParams, Link } from 'react-router-dom'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateCard, TankmateCardContent, TankmateCardHeader, TankmateCardTitle } from '@/components/custom/TankmateCard'
import { ButtonVariant, Routes } from '@/lib/constants'

export function TankDetail() {
  const { id } = useParams<{ id: string }>()
  
  // Mock data - in real app this would come from API
  const tank = {
    id,
    name: 'Community Tank',
    type: 'Freshwater',
    size: '55 gallons',
    status: 'healthy',
    parameters: {
      temperature: '78°F',
      ph: '7.2',
      ammonia: '0 ppm',
      nitrite: '0 ppm',
      nitrate: '10 ppm',
    },
    equipment: [
      { name: 'Canister Filter', status: 'working', lastMaintained: '1 week ago' },
      { name: 'LED Light', status: 'working', lastMaintained: 'Never' },
      { name: 'Heater', status: 'working', lastMaintained: '2 weeks ago' },
    ],
    inhabitants: [
      { name: 'Neon Tetras', count: 8, species: 'Paracheirodon innesi' },
      { name: 'Corydoras', count: 3, species: 'Corydoras paleatus' },
      { name: 'Betta', count: 1, species: 'Betta splendens' },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Link 
              to={Routes.TANKS} 
              className="text-brand-ocean hover:text-brand-ocean-dark text-sm"
            >
              ← Back to Tanks
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{tank.name}</h1>
          <p className="text-slate-600">{tank.type} • {tank.size}</p>
        </div>
        <div className="flex space-x-3">
          <TankmateButton variant={ButtonVariant.OUTLINE}>
            Add Fish
          </TankmateButton>
          <TankmateButton variant={ButtonVariant.OUTLINE}>
            Add Equipment
          </TankmateButton>
          <TankmateButton variant={ButtonVariant.DEFAULT}>
            Log Maintenance
          </TankmateButton>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Water Parameters */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Water Parameters</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="space-y-3">
              {Object.entries(tank.parameters).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize text-slate-600">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="w-full mt-4"
            >
              Log Test Results
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>

        {/* Equipment */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Equipment</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="space-y-3">
              {tank.equipment.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-slate-600">
                      Maintained: {item.lastMaintained}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    item.status === 'working' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="w-full mt-4"
            >
              Add Equipment
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>

        {/* Inhabitants */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Fish & Inhabitants</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            <div className="space-y-3">
              {tank.inhabitants.map((fish, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{fish.name}</div>
                    <div className="text-slate-600">x{fish.count}</div>
                  </div>
                  <div className="text-xs text-slate-500 italic">{fish.species}</div>
                </div>
              ))}
            </div>
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="w-full mt-4"
            >
              Add Fish
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
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b last:border-0">
                <div>
                  <div className="font-medium">Water change performed</div>
                  <div className="text-sm text-slate-600">25% water change</div>
                </div>
                <div className="text-sm text-slate-500">2 days ago</div>
              </div>
              <div className="flex justify-between items-center py-3 border-b last:border-0">
                <div>
                  <div className="font-medium">Water parameters tested</div>
                  <div className="text-sm text-slate-600">All parameters normal</div>
                </div>
                <div className="text-sm text-slate-500">3 days ago</div>
              </div>
              <div className="flex justify-between items-center py-3 border-b last:border-0">
                <div>
                  <div className="font-medium">Filter cleaned</div>
                  <div className="text-sm text-slate-600">Canister filter maintenance</div>
                </div>
                <div className="text-sm text-slate-500">1 week ago</div>
              </div>
            </div>
          </TankmateCardContent>
        </TankmateCard>
      </div>
    </div>
  )
}