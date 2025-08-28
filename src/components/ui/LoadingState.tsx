import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullPage?: boolean
}

export function LoadingState({
  className,
  size = 'md',
  text = 'Loading...',
  fullPage = false,
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <Loader2 className={cn('animate-spin text-brand-ocean', sizeClasses[size])} />
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  )

  if (fullPage) {
    return <div className="flex min-h-[60vh] items-center justify-center">{content}</div>
  }

  return content
}

// Skeleton component for loading states
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animation?: 'pulse' | 'wave' | 'none'
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = 'bg-slate-200'

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-md',
  }

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], animationClasses[animation], className)}
      style={{
        width: width || '100%',
        height: height || '20px',
      }}
    />
  )
}
