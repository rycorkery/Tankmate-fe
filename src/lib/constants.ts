/**
 * Application-wide constants and enums
 * Use these instead of magic strings throughout the codebase
 */

/**
 * Button variant types matching the buttonVariants from ui/button
 */
export const ButtonVariant = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  OUTLINE: 'outline',
  SECONDARY: 'secondary',
  GHOST: 'ghost',
  LINK: 'link',
} as const

export type ButtonVariantType = typeof ButtonVariant[keyof typeof ButtonVariant]

/**
 * Button size types
 */
export const ButtonSize = {
  DEFAULT: 'default',
  SM: 'sm',
  LG: 'lg',
  ICON: 'icon',
} as const

export type ButtonSizeType = typeof ButtonSize[keyof typeof ButtonSize]

/**
 * Application routes
 * Single source of truth for all route paths
 */
export const Routes = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  FEATURES: '/features',
  CONTACT: '/contact',
  
  // Auth routes
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  
  // Protected routes
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  
  // Tank management routes
  TANKS: '/tanks',
  TANK_DETAIL: '/tanks/:id',
  TANK_CREATE: '/tanks/new',
  TANK_EDIT: '/tanks/:id/edit',
  
  // Maintenance routes
  MAINTENANCE: '/maintenance',
  MAINTENANCE_HISTORY: '/maintenance/history',
} as const

export type RoutesType = typeof Routes[keyof typeof Routes]

/**
 * Helper function to generate dynamic routes
 */
export const generateRoute = {
  tankDetail: (id: string) => `/tanks/${id}`,
  tankEdit: (id: string) => `/tanks/${id}/edit`,
}

/**
 * Alert variant types
 */
export const AlertVariant = {
  DEFAULT: 'default',
  DESTRUCTIVE: 'destructive',
  SUCCESS: 'success',
  WARNING: 'warning',
} as const

export type AlertVariantType = typeof AlertVariant[keyof typeof AlertVariant]

/**
 * API Response status codes
 */
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const

export type HttpStatusType = typeof HttpStatus[keyof typeof HttpStatus]

/**
 * Local storage keys
 */
export const StorageKeys = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  SIDEBAR_OPEN: 'sidebarOpen',
} as const

export type StorageKeysType = typeof StorageKeys[keyof typeof StorageKeys]