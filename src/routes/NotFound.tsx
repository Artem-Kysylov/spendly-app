import { useNavigate } from 'react-router-dom'

// Import components
import Button from '../components/Button'

const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div>
      <h1>404</h1>
      <p>Sorry, this page does not exist</p>
      <Button
        text='Go to the login'
        className="btn-primary text-white"
        onClick={handleClick}
      />
    </div>
  )
}

export default NotFound