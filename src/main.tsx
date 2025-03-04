// Imports 
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router"

// Import routes 
import Dashboard from './routes/Dashboard.tsx'
import NotFound from './routes/NotFound.tsx'
import FormPage from './routes/FormPage.tsx'
import LandingPage from './routes/LandingPage.tsx'

createRoot(document.getElementById('root')!).render(
  <div data-theme="mytheme">
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/form" element={<FormPage/>} />
          <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  </div>
)
