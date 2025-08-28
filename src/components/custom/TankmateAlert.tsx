import { cn } from '@/lib/utils'
import React from 'react'

interface TankmateAlertProps {
  variant?: 'default' | 'destructive' | 'success' | 'warning'
  className?: string
  children: React.ReactNode
}

export function TankmateAlert({ variant = 'default', className, children }: TankmateAlertProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border p-4',
        {
          'bg-white border-slate-200 text-slate-900': variant === 'default',
          'bg-red-50 border-red-200 text-red-900': variant === 'destructive',
          'bg-green-50 border-green-200 text-green-900': variant === 'success',
          'bg-yellow-50 border-yellow-200 text-yellow-900': variant === 'warning',
        },
        className
      )}
      role="alert"
    >
      {children}
    </div>
  )
}

export function TankmateAlertDescription({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('text-sm', className)}>{children}</div>
}
