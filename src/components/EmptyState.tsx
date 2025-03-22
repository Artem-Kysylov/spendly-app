// Imports 
import { useNavigate } from 'react-router-dom'

// Import components 
import Button from './Button'

const EmptyState = () => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/form')
  }

  return (
    <div>
        <h1>Don`t have any transactions yet?</h1>
        <p>Create new by clicking this button</p>
        <Button 
          className="btn-primary text-white"
          text="Add Transaction"
          onClick={handleClick} 
        />
    </div>
  )
}

export default EmptyState