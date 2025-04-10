// Imports 
import './index.css'
import { BrowserRouter, Routes, Route, Navigate, Outlet, createBrowserRouter } from "react-router-dom"
import { UserAuth } from './context/AuthContext'

// Import routes 
import Dashboard from './routes/Dashboard.tsx'
import Transactions from './routes/Transactions.tsx'
import Budgets from './routes/Budgets.tsx'
import NotFound from './routes/NotFound.tsx'
import FormPage from './routes/FormPage.tsx'
import LandingPage from './routes/LandingPage.tsx'

// Import components 
import ProtectedRoute from './components/ProtectedRoute.tsx'
import TopBar from './components/TopBar.tsx'


function App() {
  const { session } = UserAuth()

  const AppLayout = () => {
    return (
      <div>
        <TopBar/>
        <div>
          <Outlet/>
        </div>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path:'/dashboard',
      element: <AppLayout/>,
      children: [
        {
          path: '/dashboard',
          element: <Dashboard/>
        },       
        {
          path: '/transactions',
          element: <Transactions/>
        },       
        {
          path: '/budgets',
          element: <Budgets/>
        },       
      ]
    }
  ])

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
