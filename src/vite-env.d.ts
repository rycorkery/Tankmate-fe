/// <reference types="vite/client" />

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
