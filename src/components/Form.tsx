// Imports 
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'

// Import components 
import Button from './Button'
import ToastMessage from './ToastMessage'

// Import types
import { ToastMessageProps } from '../types/types'

const Form = () => {
  const { session } = UserAuth()

  // State 
  const [title, setTitle] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)

  
  // Handlers 
  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    console.log('Form: Setting toast message:', { text, type });
    setToastMessage({ text, type })
    
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session?.user) return handleToastMessage('Please login to add a transaction', 'error')    

      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('Transactions')
          .insert({
            user_id: session.user.id,
            title: title,
            amount: Number(amount),
            type,
            created_at: new Date().toISOString()
          })
          .select()
  
        if (error) {
          console.error('Error inserting transaction:', error)
          handleToastMessage('Failed to add transaction. Please try again.', 'error')
        } else {
          console.log('Transaction added successfully:', data)
          // Clear form
          setTitle('')
          setAmount('')
          setType('expense')
          handleToastMessage('Transaction added successfully!', 'success')
        }
      } catch (error) {
      console.error('Error:', error)
      handleToastMessage('An unexpected error occurred. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
  }

  return (
    <div className="relative">
      {toastMessage && (
        <ToastMessage text={toastMessage.text} type={toastMessage.type} />
      )}
      <form onSubmit={handleSubmit} className='w-[50vw] rounded-lg light-grey border p-5 flex flex-col gap-5'>
        <input 
          type="text" 
          placeholder="Transaction Name" 
          className="w-full px-4 py-3 rounded-lg border border-primary focus:border-primary focus:outline-none text-base" 
          value={title}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          onInput={handleInput}
        />
        <input 
          type="number" 
          placeholder="Amount(USD)" 
          className="w-full px-4 py-3 rounded-lg border border-primary focus:border-primary focus:outline-none text-base" 
          value={amount}
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount((e.target.value))}
        />
        <div className='flex gap-5'>
          <input 
            type="radio" 
            name="type" 
            id="expense" 
            checked={type === 'expense'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value as 'expense' | 'income')}
            value="expense"
          />
          <label htmlFor="expense">Expense</label>
          <input 
            type="radio" 
            name="type" 
            id="income" 
            checked={type === 'income'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value as 'expense' | 'income')}
            value="income"
          />
          <label htmlFor="income">Income</label>
        </div>
      <Button 
        type='submit'
        text='Add Transaction'
        className='btn-primary text-white'
        disabled={isLoading}
        isLoading={isLoading}
      />
    </form>
    </div>
  )
}

export default Form