/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Force generation of all brand colors
    'bg-brand-ocean', 'bg-brand-ocean-light', 'bg-brand-ocean-dark',
    'bg-brand-teal', 'bg-brand-teal-light', 'bg-brand-teal-dark', 
    'bg-brand-aqua', 'bg-brand-aqua-light', 'bg-brand-aqua-dark',
    'bg-brand-coral', 'bg-brand-coral-light', 'bg-brand-coral-dark',
    'bg-brand-seafoam', 'bg-brand-seafoam-light', 'bg-brand-seafoam-dark',
    'bg-brand-pearl', 'bg-brand-charcoal',
    'text-brand-ocean', 'text-brand-ocean-light', 'text-brand-ocean-dark',
    'text-brand-teal', 'text-brand-teal-light', 'text-brand-teal-dark',
    'text-brand-aqua', 'text-brand-aqua-light', 'text-brand-aqua-dark',
    'text-brand-coral', 'text-brand-coral-light', 'text-brand-coral-dark',
    'text-brand-seafoam', 'text-brand-seafoam-light', 'text-brand-seafoam-dark',
    'text-brand-pearl', 'text-brand-charcoal',
    'border-brand-ocean', 'border-brand-teal', 'border-brand-aqua',
    'hover:bg-brand-ocean-dark', 'hover:bg-brand-teal-dark', 'hover:bg-brand-aqua-dark',
    'hover:text-brand-ocean', 'hover:text-brand-teal', 'hover:text-brand-aqua',
    'from-brand-ocean', 'to-brand-aqua', 'from-brand-seafoam', 'to-brand-ocean',
    'ring-brand-ocean', 'bg-brand-ocean/10', 'bg-brand-ocean/5',
    'text-brand-charcoal/70', 'border-brand-ocean/20', 'border-brand-ocean/40'
  ],
  theme: {
    extend: {
      // shadcn/ui theme integration with Tankmate branding
      colors: {
        // Tankmate Brand Colors - Direct hex values for immediate use
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
        // shadcn/ui semantic colors mapped to Tankmate brand
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0891b2", // brand.ocean
          foreground: "#f8fafc", // brand.pearl
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#1e293b", // brand.charcoal
        },
        destructive: {
          DEFAULT: "#f97316", // brand.coral
          foreground: "#f8fafc", // brand.pearl
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#06b6d4", // brand.aqua
          foreground: "#f8fafc", // brand.pearl
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // Typography with Inter as primary font
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'monospace'],
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

      // Enhanced spacing scale
      spacing: {
        '18': '4.5rem',  // 72px
        '88': '22rem',   // 352px
        '128': '32rem',  // 512px
      },

      // Container configuration
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

      // Border radius matching design tokens
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'brand': '6px',
        'brand-lg': '8px',
      },

      // Enhanced shadows
      boxShadow: {
        'brand': '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        'brand-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'brand-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },

      // Brand-specific transitions
      transitionDuration: {
        'brand-fast': '150ms',
        'brand-normal': '250ms',
        'brand-slow': '400ms',
      },

      transitionTimingFunction: {
        'brand': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      // Brand animations
      keyframes: {
        'brand-bounce': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'brand-shimmer': {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        'brand-bounce': 'brand-bounce 0.6s ease-in-out',
        'brand-shimmer': 'brand-shimmer 2s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}