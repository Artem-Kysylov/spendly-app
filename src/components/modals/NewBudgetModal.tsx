// Imports 
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { UserAuth } from '../../context/AuthContext'
import EmojiPicker from 'emoji-picker-react'

// Import components 
import Button from '../ui-elements/Button'
import TextInput from '../ui-elements/TextInput'
import RadioButton from '../ui-elements/RadioButton'

// Import types 
import { NewBudgetModalProps } from '../../types/types'

const NewBudgetModal = ({ title, onClose, onSubmit }: NewBudgetModalProps) => {
    const { session } = UserAuth()
    const dialogRef = useRef<HTMLDialogElement>(null)

    // State 
    const [emojiIcon, setEmojiIcon] = useState<string>('😊')
    const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false)
    const [budgetName, setBudgetName] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [type, setType] = useState<'expense' | 'income'>('expense')
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
        if (!session?.user) return onSubmit('Please login to create a budget folder', 'error')    

        try {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('Budget_Folders')
                .insert({
                    user_id: session.user.id,
                    emoji: emojiIcon,
                    name: budgetName,
                    amount: Number(amount),
                    type,
                })
                .select()

            if (error) {
                console.error('Error creating budget folder:', error)
                onSubmit('Failed to create budget folder. Please try again.', 'error')
            } else {
                console.log('Budget folder created successfully:', data)
                setBudgetName('')
                setAmount('')
                setType('expense')
                setEmojiIcon('😊')
                onClose()
                onSubmit('Budget folder created successfully!', 'success')
            }
        } catch (error) {
            console.error('Error:', error)
            onSubmit('An unexpected error occurred. Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')
    }

  return (
    <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
        <h3 className="font-semibold text-[25px] mb-4 text-center">{title}</h3>
        <div>
          <div className='flex items-center justify-center gap-2 mb-[20px]'>
            <Button
              text={emojiIcon}
              className="bg-[#F5F3FF] text-primary text-[25px] w-[60px] h-[60px] flex items-center justify-center rounded-lg hover:opacity-50 transition-opacity duration-300 border-none"
              onClick={() => setOpenEmojiPicker(true)}
            />
            <span className='text-light-grey'>Pick an emoji (optional)</span>
          </div>
          <div className='absolute top-0 right-0'>
            <EmojiPicker 
              open={openEmojiPicker}
              onEmojiClick={(e) => {
                setEmojiIcon(e.emoji)
                setOpenEmojiPicker(false)
              }}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="Budget Name"
              value={budgetName}
              onChange={(e) => setBudgetName(e.target.value)}
              onInput={handleInput}
            />
            <TextInput
              type="number"
              placeholder="Amount(USD)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex gap-4">
            <RadioButton
                title="Expense"
                value="expense"
                currentValue={type}
                variant="expense"
                onChange={(e) => setType(e.target.value as 'expense' | 'income')}
            />
            <RadioButton
                title="Income"
                value="income"
                currentValue={type}
                variant="income"
                onChange={(e) => setType(e.target.value as 'expense' | 'income')}
            />
            </div>
            <div className="modal-action justify-center gap-4">
            <Button
                text="Cancel"
                className="btn-ghost text-primary"
                onClick={onClose}
            />
            <Button
                type="submit"
                text="Create budget"
                className="btn-primary text-white"
                disabled={isLoading}
                isLoading={isLoading}
            />
            </div>
        </form>
        </div>
  </dialog>
  )
}

export default NewBudgetModal