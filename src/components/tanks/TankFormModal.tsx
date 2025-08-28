import { useState, useEffect } from 'react'
import { useCreateTank, useUpdateTank } from '@/api/generated/tankmate'
import { CreateTankRequestType, UpdateTankRequestType } from '@/api/generated/model'
import type { CreateTankRequest, TankResponse, UpdateTankRequest } from '@/api/generated/model'
import { TankmateModal, TankmateModalFooter } from '@/components/custom/TankmateModal'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateInput } from '@/components/custom/TankmateInput'
import { TankmateSelect } from '@/components/custom/TankmateSelect'
import type { TankmateSelectOption } from '@/components/custom/TankmateSelect'
import { TankmateTextarea } from '@/components/custom/TankmateTextarea'
import { ButtonVariant } from '@/lib/constants'

export interface TankFormModalProps {
  isOpen: boolean
  onClose: () => void
  tank?: TankResponse
  onSuccess?: (tank: TankResponse) => void
}

interface FormData {
  name: string
  description: string
  volume: string
  type: CreateTankRequestType | UpdateTankRequestType | ''
}

interface FormErrors {
  name?: string
  description?: string
  volume?: string
  type?: string
  general?: string  // For general server errors
}

const tankTypeOptions: TankmateSelectOption[] = [
  { value: CreateTankRequestType.FRESHWATER, label: 'Freshwater' },
  { value: CreateTankRequestType.SALTWATER, label: 'Saltwater' },
]

export function TankFormModal({ isOpen, onClose, tank, onSuccess }: TankFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    volume: '',
    type: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const isEditing = Boolean(tank)

  // Populate form when editing
  useEffect(() => {
    if (tank) {
      setFormData({
        name: tank.name || '',
        description: tank.description || '',
        volume: tank.volume?.toString() || '',
        type: tank.type || '',
      })
    } else {
      setFormData({
        name: '',
        description: '',
        volume: '',
        type: '',
      })
    }
    setErrors({})
  }, [tank, isOpen])

  const handleApiError = (error: any) => {
    const newErrors: FormErrors = {}
    
    // Check if it's an Axios error with a response
    if (error?.response?.data) {
      const responseData = error.response.data
      
      // Handle validation errors from the API
      if (responseData.errors) {
        // Map field-specific errors
        if (responseData.errors.name) {
          newErrors.name = responseData.errors.name
        }
        if (responseData.errors.description) {
          newErrors.description = responseData.errors.description
        }
        if (responseData.errors.volume) {
          newErrors.volume = responseData.errors.volume
        }
        if (responseData.errors.type) {
          newErrors.type = responseData.errors.type
        }
      }
      
      // Handle general error message
      if (responseData.message) {
        newErrors.general = responseData.message
      }
      
      // Handle field violations (Spring Boot style)
      if (responseData.fieldErrors) {
        responseData.fieldErrors.forEach((fieldError: any) => {
          const field = fieldError.field as keyof FormErrors
          if (field in newErrors) {
            newErrors[field] = fieldError.message
          }
        })
      }
    } else if (error?.message) {
      // Fallback to generic error message
      newErrors.general = error.message
    } else {
      newErrors.general = 'An unexpected error occurred. Please try again.'
    }
    
    setErrors(newErrors)
  }

  const createTankMutation = useCreateTank({
    mutation: {
      onSuccess: (data) => {
        onSuccess?.(data as TankResponse)
        onClose()
        setFormData({ name: '', description: '', volume: '', type: '' })
        setErrors({})
      },
      onError: handleApiError,
    },
  })

  const updateTankMutation = useUpdateTank({
    mutation: {
      onSuccess: (data) => {
        onSuccess?.(data as TankResponse)
        onClose()
        setErrors({})
      },
      onError: handleApiError,
    },
  })

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Tank name is required'
    } else if (formData.name.length > 255) {
      newErrors.name = 'Tank name must be 255 characters or less'
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be 1000 characters or less'
    }

    if (!formData.volume.trim()) {
      newErrors.volume = 'Volume is required'
    } else {
      const volumeNum = parseFloat(formData.volume)
      if (isNaN(volumeNum)) {
        newErrors.volume = 'Volume must be a valid number'
      } else if (volumeNum <= 0) {
        newErrors.volume = 'Volume must be greater than 0'
      }
    }

    if (!formData.type) {
      newErrors.type = 'Tank type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const submitData = {
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      volume: parseFloat(formData.volume),
      type: formData.type as CreateTankRequestType | UpdateTankRequestType,
    }

    if (isEditing && tank) {
      updateTankMutation.mutate({
        id: tank.id!,
        data: submitData as UpdateTankRequest,
      })
    } else {
      createTankMutation.mutate({
        data: submitData as CreateTankRequest,
      })
    }
  }

  const handleClose = () => {
    if (!createTankMutation.isPending && !updateTankMutation.isPending) {
      onClose()
    }
  }

  const isLoading = createTankMutation.isPending || updateTankMutation.isPending

  return (
    <TankmateModal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditing ? 'Edit Tank' : 'Create New Tank'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Display general server errors at the top */}
        {errors.general && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">{errors.general}</p>
          </div>
        )}
        
        <TankmateInput
          label="Tank Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            // Clear error when user starts typing
            if (errors.name) {
              setErrors({ ...errors, name: undefined })
            }
          }}
          error={errors.name}
          placeholder="Enter tank name"
          maxLength={255}
          disabled={isLoading}
        />

        <TankmateTextarea
          label="Description"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value })
            // Clear error when user starts typing
            if (errors.description) {
              setErrors({ ...errors, description: undefined })
            }
          }}
          error={errors.description}
          placeholder="Optional description of your tank"
          maxLength={1000}
          rows={3}
          disabled={isLoading}
        />

        <TankmateInput
          label="Volume"
          type="number"
          value={formData.volume}
          onChange={(e) => {
            setFormData({ ...formData, volume: e.target.value })
            // Clear error when user starts typing
            if (errors.volume) {
              setErrors({ ...errors, volume: undefined })
            }
          }}
          error={errors.volume}
          placeholder="Tank volume in gallons"
          min="0.1"
          step="0.1"
          disabled={isLoading}
        />

        <TankmateSelect
          label="Tank Type"
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value as CreateTankRequestType })
            // Clear error when user starts typing
            if (errors.type) {
              setErrors({ ...errors, type: undefined })
            }
          }}
          error={errors.type}
          options={tankTypeOptions}
          placeholder="Select tank type"
          disabled={isLoading}
        />

        <TankmateModalFooter>
          <TankmateButton
            type="button"
            variant={ButtonVariant.OUTLINE}
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </TankmateButton>
          <TankmateButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            loading={isLoading}
          >
            {isEditing ? 'Update Tank' : 'Create Tank'}
          </TankmateButton>
        </TankmateModalFooter>
      </form>
    </TankmateModal>
  )
}