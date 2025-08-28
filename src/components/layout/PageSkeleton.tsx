import { cloneElement, Children, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { Skeleton } from '@/components/ui/LoadingState'

interface PageSkeletonProps {
  children: ReactElement
  isLoading: boolean
}

/**
 * Automatically generates skeleton loading states based on the actual content structure.
 * Replaces text content with skeleton elements while preserving layout.
 */
export function PageSkeleton({ children, isLoading }: PageSkeletonProps) {
  if (!isLoading) return children

  const createSkeleton = (element: ReactElement, path: string = 'root'): ReactElement => {
    // Handle text nodes and simple elements
    if (typeof element === 'string' || typeof element === 'number') {
      return <Skeleton variant="text" />
    }

    // Skip if not a valid React element
    if (!isValidElement(element)) {
      return element
    }

    const { type, props } = element

    // Map common HTML elements to skeleton variants
    const htmlSkeletonMap: Record<string, (() => ReactElement) | null> = {
      h1: () => <Skeleton variant="text" height={36} width="60%" />,
      h2: () => <Skeleton variant="text" height={30} width="50%" />,
      h3: () => <Skeleton variant="text" height={24} width="45%" />,
      h4: () => <Skeleton variant="text" height={20} width="40%" />,
      p: () => <Skeleton variant="text" height={20} width="80%" />,
      button: () => <Skeleton variant="rounded" height={40} width={120} />,
      img: () => <Skeleton variant="rectangular" height={200} />,
      svg: () => <Skeleton variant="circular" height={40} width={40} />,
      div: null, // Pass through divs
      span: null, // Pass through spans
      section: null, // Pass through sections
      article: null, // Pass through articles
      main: null, // Pass through main
      header: null, // Pass through header
      footer: null, // Pass through footer
      nav: null, // Pass through nav
    }

    // Check if it's an HTML element
    if (typeof type === 'string') {
      if (htmlSkeletonMap[type] !== undefined) {
        const skeleton = htmlSkeletonMap[type]
        if (skeleton) {
          return skeleton()
        }
        // Pass through container elements, process children
      } else {
        // Unknown HTML element - throw error
        throw new Error(
          `PageSkeleton: Unknown HTML element "${type}" at ${path}. ` +
            `Add it to htmlSkeletonMap if it should be replaced with a skeleton, ` +
            `or set to null if it should be passed through.`
        )
      }
    }

    // Map known custom components to skeleton replacements
    const componentSkeletonMap: Record<string, () => ReactElement> = {
      TankCard: () => <Skeleton variant="rounded" height={250} />,
      TankmateButton: () => <Skeleton variant="rounded" height={40} width={120} />,
      TankmateCard: () => (
        <div className={(props as { className?: string })?.className}>
          <Skeleton variant="rounded" height={200} />
        </div>
      ),
      TankmateCardHeader: () => (
        <div className={(props as { className?: string })?.className}>
          <Skeleton variant="text" height={24} width="60%" />
        </div>
      ),
      TankmateCardContent: () => (
        <div className={(props as { className?: string })?.className}>
          <Skeleton variant="text" height={20} width="80%" />
          <Skeleton variant="text" height={20} width="70%" className="mt-2" />
        </div>
      ),
    }

    // Check if it's a custom component
    if (typeof type === 'function') {
      const componentName =
        (type as React.FC<{ displayName?: string }>).displayName || type.name || 'Unknown'

      if (componentSkeletonMap[componentName]) {
        return componentSkeletonMap[componentName]()
      }

      // Unknown component - throw error
      throw new Error(
        `PageSkeleton: Unknown component "${componentName}" at ${path}. ` +
          `Add it to componentSkeletonMap with an appropriate skeleton replacement. ` +
          `Component props: ${JSON.stringify(Object.keys(props || {}))}`
      )
    }

    // For known container elements, recursively process children
    if ((props as { children?: React.ReactNode })?.children) {
      const skeletonChildren = Children.map(
        (props as { children?: React.ReactNode }).children,
        (child, index) => {
          if (isValidElement(child)) {
            const childPath = `${path} > ${typeof child.type === 'string' ? child.type : (child.type as React.FC<{ name?: string }>)?.name || 'Component'}[${index}]`
            return createSkeleton(child, childPath)
          }
          if (typeof child === 'string' && child.trim()) {
            return <Skeleton variant="text" />
          }
          return child
        }
      )

      return cloneElement(element, {
        ...(props as any),
        children: skeletonChildren,
      } as any)
    }

    return element
  }

  try {
    return createSkeleton(children)
  } catch (error) {
    console.error('PageSkeleton error:', error)
    // In development, throw the error to help identify missing mappings
    if (process.env.NODE_ENV === 'development') {
      throw error
    }
    // In production, fall back to showing the original content
    return children
  }
}

/**
 * Hook to automatically generate skeleton version of content
 */
export function useAutoSkeleton<T extends ReactElement>(content: T, isLoading: boolean): T {
  if (!isLoading) return content

  const pageSkeleton = (<PageSkeleton isLoading={true}>{content}</PageSkeleton>) as T

  return pageSkeleton
}
