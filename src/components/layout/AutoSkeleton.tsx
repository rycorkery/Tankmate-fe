import { useEffect, useRef, useState, cloneElement, Children, isValidElement } from 'react'
import type { ReactElement } from 'react'
import { Skeleton } from '@/components/ui/LoadingState'

interface AutoSkeletonProps {
  children: ReactElement
  isLoading: boolean
  /**
   * Number of skeleton items to show for lists/grids
   * @default 6
   */
  count?: number
}

interface ElementDimensions {
  width: number
  height: number
}

/**
 * Automatically generates skeleton loading states that match the exact size of the real content.
 * On first render, it briefly renders the real content hidden to measure it, then shows appropriately sized skeletons.
 */
export function AutoSkeleton({ children, isLoading, count = 6 }: AutoSkeletonProps) {
  const [dimensions, setDimensions] = useState<Map<string, ElementDimensions>>(new Map())
  const [isMeasuring, setIsMeasuring] = useState(true)
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoading) {
      setIsMeasuring(false)
      return
    }

    // Measure the content on mount or when loading starts
    if (measureRef.current && isMeasuring) {
      const measurements = new Map<string, ElementDimensions>()

      // Find all elements with data-skeleton attribute
      const elements = measureRef.current.querySelectorAll('[data-skeleton]')
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const skeletonType = el.getAttribute('data-skeleton') || 'default'
        measurements.set(skeletonType, {
          width: rect.width,
          height: rect.height,
        })
      })

      // Also measure common elements
      const measureElements = (selector: string, key: string) => {
        const el = measureRef.current?.querySelector(selector)
        if (el) {
          const rect = el.getBoundingClientRect()
          measurements.set(key, {
            width: rect.width,
            height: rect.height,
          })
        }
      }

      measureElements('.tank-card', 'tank-card')
      measureElements('h1', 'h1')
      measureElements('h2', 'h2')
      measureElements('p', 'p')
      measureElements('button', 'button')

      setDimensions(measurements)
      setIsMeasuring(false)
    }
  }, [isLoading, isMeasuring])

  // If not loading, show the real content
  if (!isLoading) {
    return children
  }

  // During measurement phase, render both (hidden real content + basic skeleton)
  if (isMeasuring) {
    return (
      <>
        {/* Hidden measurement container */}
        <div
          ref={measureRef}
          style={{
            position: 'absolute',
            visibility: 'hidden',
            pointerEvents: 'none',
            zIndex: -9999,
          }}
          aria-hidden="true"
        >
          {children}
        </div>
        {/* Show basic skeleton while measuring */}
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-slate-200 rounded w-3/4 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 rounded-lg" />
            ))}
          </div>
        </div>
      </>
    )
  }

  // Generate skeleton based on measured dimensions
  const createSkeleton = (element: ReactElement): ReactElement => {
    if (!isValidElement(element)) return element

    const { type, props } = element as {
      type: React.ElementType
      props: React.ComponentProps<'div'> & { 'data-skeleton'?: string }
    }

    // Check for data-skeleton attribute
    if (props?.['data-skeleton']) {
      const skeletonType = props['data-skeleton']
      const dim = dimensions.get(skeletonType)

      if (dim) {
        return (
          <Skeleton
            variant="rounded"
            width={dim.width}
            height={dim.height}
            className={props.className}
          />
        )
      }
    }

    // Check for specific class names
    if (props?.className) {
      if (props.className.includes('tank-card')) {
        const dim = dimensions.get('tank-card')
        if (dim) {
          return (
            <Skeleton
              variant="rounded"
              width="100%"
              height={dim.height}
              className={props.className}
            />
          )
        }
      }

      // For grids, generate multiple skeletons
      if (props.className.includes('grid')) {
        const cardDim = dimensions.get('tank-card')

        return (
          <div className={props.className}>
            {Array.from({ length: count }).map((_, i) => (
              <Skeleton key={i} variant="rounded" width="100%" height={cardDim?.height || 250} />
            ))}
          </div>
        )
      }
    }

    // HTML elements
    if (typeof type === 'string') {
      const dim = dimensions.get(type)
      if (dim) {
        switch (type) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'p':
            return <Skeleton variant="text" width={dim.width * 0.7} height={dim.height} />
          case 'button':
            return <Skeleton variant="rounded" width={dim.width} height={dim.height} />
        }
      }
    }

    // Recursively process children
    if (props?.children) {
      const skeletonChildren = Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          return createSkeleton(child)
        }
        if (typeof child === 'string' && child.trim()) {
          return <Skeleton variant="text" />
        }
        return child
      })

      return cloneElement(element, {
        ...props,
        children: skeletonChildren,
      } as any)
    }

    return element
  }

  return createSkeleton(children)
}

/**
 * Higher-order component to add data-skeleton attributes for automatic skeleton generation
 */
export function withSkeletonData<P extends object>(
  Component: React.ComponentType<P>,
  skeletonType: string
) {
  return function WithSkeletonData(props: P) {
    return <Component {...props} data-skeleton={skeletonType} />
  }
}
