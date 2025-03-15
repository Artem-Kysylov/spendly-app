// Imports 
import { ToastMessageProps } from '../types/types'

const ToastMessage = ({ text, type }: ToastMessageProps) => {
  const alertClass = type === 'success' ? 'alert-success' : 'alert-error'
  
  return (
    <div className={`alert alert-${alertClass} text-white rounded-lg`}>
        <span>{text}</span>
    </div>
  )
}

export default ToastMessage