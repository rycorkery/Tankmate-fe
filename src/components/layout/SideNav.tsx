import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Routes } from '@/lib/constants'
import { cn } from '@/lib/utils'

const navItems = [
  {
    name: 'Dashboard',
    path: Routes.DASHBOARD,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: 'My Tanks',
    path: Routes.TANKS,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: 'Schedule',
    path: Routes.MAINTENANCE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Database',
    path: Routes.DATABASE,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
]

export function SideNav() {
  const location = useLocation()
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <aside 
      className={cn(
        "border-r bg-white h-[calc(100vh-4rem)] sticky top-16 flex flex-col",
        "transition-[width] duration-300 ease-out",
        isExpanded ? "w-64" : "w-16"
      )}
      style={{
        transitionProperty: 'width',
        transitionDuration: '300ms',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <nav className="p-2 space-y-1 flex-1 overflow-hidden">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path === Routes.TANKS && location.pathname.startsWith('/tanks'))
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center px-3 py-2 rounded-lg',
                'transition-all duration-300 ease-out',
                'relative group overflow-hidden',
                isActive
                  ? 'bg-brand-ocean/10 text-brand-ocean'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <div className="flex items-center justify-center w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <span 
                className={cn(
                  "font-medium whitespace-nowrap overflow-hidden",
                  isExpanded 
                    ? "opacity-100 ml-3 max-w-[200px]" 
                    : "opacity-0 ml-0 max-w-0"
                )}
                style={{
                  transitionProperty: 'opacity, margin-left, max-width',
                  transitionDuration: '300ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {item.name}
              </span>
              
              {/* Tooltip for collapsed state with animation */}
              <div className={cn(
                "absolute left-full ml-2 px-2 py-1",
                "bg-gray-900 text-white text-sm rounded",
                "pointer-events-none z-50 whitespace-nowrap",
                "transition-[opacity,transform] duration-200 ease-out",
                "opacity-0 scale-95",
                !isExpanded && "group-hover:opacity-100 group-hover:scale-100"
              )}>
                {item.name}
              </div>
            </Link>
          )
        })}
      </nav>
      
      {/* Toggle Button with enhanced animation */}
      <div className="border-t">
        <div className="p-2 flex justify-end">
          <button
            onClick={toggleExpanded}
            className={cn(
              "flex items-center justify-center px-3 py-2 rounded-lg",
              "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
              "text-slate-400 hover:text-slate-600 hover:bg-slate-50",
              "hover:scale-105 active:scale-95"
            )}
            title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
              <svg 
                className={cn(
                  "w-4 h-4",
                  isExpanded ? "rotate-180" : "rotate-0"
                )}
                style={{
                  transitionProperty: 'transform',
                  transitionDuration: '300ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </aside>
  )
}