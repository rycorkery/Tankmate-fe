import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import type { TankResponse } from '@/api/generated/model'
import {
  TankmateCard,
  TankmateCardContent,
  TankmateCardHeader,
  TankmateCardTitle,
} from '@/components/custom/TankmateCard'
import { generateRoute } from '@/lib/constants'

export interface TankCardProps {
  tank: TankResponse
  onEdit: (tank: TankResponse) => void
}

export function TankCard({ tank, onEdit }: TankCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit(tank)
  }

  const formatTankType = (type?: string) => {
    if (!type) return 'Unknown'
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }

  const formatVolume = (volume?: number) => {
    if (!volume) return 'Unknown'
    return `${volume} gallons`
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit button overlay */}
      {isHovered && (
        <button
          onClick={handleEditClick}
          className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 border border-slate-200 cursor-pointer group"
          aria-label="Edit tank"
          type="button"
        >
          <Pencil className="h-4 w-4 text-slate-600 group-hover:text-slate-900" />
        </button>
      )}

      <Link to={generateRoute.tankDetail(tank.id!)}>
        <TankmateCard hoverable clickable className="tank-card" data-skeleton="tank-card">
          <TankmateCardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <TankmateCardTitle className="truncate">{tank.name}</TankmateCardTitle>
                <p className="text-sm text-slate-600 mt-1">
                  {formatTankType(tank.type)} • {formatVolume(tank.volume)}
                </p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                healthy
              </div>
            </div>
          </TankmateCardHeader>
          <TankmateCardContent>
            {tank.description && (
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{tank.description}</p>
            )}
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
    </div>
  )
}
