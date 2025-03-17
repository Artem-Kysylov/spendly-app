// Imports 
import { ToastMessageProps } from '../types/types'

const ToastMessage = ({ text, type }: ToastMessageProps) => {
  const alertClass = type === 'success' ? 'success' : 'error'
  
  return (
    <div className="toast toast-bottom toast-end">
      <div className={`alert alert-${alertClass} text-white rounded-lg`}>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default ToastMessage