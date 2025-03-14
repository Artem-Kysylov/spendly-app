// Imports 
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'
import { ToastMessageProps } from '../types/types'

// Import components 
import Button from './Button'
import ToastMessage from './ToastMessage'

const Form = () => {
  const { session } = UserAuth()

  // State 
  const [title, setTitle] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)
  
  // Handlers 
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

  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    setToastMessage({ text, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
  }

  return (
    <div>
      {toastMessage && <ToastMessage text={toastMessage.text} type={toastMessage.type} />}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Transaction Name" 
            className="input" 
            value={title}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            onInput={handleInput}
          />
          <input 
            type="number" 
            placeholder="Amount(USD)" 
            className="input" 
            value={amount}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount((e.target.value))}
          />
          <div>
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
          text={isLoading ? 'Adding...' : 'Add Transaction'}
          className='btn-primary text-white'
          disabled={isLoading}
        />
      </form>
    </div>
  )
}

export default Form