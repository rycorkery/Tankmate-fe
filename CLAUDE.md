# Tankmate Frontend - Development Guide

## Project Overview
Tankmate is a React-based single-page application (SPA) for aquarium management. The application is built with modern web technologies and follows best practices for scalability and maintainability.

## Technology Stack

### Core Technologies
- **React 18** - UI library (client-side only, no SSR)
- **TypeScript** - Type safety and better DX
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Unstyled, accessible UI components
- **Custom Components** - Wrapped shadcn components with Tankmate branding

### State Management
- **Zustand** - Lightweight global state management
- **Persistent Storage** - State persistence with localStorage

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## Project Structure

```
src/
├── components/
│   ├── custom/          # Custom wrapped components (TankmateButton, etc.)
│   ├── layout/          # Layout components (Navigation, Footer, Layout)
│   └── ui/              # shadcn/ui base components
├── config/
│   └── env.ts           # Environment configuration
├── lib/
│   └── utils.ts         # Utility functions (cn, etc.)
├── pages/               # Page components
│   └── Landing.tsx      # Landing page
├── store/
│   └── useStore.ts      # Zustand global store
├── App.tsx              # Main app component with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind directives
```

## Architecture Principles

### 1. Component Architecture
- **Wrapper Pattern**: All UI components are wrapped in custom Tankmate components
- **Composition**: Components are built using composition over inheritance
- **Single Responsibility**: Each component has a single, clear purpose

### 2. State Management
- **Global State**: User auth, theme, and app-wide settings in Zustand
- **Local State**: Component-specific state using React hooks
- **Persistence**: Critical state persisted to localStorage

### 3. Routing
- **Layout Wrapper**: All pages use a consistent layout wrapper
- **Client-Side Only**: No server-side rendering, pure SPA
- **Protected Routes**: (To be implemented) Auth-based route protection

### 4. Styling
- **Utility-First**: Tailwind CSS for rapid development
- **Component Classes**: Custom components with consistent styling
- **Theme Support**: Light/dark mode with CSS variables

## Key Components

### TankmateButton
Custom button wrapper with loading states and consistent styling:
```tsx
<TankmateButton variant="primary" loading={isLoading}>
  Click Me
</TankmateButton>
```

### TankmateCard
Card component with hover effects and consistent borders:
```tsx
<TankmateCard hoverable clickable>
  <TankmateCardHeader>
    <TankmateCardTitle>Title</TankmateCardTitle>
  </TankmateCardHeader>
</TankmateCard>
```

### TankmateInput
Input component with label, error, and helper text support:
```tsx
<TankmateInput 
  label="Email"
  error={errors.email}
  helperText="Enter your email address"
/>
```

## Environment Configuration

### Environment Variables
All environment variables are prefixed with `VITE_` and typed in `src/config/env.ts`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_VERSION=v1
VITE_ENABLE_DEBUG=true
VITE_ENVIRONMENT=development
```

### Configuration Access
```tsx
import { config } from '@/config/env'

// Use configuration
const apiUrl = config.api.fullUrl
const isDebug = config.features.debug
```

## State Management

### Global Store Structure
```tsx
interface AppState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  
  // Actions
  setUser: (user: User | null) => void
  toggleTheme: () => void
  logout: () => void
}
```

### Using the Store
```tsx
import { useStore } from '@/store/useStore'

function Component() {
  const { user, setUser, logout } = useStore()
  // Use state and actions
}
```

## Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Format with Prettier
npm run format

# Type check
npm run type-check
```

## Best Practices

### 1. Component Development
- Always use TypeScript interfaces for props
- Wrap shadcn components in Tankmate wrappers
- Keep components small and focused
- Use composition over complex components

### 2. State Management
- Keep global state minimal
- Use local state when possible
- Always type your store actions and state
- Persist only necessary data

### 3. Styling
- Use Tailwind utilities over custom CSS
- Maintain consistent spacing using Tailwind's scale
- Use CSS variables for theming
- Keep component-specific styles in the component

### 4. Code Organization
- Group related components together
- Use barrel exports (index.ts) for clean imports
- Keep pages thin, logic in components/hooks
- Use absolute imports (@/) for better maintainability

## Common Tasks

### Adding a New Page
1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link if needed

### Creating a Custom Component
1. Create base component in `src/components/custom/`
2. Wrap shadcn component if applicable
3. Add consistent Tankmate styling
4. Export from `src/components/custom/index.ts`

### Adding Environment Variables
1. Add to `.env` file with `VITE_` prefix
2. Add type definition in `src/config/env.ts`
3. Add to config object in `src/config/env.ts`
4. Update `.env.example`

### Implementing API Calls
```tsx
import { config } from '@/config/env'

async function fetchData() {
  const response = await fetch(`${config.api.fullUrl}/endpoint`)
  return response.json()
}
```

## Important Notes

### No Server-Side Rendering
This application is strictly client-side. All components should be written with this in mind:
- No `getServerSideProps` or `getStaticProps`
- No server components
- All data fetching happens on the client

### Component Wrapping Strategy
Always wrap third-party UI components in custom Tankmate components:
- Provides consistent styling layer
- Easier to swap underlying libraries
- Centralized customization point

### Environment Variables
- Local development: Use `.env` file
- Production: Variables injected by deployment environment
- Never commit `.env` to version control
- Always use `VITE_` prefix for Vite to expose them

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Check tsconfig paths configuration
   - Ensure vite.config.ts has correct alias

2. **Styling not applied**
   - Verify Tailwind configuration
   - Check that component uses correct classes
   - Ensure index.css is imported in main.tsx

3. **State not persisting**
   - Check Zustand persist middleware configuration
   - Verify localStorage is not blocked
   - Check partialize function in store

4. **Environment variables undefined**
   - Ensure variable starts with `VITE_`
   - Restart dev server after adding new variables
   - Check variable is in `.env` file

## Future Enhancements

### Planned Features
- Authentication flow integration
- API service layer with error handling
- Form validation with react-hook-form
- Data fetching with TanStack Query
- Comprehensive testing setup
- Performance monitoring
- Error boundary implementation
- Progressive Web App (PWA) features

### Architectural Improvements
- Lazy loading for routes
- Code splitting strategies
- Optimistic UI updates
- WebSocket integration for real-time features
- Internationalization (i18n) support

## Contact & Support

For questions about this codebase or architecture decisions, refer to this documentation first. This guide should be updated whenever significant architectural changes are made.