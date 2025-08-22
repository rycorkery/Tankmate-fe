/**
 * Tankmate Design System - Design Tokens
 *
 * Centralized design values for consistent styling across the application.
 * These tokens are integrated with Tailwind CSS configuration and should be
 * the single source of truth for all design values.
 */

// =============================================================================
// COLOR PALETTE
// =============================================================================

export const colors = {
  // Primary Brand Colors (Aquatic Theme)
  brand: {
    ocean: '#0891b2', // Primary brand color
    teal: '#0f766e', // Secondary brand color
    aqua: '#06b6d4', // Accent/highlight color
    coral: '#f97316', // Warning/attention states
    seafoam: '#10b981', // Success states
    pearl: '#f8fafc', // Light backgrounds
    charcoal: '#1e293b', // Dark text
  },

  // Extended Brand Palette (variations for hover/focus states)
  brandExtended: {
    oceanLight: '#0ea5e9',
    oceanDark: '#0c7aa3',
    tealLight: '#14b8a6',
    tealDark: '#0d9488',
    aquaLight: '#22d3ee',
    aquaDark: '#0891b2',
    coralLight: '#fb923c',
    coralDark: '#ea580c',
    seafoamLight: '#34d399',
    seafoamDark: '#059669',
  },

  // Neutral Scale (Slate-based)
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f97316',
    error: '#ef4444',
    info: '#06b6d4',
  },
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
  // Font Families
  fontFamily: {
    primary: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'monospace'],
  },

  // Font Sizes (rem values)
  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem', // 48px
  },

  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Typography Scale Mapping
  scale: {
    h1: {
      fontSize: '2.25rem', // 36px
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: '1.875rem', // 30px
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.5rem', // 24px
      fontWeight: 600,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.25,
    },
    body: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    small: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.5,
    },
    xs: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
} as const

// =============================================================================
// SPACING & LAYOUT
// =============================================================================

export const spacing = {
  // Base spacing scale (4px grid system)
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '80px',
  '5xl': '96px',

  // Component-specific spacing
  component: {
    cardPadding: '24px',
    buttonPaddingY: '12px',
    buttonPaddingX: '24px',
    inputPaddingY: '12px',
    inputPaddingX: '16px',
    sectionGap: '48px',
  },
} as const

export const layout = {
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Container constraints
  container: {
    maxWidth: '1200px',
    contentMaxWidth: '800px',
    padding: '24px',
  },

  // Grid system
  grid: {
    columns: 12,
    gap: '24px',
  },
} as const

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const borderRadius = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',

  // Component-specific
  component: {
    button: '6px',
    input: '6px',
    card: '8px',
    avatar: '9999px',
  },
} as const

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Component-specific
  component: {
    card: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
    cardHover: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    button: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    modal: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
} as const

// =============================================================================
// TRANSITIONS & ANIMATIONS
// =============================================================================

export const transitions = {
  // Duration
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '400ms',
  },

  // Easing
  easing: {
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  // Common transition properties
  common: {
    colors: 'color 150ms ease-out, background-color 150ms ease-out, border-color 150ms ease-out',
    transform: 'transform 250ms ease-out',
    opacity: 'opacity 250ms ease-out',
    shadow: 'box-shadow 250ms ease-out',
  },

  // Component-specific
  component: {
    button: 'all 150ms ease-out',
    card: 'transform 250ms ease-out, box-shadow 250ms ease-out',
    modal: 'opacity 250ms ease-out, transform 250ms ease-out',
  },
} as const

// =============================================================================
// Z-INDEX SCALE
// =============================================================================

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export const components = {
  button: {
    variants: {
      primary: {
        backgroundColor: colors.brand.ocean,
        color: colors.neutral[50],
        borderRadius: borderRadius.component.button,
        padding: `${spacing.sm} ${spacing.lg}`,
        transition: transitions.component.button,
        '&:hover': {
          backgroundColor: colors.brandExtended.oceanDark,
        },
      },
      secondary: {
        backgroundColor: 'transparent',
        color: colors.brand.ocean,
        border: `1px solid ${colors.brand.ocean}`,
        borderRadius: borderRadius.component.button,
        padding: `${spacing.sm} ${spacing.lg}`,
        transition: transitions.component.button,
        '&:hover': {
          backgroundColor: colors.brand.ocean,
          color: colors.neutral[50],
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: colors.brand.ocean,
        borderRadius: borderRadius.component.button,
        padding: `${spacing.sm} ${spacing.lg}`,
        transition: transitions.component.button,
        '&:hover': {
          backgroundColor: colors.neutral[100],
        },
      },
    },
  },

  card: {
    base: {
      backgroundColor: colors.neutral[50],
      border: `1px solid ${colors.neutral[200]}`,
      borderRadius: borderRadius.component.card,
      padding: spacing.component.cardPadding,
      boxShadow: shadows.component.card,
      transition: transitions.component.card,
    },
    hoverable: {
      '&:hover': {
        boxShadow: shadows.component.cardHover,
        transform: 'scale(1.02)',
      },
    },
  },

  input: {
    base: {
      backgroundColor: colors.neutral[50],
      border: `1px solid ${colors.neutral[300]}`,
      borderRadius: borderRadius.component.input,
      padding: `${spacing.component.inputPaddingY} ${spacing.component.inputPaddingX}`,
      fontSize: typography.fontSize.base,
      transition: transitions.common.colors,
      '&:focus': {
        outline: 'none',
        borderColor: colors.brand.ocean,
        boxShadow: `0 0 0 2px ${colors.brand.ocean}25`,
      },
    },
  },
} as const

// =============================================================================
// EXPORTED DESIGN TOKENS
// =============================================================================

export const designTokens = {
  colors,
  typography,
  spacing,
  layout,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  components,
} as const

// Type exports for TypeScript support
export type Colors = typeof colors
export type Typography = typeof typography
export type Spacing = typeof spacing
export type Layout = typeof layout
export type BorderRadius = typeof borderRadius
export type Shadows = typeof shadows
export type Transitions = typeof transitions
export type ZIndex = typeof zIndex
export type Components = typeof components
export type DesignTokens = typeof designTokens
