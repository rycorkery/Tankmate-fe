interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_API_VERSION: string
  readonly VITE_AUTH_DOMAIN?: string
  readonly VITE_AUTH_CLIENT_ID?: string
  readonly VITE_ENABLE_ANALYTICS: string
  readonly VITE_ENABLE_DEBUG: string
  readonly VITE_STRIPE_PUBLIC_KEY?: string
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
  readonly VITE_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export const config = {
  api: {
    url: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    version: import.meta.env.VITE_API_VERSION || 'v1',
    fullUrl: `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/${import.meta.env.VITE_API_VERSION || 'v1'}`,
  },
  auth: {
    domain: import.meta.env.VITE_AUTH_DOMAIN || '',
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID || '',
  },
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    debug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  },
  services: {
    stripe: {
      publicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
    },
    googleMaps: {
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    },
  },
  environment: import.meta.env.VITE_ENVIRONMENT || 'development',
  isDevelopment: import.meta.env.VITE_ENVIRONMENT === 'development',
  isProduction: import.meta.env.VITE_ENVIRONMENT === 'production',
}

if (config.features.debug) {
  console.log('Environment Configuration:', config)
}