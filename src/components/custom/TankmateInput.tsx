import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TankmateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

const TankmateInput = forwardRef<HTMLInputElement, TankmateInputProps>(
  ({ className, type, label, error, helperText, icon, ...props }, ref) => {
    const [shouldShake, setShouldShake] = useState(false)

    useEffect(() => {
      if (error) {
        setShouldShake(true)
        const timer = setTimeout(() => setShouldShake(false), 300)
        return () => clearTimeout(timer)
      }
    }, [error])

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            error && "text-red-600"
          )}>
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              error ? "text-red-500" : "text-muted-foreground"
            )}>
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm',
              'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200',
              icon && 'pl-10',
              error ? 'border-red-500 focus-visible:ring-red-500 bg-red-50' : 'border-input focus-visible:ring-ring',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className={cn(
            "text-sm text-red-600 font-medium",
            shouldShake && "animate-shake"
          )}>
            {error}
          </p>
        )}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  }
)

TankmateInput.displayName = 'TankmateInput'

export { TankmateInput }
