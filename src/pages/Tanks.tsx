import { useState } from 'react'
import { useGetUserTanks } from '@/api/generated/tankmate'
import type { TankResponse } from '@/api/generated/model'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankCard } from '@/components/tanks/TankCard'
import { TankFormModal } from '@/components/tanks/TankFormModal'
import { TankGridSkeleton } from '@/components/tanks/TankSkeletons'
import { useModal } from '@/hooks/useModal'
import { ButtonVariant } from '@/lib/constants'

export function Tanks() {
  const [editingTank, setEditingTank] = useState<TankResponse | undefined>()
  const createModal = useModal()
  const editModal = useModal()

  const {
    data: tanksData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetUserTanks({
    pageable: {
      page: 0,
      size: 20,
    },
  })
  const tanks = tanksData?.content || []

  // Use isFetching or check if data hasn't loaded yet
  const isLoadingTanks = isLoading || isFetching || (tanksData === undefined && !error)

  const handleCreateSuccess = () => {
    refetch()
  }

  const handleEditSuccess = () => {
    refetch()
  }

  const handleEdit = (tank: TankResponse) => {
    setEditingTank(tank)
    editModal.openModal()
  }

  const handleCloseEditModal = () => {
    editModal.closeModal()
    setEditingTank(undefined)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-slate-900">Something went wrong</p>
            <p className="mt-2 text-sm text-slate-600">
              {(error as Error)?.message || 'Failed to load tanks'}
            </p>
            <TankmateButton
              variant={ButtonVariant.OUTLINE}
              onClick={() => refetch()}
              className="mt-4"
            >
              Try Again
            </TankmateButton>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Tanks</h1>
          <p className="text-slate-600">Manage and monitor your aquariums</p>
        </div>
        <TankmateButton
          variant={ButtonVariant.DEFAULT}
          onClick={createModal.openModal}
          disabled={isLoadingTanks}
        >
          Add New Tank
        </TankmateButton>
      </div>

      {isLoadingTanks ? (
        <TankGridSkeleton count={6} />
      ) : tanks.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-slate-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No tanks yet</h3>
          <p className="text-slate-600 mb-6">Get started by adding your first aquarium</p>
          <TankmateButton variant={ButtonVariant.DEFAULT} onClick={createModal.openModal}>
            Add Your First Tank
          </TankmateButton>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tanks.map((tank) => (
            <TankCard key={tank.id} tank={tank} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Create Tank Modal */}
      <TankFormModal
        isOpen={createModal.isOpen}
        onClose={createModal.closeModal}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit Tank Modal */}
      <TankFormModal
        isOpen={editModal.isOpen}
        onClose={handleCloseEditModal}
        tank={editingTank}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}
