import { useState } from 'react'
import { useRecordParameter } from '@/api/generated/tankmate'
import { CreateParameterRequestType } from '@/api/generated/model'
import type { CreateParameterRequest } from '@/api/generated/model'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { TankmateInput } from '@/components/custom/TankmateInput'
import { TankmateSelect } from '@/components/custom/TankmateSelect'
import type { TankmateSelectOption } from '@/components/custom/TankmateSelect'
import { ButtonVariant } from '@/lib/constants'

export interface ParameterInlineFormProps {
  tankId: string
  onSuccess?: () => void
  onCancel?: () => void
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

export function ParameterInlineForm({ tankId, onSuccess }: ParameterInlineFormProps) {
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
        // Reset form
        setFormData({
          type: '',
          value: '',
          recordedAt: new Date().toISOString().slice(0, 10),
        })
        setErrors({})
      },
      onError: (error: any) => {
        console.error('Failed to create parameter:', error)
        setErrors({ general: 'Failed to create parameter. Please try again.' })
      },
    },
  })

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

  return (
    <div className="space-y-2">
      {/* Display general server errors at the top */}
      {errors.general && (
        <div className="p-2 rounded-md bg-red-50 border border-red-200">
          <p className="text-xs text-red-600 font-medium">{errors.general}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-end gap-2 justify-center">
        <div className="w-32">
          <TankmateSelect
            value={formData.type}
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value as CreateParameterRequestType | '' })
              if (errors.type) {
                setErrors({ ...errors, type: undefined })
              }
            }}
            error={errors.type}
            options={parameterTypeOptions}
            placeholder="Parameter"
            className="text-sm"
          />
        </div>

        <div className="w-32">
          <TankmateInput
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
            className="text-sm"
          />
        </div>

        <div className="relative">
          <input
            type="date"
            value={formData.recordedAt}
            onChange={(e) => {
              setFormData({ ...formData, recordedAt: e.target.value })
              if (errors.recordedAt) {
                setErrors({ ...errors, recordedAt: undefined })
              }
            }}
            className="sr-only"
            id="parameter-date"
          />
          <label 
            htmlFor="parameter-date"
            className="flex items-center justify-center w-10 h-10 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-md cursor-pointer transition-colors"
            title={`Date: ${new Date(formData.recordedAt).toLocaleDateString()}`}
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </label>
        </div>

        <TankmateButton
          type="submit"
          variant={ButtonVariant.DEFAULT}
          loading={recordParameterMutation.isPending}
          className="h-10"
        >
          Log
        </TankmateButton>
      </form>
      
      {/* Show field errors below in compact form */}
      {(errors.type || errors.value || errors.recordedAt) && (
        <div className="flex gap-2 text-xs text-red-600">
          {errors.type && <span>{errors.type}</span>}
          {errors.value && <span>{errors.value}</span>}
          {errors.recordedAt && <span>{errors.recordedAt}</span>}
        </div>
      )}
    </div>
  )
}