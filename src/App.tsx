import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Landing } from '@/pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="about" element={<div className="container mx-auto p-8">About Page</div>} />
          <Route
            path="features"
            element={<div className="container mx-auto p-8">Features Page</div>}
          />
          <Route
            path="contact"
            element={<div className="container mx-auto p-8">Contact Page</div>}
          />
          <Route path="login" element={<div className="container mx-auto p-8">Login Page</div>} />
          <Route
            path="signup"
            element={<div className="container mx-auto p-8">Sign Up Page</div>}
          />
          <Route
            path="*"
            element={<div className="container mx-auto p-8">404 - Page Not Found</div>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
