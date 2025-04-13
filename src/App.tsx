// Imports 
import './index.css'
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom"

// Import routes 
import Dashboard from './routes/Dashboard.tsx'
import Transactions from './routes/Transactions.tsx'
import Budgets from './routes/Budgets.tsx'
import NotFound from './routes/NotFound.tsx'
import LandingPage from './routes/LandingPage.tsx'

// Import components 
import ProtectedRoute from './components/ProtectedRoute.tsx'
import TopBar from './components/TopBar.tsx'


function App() {

  const AppLayout = () => {
    return (
      <ProtectedRoute>
        <div>
          <TopBar/>
          <div>
            <Outlet/>
          </div>
        </div>
      </ProtectedRoute>
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
    },
    {
      path: '/',
      element: <LandingPage/>,
    },
    {
      path: '/*',
      element: <NotFound/>
    },
  ])


return (
  <RouterProvider router={router} />
  )
}

export default App
