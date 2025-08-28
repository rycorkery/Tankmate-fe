import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export interface TankmateSelectOption {
  value: string
  label: string
}

export interface TankmateSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: TankmateSelectOption[]
  placeholder?: string
}

const TankmateSelect = forwardRef<HTMLSelectElement, TankmateSelectProps>(
  ({ className, label, error, helperText, options, placeholder, ...props }, ref) => {
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
        <select
          className={cn(
            'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm',
            'ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-all duration-200',
            error ? 'border-red-500 focus-visible:ring-red-500 bg-red-50' : 'border-input focus-visible:ring-ring',
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

TankmateSelect.displayName = 'TankmateSelect'

export { TankmateSelect }