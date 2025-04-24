import './index.css'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from './context/AuthContext'

// Routes
import Dashboard from './routes/Dashboard.tsx'
import Transactions from './routes/Transactions.tsx'
import Budgets from './routes/Budgets.tsx'
import NotFound from './routes/NotFound.tsx'
import LandingPage from './routes/LandingPage.tsx'
import AddNewBudget from './routes/AddNewBudget.tsx'

// Components
import ProtectedRoute from './components/ProtectedRoute.tsx'
import TopBar from './components/TopBar.tsx'

// Main layout
const AppLayout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  )
}

function App() {
  const { session } = UserAuth()

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page  */}
        <Route
          path="/"
          element={!session ? <LandingPage /> : <Navigate to="/dashboard" replace />}
        />

        {/* Add New Budget  */}
        <Route
          path="/add-new-budget"
          element={
            <ProtectedRoute>
              <AddNewBudget />
            </ProtectedRoute>
          }
        />

        {/* App  */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/transactions" 
            element={<Transactions />} 
          />
          <Route 
            path="/budgets" 
            element={<Budgets />} 
          />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
