import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import { TankmateButton } from './TankmateButton'
import { ButtonVariant } from '@/lib/constants'

export interface TankmateModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  hideCloseButton?: boolean
}

export function TankmateModal({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = 'md',
  hideCloseButton = false,
}: TankmateModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const mouseDownTargetRef = useRef<EventTarget | null>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Handle backdrop click - only close if both mousedown and mouseup happen on backdrop
  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    mouseDownTargetRef.current = event.target
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    // Only close if both mousedown and mouseup happened on the overlay (backdrop)
    if (event.target === overlayRef.current && mouseDownTargetRef.current === overlayRef.current) {
      onClose()
    }
    // Reset the mousedown target
    mouseDownTargetRef.current = null
  }

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className={cn(
          'relative w-full mx-4 bg-white rounded-lg shadow-xl transform transition-all duration-200 animate-in fade-in-0 zoom-in-95',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          {!hideCloseButton && (
            <TankmateButton
              variant={ButtonVariant.GHOST}
              onClick={onClose}
              className="h-auto p-2 text-slate-500 hover:text-slate-700"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </TankmateButton>
          )}
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export interface TankmateModalFooterProps {
  children: React.ReactNode
  className?: string
}

export function TankmateModalFooter({ children, className }: TankmateModalFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-6 border-t border-slate-200 mt-6',
        className
      )}
    >
      {children}
    </div>
  )
}
