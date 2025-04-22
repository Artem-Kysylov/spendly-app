import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { UserAuth } from '../../context/AuthContext'

// Import components 
import Button from '../ui-elements/Button'
import TextInput from '../ui-elements/TextInput'

// Import types 
import { MainBudgetModalProps } from '../../types/types'


const TotalBudgetModal = ({ title, onClose, onSubmit }: MainBudgetModalProps) => {
    const { session } = UserAuth()
    const dialogRef = useRef<HTMLDialogElement>(null)

    // State 
    const [amount, setAmount] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    useEffect(() => {
        if (dialogRef.current) {
            dialogRef.current.showModal()
        }
        return () => {
            if (dialogRef.current) {
                dialogRef.current.close()
            }
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!session?.user) return onSubmit('Please login to add a transaction', 'error')    
  
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('Transactions')
          .insert({
            user_id: session.user.id,
            amount: Number(amount),
            created_at: new Date().toISOString()
          })
          .select()
  
        if (error) {
          console.error('Error inserting main budget:', error)
          onSubmit('Failed to add main budget. Please try again.', 'error')
        } else {
          console.log('Main budget created successfully:', data)
          setAmount('')
          onClose()
          onSubmit('Main budget created successfully!', 'success')
        }
      } catch (error) {
        console.error('Error:', error)
        onSubmit('An unexpected error occurred. Please try again.', 'error')
      } finally {
        setIsLoading(false)
      }
    }

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4 text-center">{title}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput
            type="number"
            placeholder="Amount(USD)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
        />
        <div className="modal-action justify-center gap-4">
          <Button
            text="Cancel"
            className="btn-ghost text-primary w-[218px]"
            onClick={onClose}
          />
          <Button
            type="submit"
            text="Edit"
            className="btn-primary text-white w-[218px]"
            disabled={isLoading}
            isLoading={isLoading}
          />
        </div>
      </form>
      </div>
  </dialog>
  )
}

export default TotalBudgetModal