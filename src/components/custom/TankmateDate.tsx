import { forwardRef, useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TankmateDateProps {
  label?: string
  error?: string
  helperText?: string
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  placeholder?: string
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Helper function to parse date string without timezone issues
const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day) // month is 0-indexed in Date constructor
}

const TankmateDate = forwardRef<HTMLDivElement, TankmateDateProps>(
  (
    { label, error, helperText, value, onChange, disabled = false, placeholder = 'Select date' },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false)
    const [shouldShake, setShouldShake] = useState(false)
    const [displayDate, setDisplayDate] = useState(() => {
      if (value) {
        const date = parseLocalDate(value)
        return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
      }
      return ''
    })

    const [viewDate, setViewDate] = useState(() => {
      return value ? parseLocalDate(value) : new Date()
    })

    const dropdownRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (error) {
        setShouldShake(true)
        const timer = setTimeout(() => setShouldShake(false), 300)
        return () => clearTimeout(timer)
      }
    }, [error])

    useEffect(() => {
      if (value) {
        const date = parseLocalDate(value)
        setDisplayDate(`${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`)
        setViewDate(date)
      } else {
        setDisplayDate('')
      }
    }, [value])

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen])

    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    }

    const handleDateSelect = (day: number) => {
      const year = viewDate.getFullYear()
      const month = viewDate.getMonth() + 1 // getMonth() returns 0-11, so add 1
      const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      onChange?.(dateString)
      setIsOpen(false)
    }

    const navigateMonth = (direction: 'prev' | 'next') => {
      setViewDate((prev) => {
        const newDate = new Date(prev)
        if (direction === 'prev') {
          newDate.setMonth(prev.getMonth() - 1)
        } else {
          newDate.setMonth(prev.getMonth() + 1)
        }
        return newDate
      })
    }

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(viewDate)
      const firstDayOfMonth = getFirstDayOfMonth(viewDate)
      const days = []
      const today = new Date()
      const selectedDate = value ? parseLocalDate(value) : null

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const isToday =
          today.getFullYear() === viewDate.getFullYear() &&
          today.getMonth() === viewDate.getMonth() &&
          today.getDate() === day

        const isSelected =
          selectedDate &&
          selectedDate.getFullYear() === viewDate.getFullYear() &&
          selectedDate.getMonth() === viewDate.getMonth() &&
          selectedDate.getDate() === day

        days.push(
          <button
            key={day}
            type="button"
            onClick={() => handleDateSelect(day)}
            className={cn(
              'w-8 h-8 text-sm rounded-md transition-colors',
              isSelected && 'bg-brand-ocean text-white font-medium hover:bg-brand-ocean-dark',
              isToday &&
                !isSelected &&
                'bg-brand-pearl text-brand-ocean font-medium border border-brand-ocean hover:bg-brand-ocean hover:text-white',
              !isSelected && !isToday && 'text-slate-700 hover:bg-brand-ocean hover:text-white'
            )}
          >
            {day}
          </button>
        )
      }

      return days
    }

    return (
      <div className="w-full space-y-2" ref={containerRef}>
        {label && (
          <label
            className={cn(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              error && 'text-red-600'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm',
              'ring-offset-background',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'transition-all duration-200',
              error
                ? 'border-red-500 focus-visible:ring-red-500 bg-red-50'
                : 'border-input focus-visible:ring-ring',
              displayDate ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            <span>{displayDate || placeholder}</span>
            <Calendar className="h-4 w-4 opacity-50" />
          </button>

          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 z-50 mt-1 w-80 rounded-md border border-slate-200 bg-white p-4 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="font-medium text-slate-900">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </div>

                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-xs font-medium text-slate-500 text-center p-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

              {/* Quick actions */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date()
                    const year = now.getFullYear()
                    const month = now.getMonth() + 1
                    const day = now.getDate()
                    const today = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
                    onChange?.(today)
                    setIsOpen(false)
                  }}
                  className="text-xs text-brand-ocean hover:text-brand-ocean-dark transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.('')
                    setIsOpen(false)
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className={cn('text-sm text-red-600 font-medium', shouldShake && 'animate-shake')}>
            {error}
          </p>
        )}
        {helperText && !error && <p className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  }
)

TankmateDate.displayName = 'TankmateDate'

export { TankmateDate }
