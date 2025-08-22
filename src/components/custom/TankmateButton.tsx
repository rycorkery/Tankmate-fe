import { forwardRef } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

export interface TankmateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
}

const TankmateButton = forwardRef<HTMLButtonElement, TankmateButtonProps>(
  ({ className, variant, size, loading, icon, children, disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'font-medium transition-all duration-150',
          'hover:shadow-lg active:scale-95',
          'focus-visible:ring-2 focus-visible:ring-brand-ocean focus-visible:ring-offset-2',
          // Enhanced brand styling using design tokens
          variant === 'default' && 'bg-brand-ocean hover:bg-brand-ocean-dark text-brand-pearl',
          variant === 'secondary' &&
            'border-brand-ocean text-brand-ocean hover:bg-brand-ocean hover:text-brand-pearl',
          variant === 'outline' &&
            'border-brand-ocean text-brand-ocean hover:bg-brand-ocean hover:text-brand-pearl',
          variant === 'ghost' && 'text-brand-ocean hover:bg-brand-ocean/10',
          variant === 'destructive' && 'bg-brand-coral hover:bg-brand-coral-dark text-brand-pearl',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {children}
          </span>
        ) : (
          <>
            {icon && <span className="inline-flex items-center">{icon}</span>}
            {children}
          </>
        )}
      </Button>
    )
  }
)

TankmateButton.displayName = 'TankmateButton'

export { TankmateButton }
