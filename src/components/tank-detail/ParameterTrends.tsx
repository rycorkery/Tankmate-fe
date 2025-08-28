import { useState, useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { CreateParameterRequestType } from '@/api/generated/model/createParameterRequestType'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface ParameterDataPoint {
  date: string
  value: number
  type: CreateParameterRequestType
}

interface ParameterTrendsProps {
  tankId: string
}

type DateRange = '7d' | '30d' | '90d'

const DATE_RANGES: { value: DateRange; label: string; days: number }[] = [
  { value: '7d', label: '7 Days', days: 7 },
  { value: '30d', label: '30 Days', days: 30 },
  { value: '90d', label: '90 Days', days: 90 },
]

// Parameter configuration with colors and y-axis ranges
const PARAMETER_CONFIG = {
  [CreateParameterRequestType.TEMP]: {
    label: 'Temperature',
    color: '#0891b2', // Ocean blue
    yAxisRange: { min: 65, max: 85 },
    unit: '°F',
    active: true,
  },
  [CreateParameterRequestType.PH]: {
    label: 'pH',
    color: '#7c3aed', // Purple
    yAxisRange: { min: 0, max: 14 },
    unit: '',
    active: true,
  },
  [CreateParameterRequestType.SALINITY]: {
    label: 'Salinity',
    color: '#dc2626', // Red
    yAxisRange: { min: 30, max: 40 },
    unit: 'ppt',
    active: true,
  },
  [CreateParameterRequestType.NITRATE]: {
    label: 'Nitrate',
    color: '#ea580c', // Orange
    yAxisRange: { min: 0, max: 50 },
    unit: 'ppm',
    active: true,
  },
  [CreateParameterRequestType.NITRITE]: {
    label: 'Nitrite',
    color: '#d97706', // Amber
    yAxisRange: { min: 0, max: 5 },
    unit: 'ppm',
    active: true,
  },
  [CreateParameterRequestType.AMMONIA]: {
    label: 'Ammonia',
    color: '#65a30d', // Lime
    yAxisRange: { min: 0, max: 4 },
    unit: 'ppm',
    active: true,
  },
  [CreateParameterRequestType.PHOSPHATE]: {
    label: 'Phosphate',
    color: '#059669', // Emerald
    yAxisRange: { min: 0, max: 2 },
    unit: 'ppm',
    active: true,
  },
  [CreateParameterRequestType.KH]: {
    label: 'KH',
    color: '#0d9488', // Teal
    yAxisRange: { min: 0, max: 20 },
    unit: 'dKH',
    active: true,
  },
  [CreateParameterRequestType.GH]: {
    label: 'GH',
    color: '#1e40af', // Blue
    yAxisRange: { min: 0, max: 25 },
    unit: 'dKH',
    active: true,
  },
  [CreateParameterRequestType.DISSOLVED_OXYGEN]: {
    label: 'Dissolved O₂',
    color: '#be185d', // Pink
    yAxisRange: { min: 0, max: 15 },
    unit: 'mg/L',
    active: true,
  },
  [CreateParameterRequestType.DISSOLVED_CO2]: {
    label: 'Dissolved CO₂',
    color: '#9333ea', // Violet
    yAxisRange: { min: 0, max: 30 },
    unit: 'mg/L',
    active: true,
  },
} as const

// Generate dummy data for demonstration
function generateDummyData(days: number = 30): ParameterDataPoint[] {
  const data: ParameterDataPoint[] = []
  const now = new Date()
  
  // Generate data for the specified number of days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split('T')[0]
    
    // Add some data points for each parameter (not all parameters every day)
    if (Math.random() > 0.3) { // 70% chance of having temp data
      data.push({
        date: dateString,
        type: CreateParameterRequestType.TEMP,
        value: 75 + Math.random() * 6 + Math.sin(i * 0.1) * 2, // 75-81°F with some variation
      })
    }
    
    if (Math.random() > 0.5) { // 50% chance of having pH data
      data.push({
        date: dateString,
        type: CreateParameterRequestType.PH,
        value: 8.0 + Math.random() * 0.6 + Math.sin(i * 0.15) * 0.2, // 8.0-8.6 pH
      })
    }
    
    if (Math.random() > 0.6) { // 40% chance of having nitrate data
      data.push({
        date: dateString,
        type: CreateParameterRequestType.NITRATE,
        value: 10 + Math.random() * 15 + Math.sin(i * 0.2) * 3, // 10-25 ppm
      })
    }
    
    if (Math.random() > 0.7) { // 30% chance of having nitrite data
      data.push({
        date: dateString,
        type: CreateParameterRequestType.NITRITE,
        value: 0.1 + Math.random() * 1.5, // 0.1-1.6 ppm
      })
    }
    
    if (Math.random() > 0.8) { // 20% chance of having ammonia data
      data.push({
        date: dateString,
        type: CreateParameterRequestType.AMMONIA,
        value: Math.random() * 0.5, // 0-0.5 ppm
      })
    }
    
    if (Math.random() > 0.9) { // 10% chance of having salinity data (for saltwater tanks)
      data.push({
        date: dateString,
        type: CreateParameterRequestType.SALINITY,
        value: 35 + Math.random() * 2, // 35-37 ppt
      })
    }
  }
  
  return data
}

export function ParameterTrends({ tankId }: ParameterTrendsProps) {
  const [dateRange, setDateRange] = useState<DateRange>('30d')
  const [hoveredParameter, setHoveredParameter] = useState<CreateParameterRequestType | null>(null)
  const [legendHovered, setLegendHovered] = useState<CreateParameterRequestType | null>(null)
  
  // Use dummy data for now
  const dummyData = useMemo(() => {
    const days = DATE_RANGES.find(r => r.value === dateRange)?.days || 30
    return generateDummyData(days)
  }, [tankId, dateRange])

  const [activeParameters, setActiveParameters] = useState<Record<CreateParameterRequestType, boolean>>(() =>
    Object.keys(PARAMETER_CONFIG).reduce((acc, key) => {
      const paramKey = key as CreateParameterRequestType
      // For parameters with no data, default to inactive
      const hasData = generateDummyData().some(point => point.type === paramKey)
      acc[paramKey] = hasData && PARAMETER_CONFIG[paramKey].active
      return acc
    }, {} as Record<CreateParameterRequestType, boolean>)
  )

  // Process data for chart
  const chartData = useMemo(() => {
    // Get unique dates and sort them
    const dates = Array.from(new Set(dummyData.map(point => point.date))).sort()
    
    // Smart date labeling based on range
    const days = DATE_RANGES.find(r => r.value === dateRange)?.days || 30
    const labelDates = dates.filter((_, index) => {
      if (days <= 7) return true // Show all for 7 days
      if (days <= 30) return index % 2 === 0 // Show every other for 30 days  
      return index % 7 === 0 // Show weekly for 90 days
    })
    
    const shortDates = dates.map((date) => {
      const d = new Date(date)
      const shouldShow = labelDates.includes(date)
      return shouldShow ? `${d.getMonth() + 1}/${d.getDate()}` : ''
    })

    // Create datasets for each parameter
    const datasets = Object.entries(PARAMETER_CONFIG)
      .filter(([type]) => activeParameters[type as CreateParameterRequestType])
      .map(([type, config]) => {
        const paramType = type as CreateParameterRequestType
        const paramData = dummyData.filter(point => point.type === paramType)
        
        // Normalize each parameter to 0-1 scale based on its expected range
        const { min, max } = config.yAxisRange
        const normalizedData = dates.map(date => {
          const point = paramData.find(p => p.date === date)
          if (!point) return null
          // Normalize to 0-1 scale
          return (point.value - min) / (max - min)
        })

        const isHovered = hoveredParameter === paramType || legendHovered === paramType
        const opacity = (hoveredParameter || legendHovered) && !isHovered ? 0.3 : 1

        return {
          label: config.label,
          data: normalizedData,
          borderColor: config.color,
          backgroundColor: config.color, // Solid fill for points
          borderWidth: isHovered ? 3 : 2,
          pointRadius: 5, // Always show filled circles
          pointHoverRadius: 8,
          pointBackgroundColor: config.color, // Filled circles
          pointBorderColor: config.color,
          pointBorderWidth: 0,
          tension: 0.3, // Smooth curves
          fill: false,
          spanGaps: true, // Connect points even with gaps
          opacity,
          // Store original data for tooltips
          originalData: dates.map(date => {
            const point = paramData.find(p => p.date === date)
            return point ? point.value : null
          }),
          // Store parameter type for hover detection
          parameterType: paramType,
        }
      })

    return {
      labels: shortDates,
      datasets,
    }
  }, [dummyData, activeParameters, hoveredParameter, legendHovered, dateRange])

  // Chart options
  const options: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    animation: false, // Remove animations for parameter toggling
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // We'll create our own legend
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1e293b',
        bodyColor: '#64748b',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const dataset = context.dataset as any
            const originalValue = dataset.originalData?.[context.dataIndex]
            const config = Object.values(PARAMETER_CONFIG).find(c => c.label === context.dataset.label)
            if (originalValue === null || originalValue === undefined) return ''
            return `${context.dataset.label}: ${originalValue.toFixed(2)} ${config?.unit || ''}`
          }
        }
      },
    },
    layout: {
      padding: {
        left: 60, // Reserve space for left y-axis to prevent movement
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f1f5f9',
          lineWidth: 1,
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12,
          },
          maxTicksLimit: dateRange === '7d' ? 7 : dateRange === '30d' ? 15 : 13,
        },
      },
      y: {
        min: 0,
        max: 1,
        position: 'left', // Position y-axis on the left
        grid: {
          color: '#f1f5f9',
          lineWidth: 1,
        },
        ticks: {
          display: !!hoveredParameter, // Show ticks when hovered
          color: '#64748b',
          font: {
            size: 11,
          },
          callback: function(tickValue: string | number) {
            if (!hoveredParameter) return ''
            const config = PARAMETER_CONFIG[hoveredParameter]
            const normalizedValue = Number(tickValue)
            const originalValue = normalizedValue * (config.yAxisRange.max - config.yAxisRange.min) + config.yAxisRange.min
            return originalValue.toFixed(0)
          },
          stepSize: 0.25, // Show 4 ticks (0, 0.25, 0.5, 0.75, 1)
        },
        display: true, // Always display the axis to prevent layout shift
        title: {
          display: !!hoveredParameter,
          text: hoveredParameter ? `${PARAMETER_CONFIG[hoveredParameter].label} (${PARAMETER_CONFIG[hoveredParameter].unit})` : '',
          color: '#64748b',
          font: {
            size: 12,
            weight: 'normal',
          },
        },
      },
    },
    onHover: (_, activeElements) => {
      if (activeElements.length > 0) {
        const datasetIndex = activeElements[0].datasetIndex
        const dataset = chartData.datasets[datasetIndex] as any
        const paramType = dataset.parameterType as CreateParameterRequestType
        setHoveredParameter(paramType)
      } else {
        setHoveredParameter(null)
      }
    },
  }), [hoveredParameter, chartData, dateRange])

  const toggleParameter = (paramType: CreateParameterRequestType) => {
    setActiveParameters(prev => ({
      ...prev,
      [paramType]: !prev[paramType]
    }))
  }

  const handleLegendHover = (paramType: CreateParameterRequestType) => {
    setLegendHovered(paramType)
  }

  const handleLegendLeave = () => {
    setLegendHovered(null)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Date Range Picker */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
          {DATE_RANGES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setDateRange(value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                dateRange === value
                  ? 'bg-white text-brand-ocean shadow-sm'
                  : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        
        {/* Show scale info on hover */}
        {hoveredParameter && (
          <div className="text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg">
            <span className="font-medium" style={{ color: PARAMETER_CONFIG[hoveredParameter].color }}>
              {PARAMETER_CONFIG[hoveredParameter].label}
            </span>
            {` (${PARAMETER_CONFIG[hoveredParameter].yAxisRange.min}–${PARAMETER_CONFIG[hoveredParameter].yAxisRange.max} ${PARAMETER_CONFIG[hoveredParameter].unit})`}
          </div>
        )}
      </div>
      
      {/* Chart container */}
      <div className="bg-white rounded-lg" style={{ height: '300px' }}>
        <div className="h-full p-4">
          <Line data={chartData} options={options} />
        </div>
      </div>
      
      {/* Legend - fixed at bottom */}
      <div className="mt-4 px-2">
        <div className="flex flex-wrap gap-2">
          {Object.entries(PARAMETER_CONFIG).map(([type, config]) => {
            const paramType = type as CreateParameterRequestType
            const hasData = dummyData.some(point => point.type === paramType)
            const isActive = activeParameters[paramType]
            const isHovered = legendHovered === paramType
            
            return (
              <button
                key={paramType}
                onClick={() => hasData && toggleParameter(paramType)}
                onMouseEnter={() => hasData && handleLegendHover(paramType)}
                onMouseLeave={handleLegendLeave}
                disabled={!hasData}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                  ${hasData 
                    ? 'cursor-pointer hover:bg-slate-100' 
                    : 'cursor-not-allowed opacity-40'
                  }
                  ${isActive ? '' : 'opacity-60'}
                  ${isHovered ? 'bg-slate-50 scale-105' : ''}
                `}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    isHovered ? 'scale-125' : ''
                  }`}
                  style={{
                    backgroundColor: isActive ? config.color : '#e2e8f0',
                    border: `2px solid ${config.color}`,
                  }}
                />
                <span className={isActive ? 'text-slate-800' : 'text-slate-500'}>
                  {config.label}
                </span>
                {!hasData && (
                  <span className="text-xs text-slate-400">(no data)</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}