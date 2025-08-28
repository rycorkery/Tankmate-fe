import { useState, useEffect } from 'react'
import { useCreateEvent } from '@/api/generated/tankmate'
import { CreateEventRequestType } from '@/api/generated/model'
import type { CreateEventRequest } from '@/api/generated/model'
import { TankmateModal, TankmateModalFooter } from '@/components/custom/TankmateModal'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateSelect } from '@/components/custom/TankmateSelect'
import { TankmateTextarea } from '@/components/custom/TankmateTextarea'
import { TankmateDate } from '@/components/custom/TankmateDate'
import type { TankmateSelectOption } from '@/components/custom/TankmateSelect'
import { ButtonVariant } from '@/lib/constants'

export interface EventFormModalProps {
  isOpen: boolean
  onClose: () => void
  tankId: string
  onSuccess?: () => void
}

interface FormData {
  type: CreateEventRequestType | ''
  details: string
  occurredAt: string
}

interface FormErrors {
  type?: string
  details?: string
  occurredAt?: string
  general?: string
}

const eventTypeOptions: TankmateSelectOption[] = [
  { value: CreateEventRequestType.FEEDING, label: 'Feeding' },
  { value: CreateEventRequestType.WATER_CHANGE, label: 'Water Change' },
  { value: CreateEventRequestType.ALGAE_BLOOM, label: 'Algae Bloom' },
  { value: CreateEventRequestType.FILTER_CLEANING, label: 'Filter Cleaning' },
  { value: CreateEventRequestType.LIGHT_ADJUSTMENT, label: 'Light Adjustment' },
  { value: CreateEventRequestType.TEMPERATURE_ADJUSTMENT, label: 'Temperature Adjustment' },
  { value: CreateEventRequestType.OTHER, label: 'Other' },
]

export function EventFormModal({ isOpen, onClose, tankId, onSuccess }: EventFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    type: '',
    details: '',
    occurredAt: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const createEventMutation = useCreateEvent({
    mutation: {
      onSuccess: () => {
        onSuccess?.()
        onClose()
      },
      onError: (error: unknown) => {
        console.error('Failed to create event:', error)
        setErrors({ general: 'Failed to create event. Please try again.' })
      },
    },
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: '',
        details: '',
        occurredAt: new Date().toISOString().slice(0, 10),
      })
      setErrors({})
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.type) {
      newErrors.type = 'Event type is required'
    }

    if (!formData.occurredAt) {
      newErrors.occurredAt = 'Date is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors as FormErrors)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submitData: CreateEventRequest = {
      type: formData.type as CreateEventRequestType,
      details: formData.details.trim() || undefined,
      occurredAt: new Date(formData.occurredAt).toISOString(),
    }

    createEventMutation.mutate({
      tankId,
      data: submitData,
    })
  }

  const getDetailsPlaceholder = (type: string): string => {
    switch (type) {
      case 'FEEDING':
        return 'e.g., Fed flakes and bloodworms'
      case 'WATER_CHANGE':
        return 'e.g., 25% water change'
      case 'ALGAE_BLOOM':
        return 'e.g., Green algae bloom noticed on glass'
      case 'FILTER_CLEANING':
        return 'e.g., Cleaned canister filter media'
      case 'LIGHT_ADJUSTMENT':
        return 'e.g., Reduced light intensity to 70%'
      case 'TEMPERATURE_ADJUSTMENT':
        return 'e.g., Increased temperature to 78°F'
      case 'OTHER':
        return 'Describe what happened...'
      default:
        return 'Add details about this event...'
    }
  }

  const handleClose = () => {
    if (!createEventMutation.isPending) {
      onClose()
    }
  }

  return (
    <TankmateModal isOpen={isOpen} onClose={handleClose} title="Log Tank Activity" size="md">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Display general server errors at the top */}
        {errors.general && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">{errors.general}</p>
          </div>
        )}

        <TankmateSelect
          label="Activity Type"
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value as CreateEventRequestType | '' })
            if (errors.type) {
              setErrors({ ...errors, type: undefined })
            }
          }}
          error={errors.type}
          options={eventTypeOptions}
          placeholder="Select activity type"
        />

        <TankmateDate
          label="Date"
          value={formData.occurredAt}
          onChange={(value) => {
            setFormData({ ...formData, occurredAt: value })
            if (errors.occurredAt) {
              setErrors({ ...errors, occurredAt: undefined })
            }
          }}
          error={errors.occurredAt}
        />

        <TankmateTextarea
          label="Details"
          value={formData.details}
          onChange={(e) => {
            setFormData({ ...formData, details: e.target.value })
            if (errors.details) {
              setErrors({ ...errors, details: undefined })
            }
          }}
          error={errors.details}
          placeholder={getDetailsPlaceholder(formData.type)}
          rows={3}
          helperText="Optional: Add any additional details about this activity"
        />

        <TankmateModalFooter>
          <TankmateButton
            type="button"
            variant={ButtonVariant.OUTLINE}
            onClick={handleClose}
            disabled={createEventMutation.isPending}
          >
            Cancel
          </TankmateButton>
          <TankmateButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            loading={createEventMutation.isPending}
          >
            Save
          </TankmateButton>
        </TankmateModalFooter>
      </form>
    </TankmateModal>
  )
}
