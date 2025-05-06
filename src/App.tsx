import './index.css'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from './context/AuthContext'

// Routes
import Dashboard from './routes/Dashboard.tsx'
import Transactions from './routes/Transactions.tsx'
import Budgets from './routes/Budgets.tsx'
import NotFound from './routes/NotFound.tsx'
import LandingPage from './routes/LandingPage.tsx'
import AddNewBudget from './routes/CreateNewBudget.tsx'
import BudgetDetails from './routes/BudgetDetails.tsx'

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

          {/* Transactions  */}
          <Route 
            path="/transactions" 
            element={<Transactions />} 
          />

          {/* Budgets  */}
          <Route 
            path="/budgets" 
            element={<Budgets />} 
          />

          {/* Budget Details  */}
          <Route 
            path="/budget/:id" 
            element={<BudgetDetails />} 
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
