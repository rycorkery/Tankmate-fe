import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TankmateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  clickable?: boolean
}

const TankmateCard = forwardRef<HTMLDivElement, TankmateCardProps>(
  ({ className, hoverable = false, clickable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border bg-card text-card-foreground shadow-sm',
          'transition-all duration-200',
          hoverable && 'hover:shadow-lg hover:scale-[1.02]',
          clickable && 'cursor-pointer active:scale-[0.98]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

TankmateCard.displayName = 'TankmateCard'

const TankmateCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
)

TankmateCardHeader.displayName = 'TankmateCardHeader'

const TankmateCardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
)

TankmateCardTitle.displayName = 'TankmateCardTitle'

const TankmateCardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
))

TankmateCardDescription.displayName = 'TankmateCardDescription'

const TankmateCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)

TankmateCardContent.displayName = 'TankmateCardContent'

const TankmateCardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  )
)

TankmateCardFooter.displayName = 'TankmateCardFooter'

export {
  TankmateCard,
  TankmateCardHeader,
  TankmateCardFooter,
  TankmateCardTitle,
  TankmateCardDescription,
  TankmateCardContent,
}
