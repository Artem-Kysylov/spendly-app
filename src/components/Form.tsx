// Imports 
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'

// Import components 
import Button from './Button'

const Form = () => {
  const { session } = UserAuth()

  // State 
  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [type, setType] = useState<'expense' | 'income'>('expense')

  // Handlers 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!session?.user) return alert("Please login to add a transaction")

      try {
        const { data, error } = await supabase
          .from('transactions')
          .insert({
            user_id: session.user.id,
            name,
            amount: Number(amount),
            type,
            created_at: new Date().toISOString()
          })
          .select()
  
        if (error) {
          console.error('Error inserting transaction:', error)
          alert('Failed to add transaction. Please try again.')
        } else {
          console.log('Transaction added successfully:', data)
          // Clear form
          setName('')
          setAmount('')
          setType('expense')
          alert('Transaction added successfully!')
        }
      } catch (error) {
      console.error('Error:', error)
      alert('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Transaction Name" 
            className="input" 
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Amount (USD)" 
            className="input" 
            value={amount}
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
          text='Add Transaction' 
          className='btn-primary text-white'
        />
      </form>
    </div>
  )
}

export default Form