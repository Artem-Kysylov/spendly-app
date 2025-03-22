// Imports 
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { UserAuth } from './context/AuthContext'

// Import routes 
import Dashboard from './routes/Dashboard.tsx'
import NotFound from './routes/NotFound.tsx'
import FormPage from './routes/FormPage.tsx'
import LandingPage from './routes/LandingPage.tsx'

// Import components 
import ProtectedRoute from './components/ProtectedRoute.tsx'

function App() {
  const { session } = UserAuth()

return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={!session ? <LandingPage /> : <Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/form"
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
