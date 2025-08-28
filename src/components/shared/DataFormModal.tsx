import type { ReactNode } from 'react'
import { TankmateModal, TankmateModalFooter } from '@/components/custom/TankmateModal'
import { TankmateButton } from '@/components/custom/TankmateButton'
import { ButtonVariant } from '@/lib/constants'

interface DataFormModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  submitText?: string
  cancelText?: string
  generalError?: string
}

export function DataFormModal({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  isLoading = false,
  submitText = "Save",
  cancelText = "Cancel",
  generalError
}: DataFormModalProps) {
  const handleClose = () => {
    if (!isLoading) {
      onClose()
    }
  }

  return (
    <TankmateModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="md"
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {/* Display general server errors at the top */}
        {generalError && (
          <div className="p-3 rounded-md bg-red-50 border border-red-200">
            <p className="text-sm text-red-600 font-medium">{generalError}</p>
          </div>
        )}
        
        {children}

        <TankmateModalFooter>
          <TankmateButton
            type="button"
            variant={ButtonVariant.OUTLINE}
            onClick={handleClose}
            disabled={isLoading}
          >
            {cancelText}
          </TankmateButton>
          <TankmateButton
            type="submit"
            variant={ButtonVariant.DEFAULT}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : submitText}
          </TankmateButton>
        </TankmateModalFooter>
      </form>
    </TankmateModal>
  )
}