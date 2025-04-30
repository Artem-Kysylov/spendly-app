// Imports 
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

// Import components 
import Button from '../components/ui-elements/Button'
import TransactionsTable from '../components/TransactionsTable'
import EmptyState from '../components/EmptyState'
import Counters from '../components/Counters'
import Spinner from '../components/ui-elements/Spinner'
import MainBudgetModal from '../components/modals/MainBudgetModal'
import ToastMessage from '../components/ui-elements/ToastMessage'

// Import hooks 
import useModal from '../hooks/useModal'
import useCheckBudget from '../hooks/useCheckBudget'
import useTransactions from '../hooks/useTransactions'

// Import types
import { ToastMessageProps } from '../types/types'

const Dashboard = () => {
  const { session } = UserAuth()
  const navigate = useNavigate()
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  // Используем хук для получения транзакций
  const { transactions, isLoading: isTransactionsLoading, refetch } = useTransactions()

  // Проверяем наличие бюджета
  const { isLoading: isBudgetChecking } = useCheckBudget(session?.user?.id)

  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    setToastMessage({ text, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleTransactionSubmit = (message: string, type: ToastMessageProps['type']) => {
    handleToastMessage(message, type)
    if (type === 'success') {
      setTimeout(() => {
        refetch()
      }, 1000)
    }
  }

  const handleIconClick = () => {
    openModal()
  }

  const handleDeleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase.from('Transactions').delete().eq('id', id)
      
      if (error) {
        console.error('Error deleting transaction:', error)
        handleToastMessage('Error deleting transaction', 'error')
        return
      }
      
      handleToastMessage('Transaction deleted successfully', 'success')
      // Pause before deleting data from the table
      setTimeout(() => {
        refetch()
      }, 1000)
    } catch (error) {
      console.error('Unexpected error during deletion:', error)
      handleToastMessage('An unexpected error occurred', 'error')
    }
  }

  return (
    <div>
      {(isTransactionsLoading || isBudgetChecking) ? (
        <Spinner />
      ) : (
        <>
          {toastMessage && (
            <ToastMessage text={toastMessage.text} type={toastMessage.type} />
          )}
          <div className="flex flex-col items-center gap-5 text-center mt-[30px] px-5 md:flex-row md:justify-between md:text-left">
            <h1 className="text-[35px] font-semibold text-secondary-black">
              Welcome <span className="text-primary">{session?.user?.user_metadata?.name}✌️</span>
            </h1>
            <Button
              className='btn-primary text-white'
              text='Add Transaction'
              onClick={() => navigate('/transactions')}
            />
          </div>
          <div className="mt-[30px] px-5 flex flex-col gap-5">
            <Counters onIconClick={handleIconClick} />
            {isTransactionsLoading ? (
              <Spinner />
            ) : transactions.length === 0 ? (
              <EmptyState />
            ) : (
              <TransactionsTable 
                transactions={transactions} 
                onDeleteTransaction={handleDeleteTransaction}
                deleteModalConfig={{
                  title: "Delete transaction",
                  text: "Are you sure you want to delete this transaction?"
                }}
              />
            )}
          </div>
          {isModalOpen && <MainBudgetModal title="Edit main budget" onSubmit={handleTransactionSubmit} onClose={closeModal} />}
        </>
      )}
    </div>
  )
}

export default Dashboard