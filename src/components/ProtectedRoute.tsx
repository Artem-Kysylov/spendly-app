import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = UserAuth()

  if (!session) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute