import { Outlet } from 'react-router-dom'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { SideNav } from './SideNav'
import { useStore } from '@/store/useStore'

export function Layout() {
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1">
        {isAuthenticated && <SideNav />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
