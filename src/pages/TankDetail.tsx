import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  useGetTankById, 
  useGetTankParameters, 
  useGetTankEvents, 
  useGetTankInhabitants 
} from '@/api/generated/tankmate'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateCard, TankmateCardContent, TankmateCardHeader, TankmateCardTitle } from '@/components/custom/TankmateCard'
import { ParameterInlineForm } from '@/components/tank-detail/ParameterInlineForm'
import { ParameterBubbles, type Parameter } from '@/components/tank-detail/ParameterBubbles'
import { EventFormModal } from '@/components/tank-detail/EventFormModal'
import { InhabitantFormModal } from '@/components/tank-detail/InhabitantFormModal'
import { ParameterTrends } from '@/components/tank-detail/ParameterTrends'
import { ButtonVariant, Routes } from '@/lib/constants'
import { useModal } from '@/hooks/useModal'

export function TankDetail() {
  const { id } = useParams<{ id: string }>()
  
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Tank not found</h1>
          <Link to={Routes.TANKS} className="text-brand-ocean hover:text-brand-ocean-dark">
            ← Back to Tanks
          </Link>
        </div>
      </div>
    )
  }

  // Pagination state for parameters
  const [parameterPage, setParameterPage] = useState(0)
  const [parameterSize] = useState(50) // Get more items per page to filter by days

  // API calls
  const { data: tank, isLoading: tankLoading, error: tankError } = useGetTankById(id)
  const { data: parametersData, isLoading: parametersLoading, refetch: refetchParameters } = useGetTankParameters(id, { 
    pageable: { page: parameterPage, size: parameterSize } 
  })
  const { data: eventsData, isLoading: eventsLoading, refetch: refetchEvents } = useGetTankEvents(id, { 
    pageable: { page: 0, size: 10 } 
  })
  const { data: inhabitantsData, isLoading: inhabitantsLoading, refetch: refetchInhabitants } = useGetTankInhabitants(id, { 
    pageable: { page: 0, size: 20 } 
  })

  // Map ParameterResponse to Parameter interface
  const allParameters: Parameter[] = (parametersData?.content || []).map(param => ({
    id: param.id || '',
    type: param.type as any, // The types should match but TypeScript needs this cast
    value: param.value || 0,
    recordedAt: param.recordedAt
  }))
  const events = eventsData?.content || []
  const inhabitants = inhabitantsData?.content || []

  // Group parameters by date and determine how many days to show
  const { parametersToShow, uniqueDaysCount, hasMoreDays } = useMemo(() => {
    if (allParameters.length === 0) return { parametersToShow: [], uniqueDaysCount: 0, hasMoreDays: false }
    
    // Group by date
    const grouped = allParameters.reduce<{[date: string]: Parameter[]}>((groups, param) => {
      if (!param.recordedAt) return groups
      const date = new Date(param.recordedAt).toISOString().split('T')[0]
      if (!groups[date]) groups[date] = []
      groups[date].push(param)
      return groups
    }, {})
    
    // Sort dates in descending order (most recent first)
    const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a))
    
    // Initially show 3 days, then add more as needed
    const baseDaysToShow = 3
    const additionalDays = parameterPage * 3 // Show 3 more days per page
    const totalDaysToShow = baseDaysToShow + additionalDays
    
    const datesToShow = sortedDates.slice(0, totalDaysToShow)
    const parametersToShow = datesToShow.flatMap(date => grouped[date])
    
    return {
      parametersToShow,
      uniqueDaysCount: datesToShow.length,
      hasMoreDays: sortedDates.length > totalDaysToShow
    }
  }, [allParameters, parameterPage])

  // Modal states
  const eventModal = useModal()
  const inhabitantModal = useModal()
  

  if (tankLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading tank details...</div>
      </div>
    )
  }

  if (tankError || !tank) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Tank not found</h1>
          <Link to={Routes.TANKS} className="text-brand-ocean hover:text-brand-ocean-dark">
            ← Back to Tanks
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-slate-900">{tank.name}</h1>
          {tank.description && (
            <p className="text-slate-600 mt-2 mb-3">{tank.description}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-ocean text-white">
              {tank.type === 'FRESHWATER' ? 'Freshwater' : tank.type === 'SALTWATER' ? 'Saltwater' : tank.type}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800">
              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2s-4 4.5-4 8a4 4 0 008 0c0-3.5-4-8-4-8z" clipRule="evenodd" />
              </svg>
              {tank.volume ? `${tank.volume} gal` : 'Volume not specified'}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800">
              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M9 12h6m-6 4h6m2-10V4m0 2-2-2m2 2l2-2" />
              </svg>
              30″×12″×12″
            </span>
          </div>
        </div>
      </div>

      {/* Tank Images and Graph Section */}
      <div className="grid gap-6 lg:grid-cols-3 mb-8">
        {/* Tank Images - Left Third */}
        <div className="lg:col-span-1">
          <TankmateCard className="h-full">
            <TankmateCardHeader>
              <TankmateCardTitle>Tank Photos</TankmateCardTitle>
            </TankmateCardHeader>
            <TankmateCardContent>
              <div className="relative aspect-square bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all duration-200 cursor-pointer group overflow-hidden">
                {/* Main image placeholder */}
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                
                {/* Date tooltip - bottom right */}
                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  Dec 15, 2024
                </div>
                
                {/* Navigation arrows - appear on hover */}
                <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <TankmateButton 
                variant={ButtonVariant.OUTLINE} 
                className="w-full mt-4"
              >
                Add Photos
              </TankmateButton>
            </TankmateCardContent>
          </TankmateCard>
        </div>

        {/* Graph - Right Two Thirds */}
        <div className="lg:col-span-2">
          <TankmateCard className="h-full">
            <TankmateCardHeader>
              <TankmateCardTitle>Parameter Trends</TankmateCardTitle>
            </TankmateCardHeader>
            <TankmateCardContent className="flex-1 flex flex-col">
              <ParameterTrends tankId={id} />
            </TankmateCardContent>
          </TankmateCard>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inhabitants */}
        <TankmateCard>
          <TankmateCardHeader>
            <TankmateCardTitle>Inhabitants</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent>
            {inhabitantsLoading ? (
              <div className="text-center py-4 text-slate-600">Loading inhabitants...</div>
            ) : inhabitants.length === 0 ? (
              <div className="text-center py-4 text-slate-600">
                No inhabitants added yet
              </div>
            ) : (
              <div className="space-y-3">
                {inhabitants.map((inhabitant) => (
                  <div key={inhabitant.id}>
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{inhabitant.name}</div>
                      <div className="text-slate-600">x{inhabitant.quantity || 1}</div>
                    </div>
                    <div className="text-xs text-slate-500 capitalize">{inhabitant.type?.toLowerCase()}</div>
                  </div>
                ))}
              </div>
            )}
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="w-full mt-4"
              onClick={inhabitantModal.openModal}
            >
              Add Inhabitant
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>

        {/* Water Parameters */}
        <TankmateCard className="flex flex-col">
          <TankmateCardHeader>
            <TankmateCardTitle>Water Parameters</TankmateCardTitle>
          </TankmateCardHeader>
          <TankmateCardContent className="flex-1 flex flex-col">
            <div className="flex-1">
              {parametersLoading ? (
                <div className="text-center py-4 text-slate-600">Loading parameters...</div>
              ) : parametersToShow.length === 0 ? (
                <div className="text-center py-4 text-slate-600">
                  No parameters recorded yet
                </div>
              ) : (
                <>
                  <ParameterBubbles parameters={parametersToShow} />
                  {hasMoreDays && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <div className="flex gap-2">
                        <TankmateButton
                          variant={ButtonVariant.OUTLINE}
                          size="sm"
                          onClick={() => setParameterPage(prev => prev + 1)}
                          disabled={parametersLoading}
                          className="flex-1"
                        >
                          Load More Days ({uniqueDaysCount} days shown)
                        </TankmateButton>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Always visible parameter form */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <ParameterInlineForm
                tankId={id}
                onSuccess={() => {
                  refetchParameters()
                  setParameterPage(0) // Reset to show latest parameters
                }}
              />
            </div>
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
            {eventsLoading ? (
              <div className="text-center py-4 text-slate-600">Loading activities...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-4 text-slate-600">
                No activities recorded yet
              </div>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div>
                      <div className="font-medium capitalize">
                        {event.type?.toLowerCase().replace('_', ' ')} 
                      </div>
                      <div className="text-sm text-slate-600">{event.details || 'No details'}</div>
                    </div>
                    <div className="text-sm text-slate-500">
                      {event.occurredAt ? formatDate(event.occurredAt) : 'Unknown date'}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <TankmateButton 
              variant={ButtonVariant.OUTLINE} 
              className="w-full mt-4"
              onClick={eventModal.openModal}
            >
              Log Activity
            </TankmateButton>
          </TankmateCardContent>
        </TankmateCard>
      </div>

      {/* Modals */}
      <EventFormModal
        isOpen={eventModal.isOpen}
        onClose={eventModal.closeModal}
        tankId={id}
        onSuccess={() => {
          refetchEvents()
        }}
      />
      
      <InhabitantFormModal
        isOpen={inhabitantModal.isOpen}
        onClose={inhabitantModal.closeModal}
        tankId={id}
        onSuccess={() => {
          refetchInhabitants()
        }}
      />
    </div>
  )
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInDays === 0) {
    return 'Today'
  } else if (diffInDays === 1) {
    return '1 day ago'
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString()
  }
}