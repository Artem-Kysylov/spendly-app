// Imports 
import { ToastMessageProps } from '../types/types'

const ToastMessage = ({ text, type }: ToastMessageProps) => {
  return (
    <div className="toast">
        <div className={`alert alert-${type} text-white rounded-lg`}>
            <span>{text}</span>
        </div>
    </div>
  )
}

export default ToastMessage