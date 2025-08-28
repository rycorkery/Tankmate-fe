import { CreateParameterRequestType } from '@/api/generated/model'

// Parameter configuration with colors matching the graph
const PARAMETER_CONFIG = {
  [CreateParameterRequestType.TEMP]: {
    label: 'Temperature',
    color: '#0891b2', // Ocean blue
    unit: '°F',
    shortLabel: 'TEMP',
  },
  [CreateParameterRequestType.PH]: {
    label: 'pH',
    color: '#7c3aed', // Purple
    unit: '',
    shortLabel: 'pH',
  },
  [CreateParameterRequestType.SALINITY]: {
    label: 'Salinity',
    color: '#dc2626', // Red
    unit: 'ppt',
    shortLabel: 'SAL',
  },
  [CreateParameterRequestType.NITRATE]: {
    label: 'Nitrate',
    color: '#ea580c', // Orange
    unit: 'ppm',
    shortLabel: 'NO3',
  },
  [CreateParameterRequestType.NITRITE]: {
    label: 'Nitrite',
    color: '#d97706', // Amber
    unit: 'ppm',
    shortLabel: 'NO2',
  },
  [CreateParameterRequestType.AMMONIA]: {
    label: 'Ammonia',
    color: '#65a30d', // Lime
    unit: 'ppm',
    shortLabel: 'NH3',
  },
  [CreateParameterRequestType.PHOSPHATE]: {
    label: 'Phosphate',
    color: '#059669', // Emerald
    unit: 'ppm',
    shortLabel: 'PO4',
  },
  [CreateParameterRequestType.KH]: {
    label: 'KH',
    color: '#0d9488', // Teal
    unit: 'dKH',
    shortLabel: 'KH',
  },
  [CreateParameterRequestType.GH]: {
    label: 'GH',
    color: '#1e40af', // Blue
    unit: 'dKH',
    shortLabel: 'GH',
  },
  [CreateParameterRequestType.DISSOLVED_OXYGEN]: {
    label: 'Dissolved O₂',
    color: '#be185d', // Pink
    unit: 'mg/L',
    shortLabel: 'O₂',
  },
  [CreateParameterRequestType.DISSOLVED_CO2]: {
    label: 'Dissolved CO₂',
    color: '#9333ea', // Violet
    unit: 'mg/L',
    shortLabel: 'CO₂',
  },
} as const

export interface Parameter {
  id: string
  type?: CreateParameterRequestType
  value: number
  recordedAt?: string
}

export interface ParameterBubblesProps {
  parameters: Parameter[]
}

interface GroupedParameters {
  [date: string]: Parameter[]
}

export function ParameterBubbles({ parameters }: ParameterBubblesProps) {
  // Group parameters by date
  const groupedParameters = parameters.reduce<GroupedParameters>((groups, param) => {
    if (!param.recordedAt) return groups

    const date = new Date(param.recordedAt).toISOString().split('T')[0]
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(param)
    return groups
  }, {})

  // Sort dates in descending order (most recent first)
  const sortedDates = Object.keys(groupedParameters).sort((a, b) => b.localeCompare(a))

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      return 'Today'
    } else if (diffInDays === 1) {
      return 'Yesterday'
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`
    } else {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }
      return date.toLocaleDateString(undefined, options)
    }
  }

  if (sortedDates.length === 0) {
    return <div className="text-center py-8 text-slate-600">No parameters recorded yet</div>
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date, dateIndex) => {
        const dayParameters = groupedParameters[date]

        return (
          <div key={date}>
            {/* Date header */}
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-sm font-semibold text-slate-700">{formatDate(date)}</h4>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent"></div>
            </div>

            {/* Parameter bubbles */}
            <div className="flex flex-wrap gap-2">
              {dayParameters.map((param) => {
                const config = param.type ? PARAMETER_CONFIG[param.type] : null

                if (!config) return null

                return (
                  <div
                    key={param.id}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-sm transition-transform hover:scale-105 cursor-default"
                    style={{ backgroundColor: config.color }}
                    title={`${config.label}: ${param.value} ${config.unit}`}
                  >
                    <span className="text-xs opacity-90 mr-1">{config.shortLabel}</span>
                    <span className="font-semibold">
                      {param.value} {config.unit}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Separator line between days (except for the last one) */}
            {dateIndex < sortedDates.length - 1 && (
              <div className="mt-6 border-b border-slate-100"></div>
            )}
          </div>
        )
      })}
    </div>
  )
}
