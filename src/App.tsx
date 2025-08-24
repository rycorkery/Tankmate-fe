import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/api/query-client'
import { Layout } from '@/components/layout/Layout'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { Dashboard } from '@/pages/Dashboard'
import { Tanks } from '@/pages/Tanks'
import { TankDetail } from '@/pages/TankDetail'
import { Schedule } from '@/pages/Schedule'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { Routes } from '@/lib/constants'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
        <RouterRoutes>
          {/* All routes use the same layout */}
          <Route path={Routes.HOME} element={<Layout />}>
            {/* Public routes */}
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Register />} />
            <Route
              path="features"
              element={<div className="container mx-auto p-8">Features Page</div>}
            />
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tanks" element={<Tanks />} />
              <Route path="tanks/new" element={<div className="container mx-auto p-8">Create Tank (Protected)</div>} />
              <Route path="tanks/:id" element={<TankDetail />} />
              <Route path="tanks/:id/edit" element={<div className="container mx-auto p-8">Edit Tank (Protected)</div>} />
              <Route path="maintenance" element={<Schedule />} />
              <Route path="profile" element={<div className="container mx-auto p-8">Profile Page (Protected)</div>} />
              <Route path="settings" element={<div className="container mx-auto p-8">Settings Page (Protected)</div>} />
            </Route>
            
            <Route
              path="*"
              element={<div className="container mx-auto p-8">404 - Page Not Found</div>}
            />
          </Route>
        </RouterRoutes>
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
