/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Brand Colors
      colors: {
        brand: {
          ocean: '#0891b2',
          'ocean-light': '#0ea5e9',
          'ocean-dark': '#0c7aa3',
          teal: '#0f766e',
          'teal-light': '#14b8a6',
          'teal-dark': '#0d9488',
          aqua: '#06b6d4',
          'aqua-light': '#22d3ee',
          'aqua-dark': '#0891b2',
          coral: '#f97316',
          'coral-light': '#fb923c',
          'coral-dark': '#ea580c',
          seafoam: '#10b981',
          'seafoam-light': '#34d399',
          'seafoam-dark': '#059669',
          pearl: '#f8fafc',
          charcoal: '#1e293b',
        },
      },

      // Typography
      fontFamily: {
        'primary': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.5' }],
        'xl': ['1.25rem', { lineHeight: '1.25' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['1.875rem', { lineHeight: '1.25' }],
        '4xl': ['2.25rem', { lineHeight: '1.25' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },

      // Spacing (extends default Tailwind spacing)
      spacing: {
        '18': '4.5rem',  // 72px
        '88': '22rem',   // 352px
        '128': '32rem',  // 512px
      },

      // Container
      container: {
        center: true,
        padding: '1.5rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1200px',
        },
      },

      // Border Radius
      borderRadius: {
        'brand': '6px',
        'brand-lg': '8px',
      },

      // Box Shadows
      boxShadow: {
        'brand': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'brand-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'brand-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },

      // Transitions
      transitionDuration: {
        'brand-fast': '150ms',
        'brand-normal': '250ms',
        'brand-slow': '400ms',
      },

      transitionTimingFunction: {
        'brand': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      // Animation keyframes
      keyframes: {
        'brand-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'brand-shimmer': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },

      animation: {
        'brand-bounce': 'brand-bounce 0.6s ease-in-out',
        'brand-shimmer': 'brand-shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}