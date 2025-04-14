// Imports
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

// Import types
import { ProtectedRouteProps } from '../types/types'


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { session} = UserAuth()
    if(!session) {
        return <Navigate to="/" />
    }
  return children
}

export default ProtectedRoute