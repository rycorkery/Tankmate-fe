import { useState, useEffect } from 'react'
import { useRecordParameter } from '@/api/generated/tankmate'
import { CreateParameterRequestType } from '@/api/generated/model'
import type { CreateParameterRequest } from '@/api/generated/model'
import { TankmateModal, TankmateModalFooter } from '@/components/custom/TankmateModal'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateInput } from '@/components/custom/TankmateInput'
import { TankmateSelect } from '@/components/custom/TankmateSelect'
import { TankmateDate } from '@/components/custom/TankmateDate'
import type { TankmateSelectOption } from '@/components/custom/TankmateSelect'
import { ButtonVariant } from '@/lib/constants'

export interface ParameterFormModalProps {
  isOpen: boolean
  onClose: () => void
  tankId: string
  onSuccess?: () => void
}

interface FormData {
  type: CreateParameterRequestType | ''
  value: string
  recordedAt: string
}

interface FormErrors {
  type?: string
  value?: string
  recordedAt?: string
  general?: string
}

const parameterTypeOptions: TankmateSelectOption[] = [
  { value: CreateParameterRequestType.TEMP, label: 'Temperature' },
  { value: CreateParameterRequestType.PH, label: 'pH' },
  { value: CreateParameterRequestType.SALINITY, label: 'Salinity' },
  { value: CreateParameterRequestType.NITRATE, label: 'Nitrate' },
  { value: CreateParameterRequestType.NITRITE, label: 'Nitrite' },
  { value: CreateParameterRequestType.AMMONIA, label: 'Ammonia' },
  { value: CreateParameterRequestType.PHOSPHATE, label: 'Phosphate' },
  { value: CreateParameterRequestType.KH, label: 'KH (Alkalinity)' },
  { value: CreateParameterRequestType.GH, label: 'GH (Hardness)' },
  { value: CreateParameterRequestType.DISSOLVED_OXYGEN, label: 'Dissolved Oxygen' },
  { value: CreateParameterRequestType.DISSOLVED_CO2, label: 'Dissolved CO2' },
]

export function ParameterFormModal({ isOpen, onClose, tankId, onSuccess }: ParameterFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    type: '',
    value: '',
    recordedAt: new Date().toISOString().slice(0, 10), // Current date in YYYY-MM-DD format
  })
  
  const [errors, setErrors] = useState<FormErrors>({})

  const recordParameterMutation = useRecordParameter({
    mutation: {
      onSuccess: () => {
        onSuccess?.()
        onClose()
      },
      onError: (error: any) => {
        console.error('Failed to create parameter:', error)
        setErrors({ general: 'Failed to create parameter. Please try again.' })
      },
    },
  })

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        type: '',
        value: '',
        recordedAt: new Date().toISOString().slice(0, 10),
      })
      setErrors({})
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.type) {
      newErrors.type = 'Parameter type is required'
    }

    if (!formData.value.trim()) {
      newErrors.value = 'Value is required'
    } else {
      const valueNum = parseFloat(formData.value)
      if (isNaN(valueNum)) {
        newErrors.value = 'Value must be a valid number'
      }
    }

    if (!formData.recordedAt) {
      newErrors.recordedAt = 'Date is required'
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

    const submitData: CreateParameterRequest = {
      type: formData.type as CreateParameterRequestType,
      value: parseFloat(formData.value),
      recordedAt: new Date(formData.recordedAt).toISOString(),
    }

    recordParameterMutation.mutate({
      tankId,
      data: submitData,
    })
  }

  const getValuePlaceholder = (type: string): string => {
    switch (type) {
      case 'TEMP': return 'e.g., 78'
      case 'PH': return 'e.g., 7.2'
      case 'SALINITY': return 'e.g., 35'
      case 'NITRATE':
      case 'NITRITE':
      case 'AMMONIA':
      case 'PHOSPHATE': return 'e.g., 0.5'
      case 'KH':
      case 'GH': return 'e.g., 8'
      case 'DISSOLVED_OXYGEN':
      case 'DISSOLVED_CO2': return 'e.g., 6.5'
      default: return 'Enter value'
    }
  }

  const handleClose = () => {
    if (!recordParameterMutation.isPending) {
      onClose()
    }
  }

  return (
    <TankmateModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Log Water Parameters"
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
          label="Parameter Type"
          value={formData.type}
          onChange={(e) => {
            setFormData({ ...formData, type: e.target.value as CreateParameterRequestType | '' })
            if (errors.type) {
              setErrors({ ...errors, type: undefined })
            }
          }}
          error={errors.type}
          options={parameterTypeOptions}
          placeholder="Select parameter type"
        />

        <TankmateInput
          label="Value"
          type="number"
          step="0.1"
          value={formData.value}
          onChange={(e) => {
            setFormData({ ...formData, value: e.target.value })
            if (errors.value) {
              setErrors({ ...errors, value: undefined })
            }
          }}
          error={errors.value}
          placeholder={getValuePlaceholder(formData.type)}
        />

        <TankmateDate
          label="Date"
          value={formData.recordedAt}
          onChange={(value) => {
            setFormData({ ...formData, recordedAt: value })
            if (errors.recordedAt) {
              setErrors({ ...errors, recordedAt: undefined })
            }
          }}
          error={errors.recordedAt}
        />

        <TankmateModalFooter>
          <TankmateButton
            type="button"
            variant={ButtonVariant.OUTLINE}
            onClick={handleClose}
            disabled={recordParameterMutation.isPending}
          >
            Cancel
          </TankmateButton>
          <TankmateButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            loading={recordParameterMutation.isPending}
          >
            Save
          </TankmateButton>
        </TankmateModalFooter>
      </form>
    </TankmateModal>
  )
}