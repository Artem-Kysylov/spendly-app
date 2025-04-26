// Imports 
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'

// Import hooks
import useModal from '../hooks/useModal'

// Components 
import BudgetDetailsInfo from '../components/BudgetDetailsInfo'
import BudgetDetailsForm from '../components/BudgetDetailsForm'
import BudgetDetailsControls from '../components/BudgetDetailsControls'
import Spinner from '../components/ui-elements/Spinner'
import ToastMessage from '../components/ui-elements/ToastMessage'
import DeleteModal from '../components/modals/DeleteModal'
import BudgetModal from '../components/modals/BudgetModal'

// Import types
import { BudgetDetailsProps } from '../types/types'
import { ToastMessageProps } from '../types/types'

const BudgetDetails = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { session } = UserAuth()
  
  // States 
  const { isModalOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal()
  const { isModalOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)
  const [budgetDetails, setBudgetDetails] = useState<BudgetDetailsProps>({
    emoji: '😊',
    name: 'Loading...',
    amount: 0
  })

  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    setToastMessage({ text, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleTransactionSubmit = async (title: string, amount: string) => {
    if (!session?.user?.id || !id) return

    try {
      setIsSubmitting(true)
      const { error } = await supabase
        .from('Budget_Folder_Transactions')
        .insert({
          budget_folder_id: id,
          user_id: session.user.id,
          title,
          amount: Number(amount),
        })
        .select()

      if (error) {
        console.error('Error creating transaction:', error)
        handleToastMessage('Failed to add transaction. Please try again.', 'error')
        return
      }

      handleToastMessage('Transaction added successfully!', 'success')
      // Здесь в будущем можно добавить обновление списка транзакций
    } catch (error) {
      console.error('Error:', error)
      handleToastMessage('An unexpected error occurred', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteBudget = async () => {
    if (!session?.user?.id || !id) return

    try {
      setIsDeleting(true)
      const { error } = await supabase
        .from('Budget_Folders')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user.id)

      if (error) {
        console.error('Error deleting budget:', error)
        handleToastMessage('Failed to delete budget. Please try again.', 'error')
        return
      }

      handleToastMessage('Budget deleted successfully!', 'success')
      setTimeout(() => {
        navigate('/budgets')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      handleToastMessage('An unexpected error occurred', 'error')
    } finally {
      setIsDeleting(false)
      closeDeleteModal()
    }
  }

  const handleUpdateBudget = async (emoji: string, name: string, amount: number) => {
    if (!session?.user?.id || !id) return

    try {
      setIsSubmitting(true)
      const { error } = await supabase
        .from('Budget_Folders')
        .update({ emoji, name, amount })
        .eq('id', id)
        .eq('user_id', session.user.id)

      if (error) {
        console.error('Error updating budget:', error)
        handleToastMessage('Failed to update budget. Please try again.', 'error')
        return
      }

      handleToastMessage('Budget updated successfully!', 'success')
      closeEditModal()
      fetchBudgetDetails()
    } catch (error) {
      console.error('Error:', error)
      handleToastMessage('An unexpected error occurred', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fetchBudgetDetails = async () => {
    if (!session?.user?.id || !id) return

    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('Budget_Folders')
        .select('emoji, name, amount')
        .eq('id', id)
        .eq('user_id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching budget details:', error)
        return
      }

      if (data) {
        setBudgetDetails(data)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchBudgetDetails()
  }, [id, session?.user?.id])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className='mt-[30px] px-5'>
      {toastMessage && (
        <ToastMessage text={toastMessage.text} type={toastMessage.type} />
      )}
      <BudgetDetailsControls 
        onDeleteClick={openDeleteModal}
        onEditClick={openEditModal}
      />
      <div className='flex items-start justify-between gap-[20px]'>
        <BudgetDetailsInfo 
          emoji={budgetDetails.emoji}
          name={budgetDetails.name}
          amount={budgetDetails.amount}
        />
        <BudgetDetailsForm 
          onSubmit={handleTransactionSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          title="Delete Budget"
          text="Are you sure you want to delete this budget?"
          onClose={closeDeleteModal}
          onConfirm={handleDeleteBudget}
          isLoading={isDeleting}
        />
      )}
      {isEditModalOpen && (
        <BudgetModal
          title="Edit Budget"
          onClose={closeEditModal}
          onSubmit={handleUpdateBudget}
          isLoading={isSubmitting}
          initialData={budgetDetails}
        />
      )}
    </div>
  )
}

export default BudgetDetails