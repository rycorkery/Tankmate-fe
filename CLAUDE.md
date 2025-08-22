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

## Design System & Brand Identity

### Brand Personality
Tankmate embodies a **trustworthy, calming, modern, and knowledgeable** brand personality that reflects the serene nature of aquarium keeping while providing professional-grade management tools.

**Core Values:**
- Simplicity in complexity (making aquarium management easy)
- Community-driven learning
- Environmental consciousness
- Quality over quantity

### Color Palette
**Primary Colors (Aquatic Theme):**
- **Ocean Blue**: `#0891b2` - Primary brand color for buttons, links, brand elements
- **Deep Teal**: `#0f766e` - Secondary brand color for navigation, secondary actions
- **Aqua**: `#06b6d4` - Accent color for hover states, active elements, progress

**Supporting Colors:**
- **Coral**: `#f97316` - Warning/attention states, destructive actions
- **Seafoam**: `#10b981` - Success states, confirmation messages
- **Pearl**: `#f8fafc` - Light backgrounds
- **Charcoal**: `#1e293b` - Dark text, primary content

**Neutral Palette:**
- **Slate Scale**: Full grayscale from `#f8fafc` to `#0f172a` for text, borders, backgrounds

### Typography System
**Primary Font: Inter** - Modern, clean, excellent readability
- **Headings**: Inter 600-700 weight
- **Body Text**: Inter 400 weight
- **Code/Data**: JetBrains Mono for technical information

**Typography Scale:**
- **H1**: 2.25rem (36px) - Page titles
- **H2**: 1.875rem (30px) - Section headers  
- **H3**: 1.5rem (24px) - Subsection headers
- **H4**: 1.25rem (20px) - Card titles
- **Body**: 1rem (16px) - Main content
- **Small**: 0.875rem (14px) - Captions, metadata
- **XS**: 0.75rem (12px) - Labels, badges

### Spacing & Layout
**Spacing Scale (4px grid system):**
- **XS**: 4px - Tight spacing, icon gaps
- **SM**: 8px - Button padding, small gaps  
- **MD**: 16px - Standard component spacing
- **LG**: 24px - Section spacing
- **XL**: 32px - Large section gaps
- **2XL**: 48px - Major section separation
- **3XL**: 64px - Page-level spacing

**Layout Constraints:**
- **Container Max Width**: 1200px (desktop)
- **Content Max Width**: 800px (readable content)
- **Grid System**: 12-column CSS Grid

### Component Design Patterns
**Cards:**
- 8px border radius, subtle drop shadow
- 24px internal padding
- Hover states with elevated shadow and slight scale

**Buttons:**
- 6px border radius
- Primary: Ocean blue background, white text
- Secondary: Transparent with ocean blue border
- Ghost: No background, light blue hover

**Inputs:**
- 6px border radius
- 1px slate-300 border, ocean blue focus state
- 12px vertical, 16px horizontal padding

### Animation & Interactions
**Timing:**
- **Quick interactions**: 150ms (hover, focus)
- **Standard transitions**: 250ms (modal open/close)
- **Complex animations**: 400ms (page transitions)
- **Easing**: CSS `ease-out` for natural feel

**States:**
- Hover: Slightly darker colors, elevated shadows
- Focus: Ocean blue outline, 2px width for accessibility
- Loading: Spinner animations, skeleton loaders with shimmer
- Success: Gentle bounce effect (scale 1.0 → 1.05 → 1.0)

### Design Token Usage
**IMPORTANT**: All design values are centralized in `src/lib/design-tokens.ts` and integrated with Tailwind CSS configuration. Always reference these constants rather than hardcoded values:

```tsx
import { designTokens } from '@/lib/design-tokens'

// Use design tokens in components
const buttonClass = `bg-brand-ocean text-white rounded-${designTokens.borderRadius.md}`

// Or access via Tailwind classes that reference the tokens
<Button className="bg-brand-ocean hover:bg-brand-ocean-dark transition-brand-quick">
```

**Benefits of Design Tokens:**
- **Consistency**: Centralized values ensure uniform design
- **Maintainability**: Change values once, update everywhere
- **Type Safety**: TypeScript interfaces prevent invalid values
- **Scalability**: Easy to extend with new tokens or themes

### Visual Hierarchy Guidelines
- **Primary Actions**: Ocean blue, prominent placement, larger size
- **Secondary Actions**: Outlined style, positioned right of primary
- **Content Priority**: High contrast for important content, muted for supporting info
- **Scanability**: F-pattern layouts, consistent card grids, progressive disclosure

## Contact & Support

For questions about this codebase or architecture decisions, refer to this documentation first. This guide should be updated whenever significant architectural changes are made.