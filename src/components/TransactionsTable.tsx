// Imports 
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'    
import useModal from '../hooks/useModal'
import { MdDeleteForever } from "react-icons/md"

// Import components 
import Button from '../components/Button'
import ToastMessage from './ToastMessage'
import Modal from './Modal'

// Import types
import { ToastMessageProps, TransactionsTableProps } from '../types/types'


const TransactionsTable = ({ transactions, onDelete }: TransactionsTableProps) => {
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)

  // Hooks
  const { isModalOpen, openModal, closeModal } = useModal()

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from('Transactions').delete().eq('id', id)
      
      if (error) {
        console.error('Error deleting transaction:', error)
        handleToastMessage('Error deleting transaction', 'error')
        return
      }
      
      handleToastMessage('Transaction deleted successfully', 'success')
      onDelete()
    } catch (error) {
      console.error('Unexpected error during deletion:', error)
      handleToastMessage('An unexpected error occurred', 'error')
    } finally {
      closeModal()
      setSelectedTransactionId(null)
    }
  }

  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    setToastMessage({ text, type })
    
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleOpenModal = (id: string) => {
    setSelectedTransactionId(id)
    openModal()
  }

  const handleCloseModal = () => {
    closeModal()
    setSelectedTransactionId(null)
  }
  
  return (
    <div className="relative">
      {/* Toast message */}
      {toastMessage && (
        <ToastMessage text={toastMessage.text} type={toastMessage.type} />
      )}
      {/* Modal */}
      {isModalOpen && selectedTransactionId && (
        <Modal 
          title="Delete transaction"
          text="Are you sure you want to delete this transaction?"
          onClose={handleCloseModal}
          onConfirm={() => handleDelete(selectedTransactionId)}
        />
      )}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Transaction Name</th>
              <th>Amount(USD)</th>
              <th>Type</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <th>{index + 1}</th>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span className={`badge ${transaction.type === 'expense' ? 'badge-error text-white uppercase text-xs' : 'badge-success text-white uppercase text-xs'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                <td>

                  <Button
                    icon={<MdDeleteForever style={{ width: '24px', height: '24px' }}/>}
                    text="Delete"
                    className='btn-ghost text-error'
                    onClick={() => handleOpenModal(transaction.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionsTable