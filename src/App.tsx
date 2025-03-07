// Imports 
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"
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
          <Route path="/" element={!session ? <LandingPage /> : <Dashboard />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/form" element={<FormPage/>} />
          <Route path="/*" element={<NotFound/>} />
      </Routes>
  </BrowserRouter>
  )
}

export default App
