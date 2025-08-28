import { useState, useEffect } from 'react'
import { useCreateInhabitant } from '@/api/generated/tankmate'
import { CreateInhabitantRequestType } from '@/api/generated/model'
import type { CreateInhabitantRequest } from '@/api/generated/model'
import { TankmateModal, TankmateModalFooter } from '@/components/custom/TankmateModal'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateInput } from '@/components/custom/TankmateInput'
import { TankmateSelect } from '@/components/custom/TankmateSelect'
import type { TankmateSelectOption } from '@/components/custom/TankmateSelect'
import { ButtonVariant } from '@/lib/constants'

export interface InhabitantFormModalProps {
  isOpen: boolean
  onClose: () => void
  tankId: string
  onSuccess?: () => void
}

interface FormData {
  name: string
  quantity: string
  type: CreateInhabitantRequestType | ''
  identifiedInhabitantId: string
}

interface FormErrors {
  name?: string
  quantity?: string
  type?: string
  identifiedInhabitantId?: string
  general?: string
}

const inhabitantTypeOptions: TankmateSelectOption[] = [
  { value: CreateInhabitantRequestType.ANIMAL, label: 'Animal (Fish, Shrimp, etc.)' },
  { value: CreateInhabitantRequestType.PLANT, label: 'Plant' },
  { value: CreateInhabitantRequestType.OTHER, label: 'Other' },
]

export function InhabitantFormModal({ isOpen, onClose, tankId, onSuccess }: InhabitantFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    quantity: '1',
    type: '',
    identifiedInhabitantId: '',
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  const createInhabitantMutation = useCreateInhabitant({
    mutation: {
      onSuccess: () => {
        onSuccess?.()
        onClose()
      },
      onError: (error: any) => {
        console.error('Failed to create inhabitant:', error)
        setErrors({ general: 'Failed to create inhabitant. Please try again.' })
      },
    },
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        quantity: '1',
        type: '',
        identifiedInhabitantId: '',
      })
      setErrors({})
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length > 255) {
      newErrors.name = 'Name must be 255 characters or less'
    }

    if (!formData.quantity.trim()) {
      newErrors.quantity = 'Quantity is required'
    } else {
      const quantityNum = parseInt(formData.quantity)
      if (isNaN(quantityNum) || quantityNum < 1) {
        newErrors.quantity = 'Quantity must be at least 1'
      }
    }

    if (!formData.type) {
      newErrors.type = 'Type is required'
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

    const submitData: CreateInhabitantRequest = {
      name: formData.name.trim(),
      quantity: parseInt(formData.quantity),
      type: formData.type as CreateInhabitantRequestType,
      identifiedInhabitantId: formData.identifiedInhabitantId || undefined,
    }

    createInhabitantMutation.mutate({
      tankId,
      data: submitData,
    })
  }

  const getNamePlaceholder = (type: string): string => {
    switch (type) {
      case 'ANIMAL': return 'e.g., Neon Tetra, Cherry Shrimp'
      case 'PLANT': return 'e.g., Java Fern, Amazon Sword'
      case 'OTHER': return 'e.g., Snail, Coral'
      default: return 'Enter inhabitant name'
    }
  }

  const handleClose = () => {
    if (!createInhabitantMutation.isPending) {
      onClose()
    }
  }

  return (
    <TankmateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Tank Inhabitant"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Display general server errors at the top */}
        {errors.general && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">{errors.general}</p>
          </div>
        )}
        
        <TankmateSelect
          label="Type"
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value as CreateInhabitantRequestType | '' })
            if (errors.type) {
              setErrors({ ...errors, type: undefined })
            }
          }}
          error={errors.type}
          options={inhabitantTypeOptions}
          placeholder="Select inhabitant type"
        />

        <TankmateInput
          label="Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            if (errors.name) {
              setErrors({ ...errors, name: undefined })
            }
          }}
          error={errors.name}
          placeholder={getNamePlaceholder(formData.type)}
          maxLength={255}
        />

        <TankmateInput
          label="Quantity"
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) => {
            setFormData({ ...formData, quantity: e.target.value })
            if (errors.quantity) {
              setErrors({ ...errors, quantity: undefined })
            }
          }}
          error={errors.quantity}
          placeholder="How many?"
          helperText="Number of individuals (for schooling fish, plants, etc.)"
        />

        <TankmateModalFooter>
          <TankmateButton
            type="button"
            variant={ButtonVariant.OUTLINE}
            onClick={handleClose}
            disabled={createInhabitantMutation.isPending}
          >
            Cancel
          </TankmateButton>
          <TankmateButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            loading={createInhabitantMutation.isPending}
          >
            Save
          </TankmateButton>
        </TankmateModalFooter>
      </form>
    </TankmateModal>
  )
}