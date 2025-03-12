// Imports 
import React from 'react'

// Import components 
import Button from './Button'

const Form = () => {
  return (
    <div>
        <input type="text" placeholder="Transaction Name" className="input" />
        <input type="number" placeholder="Amount" className="input" />
      <Button 
        text='Add Transaction' 
        className='btn-primary text-white'
      />
    </div>
  )
}

export default Form