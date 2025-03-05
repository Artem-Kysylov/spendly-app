// Imports 
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"
import useAuth from './hooks/useAuth'

// Import routes 
import Dashboard from './routes/Dashboard.tsx'
import NotFound from './routes/NotFound.tsx'
import FormPage from './routes/FormPage.tsx'
import LandingPage from './routes/LandingPage.tsx'

function App() {
  const { session } = useAuth()

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
