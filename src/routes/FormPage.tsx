// Imports 
import React from 'react'

// Import components 
import TopBar from '../components/TopBar'
import Form from '../components/Form'
import Button from '../components/Button'

// Import hooks 
import { useNavigate } from 'react-router-dom'

const FormPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      <TopBar />
      <Button
        className='btn-ghost text-primary p-0'
        text='Back to Dashboard'
        onClick={() => navigate('/dashboard')}
      />
      <Form />
    </div>
  )
}

export default FormPage