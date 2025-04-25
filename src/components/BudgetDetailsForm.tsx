import React, { useState } from 'react'

// Import components 
import TextInput from './ui-elements/TextInput'
import Button from './ui-elements/Button'

const BudgetDetailsForm = () => {
  const [transactionTitle, setTransactionTitle] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  return (
    <div className='w-full rounded-lg border light-grey p-[20px] h-[30vh] flex flex-col justify-center'>
      <h3 className='text-secondary-black text-[25px] font-semibold text-center mb-[20px]'>Add new transaction📝</h3>
      <form className='flex flex-col gap-[20px]'>
        <TextInput
          type="text"
          placeholder="Transaction Name"
          value={transactionTitle}
          onChange={(e) => setTransactionTitle(e.target.value)}
          />    
        <TextInput
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          className="btn-primary text-white"
          text="Add new transaction"
          onClick={() => {}}
        />
      </form>
    </div>
  )
}

export default BudgetDetailsForm