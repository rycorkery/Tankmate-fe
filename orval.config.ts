import { defineConfig } from 'orval'

// Fail fast if required environment variables are missing
const getRequiredEnvVar = (name: string): string => {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export default defineConfig({
  tankmate: {
    output: {
      mode: 'split',
      target: 'src/api/generated/tankmate.ts',
      schemas: 'src/api/generated/model',
      client: 'react-query',
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: 'src/api/mutator/custom-instance.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
        zod: {
          generate: {
            param: true,
            body: true,
            response: true,
          },
          coerce: true,
          strict: {
            param: true,
            query: true,
            header: true,
            body: true,
            response: false,
          },
        },
      },
    },
    input: {
      target: `${getRequiredEnvVar('VITE_API_URL')}/openapi.json`,
    },
  },
})
