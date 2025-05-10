// Imports 
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'

// Import hooks 
import useModal from '../hooks/useModal'


// Import components 
import NewBudget from '../components/AddNewBudgetFolder'
import NewBudgetModal from '../components/modals/BudgetModal'
import ToastMessage from '../components/ui-elements/ToastMessage'
import BudgetFolderItem from '../components/BudgetFolderItem'

// Import types
import { ToastMessageProps } from '../types/types'
import { BudgetFolderItemProps } from '../types/types'

const Budgets = () => {
  const { session } = UserAuth()
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)
  const [budgetFolders, setBudgetFolders] = useState<BudgetFolderItemProps[]>([])
  
  const { isModalOpen, openModal, closeModal } = useModal()

  const fetchBudgetFolders = async () => {
    if (!session?.user?.id) return

    try {
      const { data, error } = await supabase
        .from('Budget_Folders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching budget folders:', error)
        handleToastMessage('Failed to load budget folders', 'error')
        return
      }

      if (data) {
        setBudgetFolders(data)
      }
    } catch (error) {
      console.error('Error:', error)
      handleToastMessage('An unexpected error occurred', 'error')
    }
  }

  useEffect(() => {
    fetchBudgetFolders()
  }, [session?.user?.id])

  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    setToastMessage({ text, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleBudgetSubmit = async (emoji: string, name: string, amount: number, type: 'expense' | 'income') => {
    try {
      const { error } = await supabase
        .from('Budget_Folders')
        .insert({
          user_id: session?.user?.id,
          emoji,
          name,
          amount,
          type
        })

      if (error) {
        handleToastMessage('Failed to create budget', 'error')
        return
      }

      handleToastMessage('Budget created successfully', 'success')
      closeModal()
      fetchBudgetFolders()
    } catch (error) {
      handleToastMessage('An unexpected error occurred', 'error')
    }
  }

  return (
    <div className='mt-[30px] px-5'>
      {toastMessage && (
        <ToastMessage text={toastMessage.text} type={toastMessage.type} />
      )}
      <div className='flex flex-col items-center text-center md:items-start md:text-left gap-[15px] mb-[30px]'>
        <h1 className="text-[35px] font-semibold text-secondary-black">
          Budgets💰
        </h1>
        <p>Let's organize your budgets by folders</p>
      </div>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-[20px] md:flex-wrap w-full'>
        <NewBudget onClick={openModal} />
        {budgetFolders.map((folder) => (
          <BudgetFolderItem 
            key={folder.id}
            id={folder.id}
            emoji={folder.emoji}
            name={folder.name}
            amount={folder.amount}
            type={folder.type}
          />
        ))}
      </div>

      {isModalOpen && (
        <NewBudgetModal
          title="Create a new budget💸"
          onClose={() => {
            closeModal()
          }}
          onSubmit={handleBudgetSubmit}
          handleToastMessage={handleToastMessage}
        />
      )}
    </div>
  )
}

export default Budgets