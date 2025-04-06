// Imports 
import { useNavigate } from 'react-router-dom'

// Import components
import Button from '../components/Button'

const NotFound = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <img src="/illustration-404.svg" alt="404" />
      <h1 className="text-[100px] leading-none font-semibold text-primary">404</h1>
      <p className="text-[25px] font-semibold text-secondary-black text-center">Sorry, this page does not exist</p>
      <Button
        text='Go to the Home page'
        className="btn-primary text-white"
        onClick={handleClick}
      />
    </div>
  )
}

export default NotFound