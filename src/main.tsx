// Imports 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router"

// Import routes 
import Dashboard from './routes/Dashboard.tsx'
import NotFound from './routes/NotFound.tsx'
import FormPage from './routes/FormPage.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/form" element={<FormPage/>} />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
)
