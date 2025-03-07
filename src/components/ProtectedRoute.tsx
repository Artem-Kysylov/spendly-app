// Imports 
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { ProtectedRouteProps } from '../types/types'


const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { session} = UserAuth()
    if(!session) {
        return <Navigate to="/" />
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute