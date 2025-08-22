import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AppState {
  user: User | null
  isAuthenticated: boolean
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  
  setUser: (user: User | null) => void
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  logout: () => void
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        theme: 'light',
        sidebarOpen: true,
        
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        
        setTheme: (theme) => {
          set({ theme })
          if (theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        },
        
        toggleTheme: () => set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { theme: newTheme }
        }),
        
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        
        toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: 'tankmate-storage',
        partialize: (state) => ({
          user: state.user,
          theme: state.theme,
          sidebarOpen: state.sidebarOpen,
        }),
      }
    )
  )
)