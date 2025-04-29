// Import components 
import Form from '../components/Form'
import Button from '../components/Button'

// Import hooks 
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
  const navigate = useNavigate()

  

  return (
    <>
      <div className='ml-5 mr-5 mt-[30px]'>
        <Button
          className='btn-ghost text-primary p-0'
          text='Back to Dashboard'
          onClick={() => navigate('/dashboard')}
        />
        <h1 className='text-[25px] font-semibold text-secondary-black mt-[30px] mb-2'>Fill out the form and add new transaction📝</h1>
        <Form />
      </div>
    </>
  )
}

export default FormPage