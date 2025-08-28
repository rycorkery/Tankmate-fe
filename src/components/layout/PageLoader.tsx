import type { ReactNode } from 'react'
import { LoadingState } from '@/components/ui/LoadingState'

interface PageLoaderProps {
  isLoading: boolean
  error?: Error | null
  loadingText?: string
  children: ReactNode
  skeleton?: ReactNode
}

export function PageLoader({
  isLoading,
  error,
  loadingText = 'Loading...',
  children,
  skeleton,
}: PageLoaderProps) {
  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">Something went wrong</p>
          <p className="mt-2 text-sm text-slate-600">{error.message}</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    if (skeleton) {
      return <>{skeleton}</>
    }
    return <LoadingState fullPage text={loadingText} />
  }

  return <>{children}</>
}
