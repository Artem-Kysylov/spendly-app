// Imports 
import { useState } from 'react'
import { MdDeleteForever } from "react-icons/md"

// Import components 
import Button from './ui-elements/Button'
import DeleteModal from './modals/DeleteModal'

// Import types
import { UnifiedTransaction } from '../types/types'

interface TransactionsTableProps {
  transactions: UnifiedTransaction[]
  onDeleteTransaction: (id: string) => Promise<void>
  deleteModalConfig?: {
    title: string
    text: string
  }
}

const TransactionsTable = ({ 
  transactions, 
  onDeleteTransaction,
  deleteModalConfig = {
    title: "Delete transaction",
    text: "Are you sure you want to delete this transaction?"
  }
}: TransactionsTableProps) => {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  // Sort transactions 
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  const handleOpenModal = (id: string) => {
    setSelectedTransactionId(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTransactionId(null)
  }

  const handleConfirmDelete = async () => {
    if (selectedTransactionId) {
      await onDeleteTransaction(selectedTransactionId)
      handleCloseModal()
    }
  }
  
  return (
    <div className="relative">
      {/* Modal */}
      {isModalOpen && selectedTransactionId && (
        <DeleteModal 
          title={deleteModalConfig.title}
          text={deleteModalConfig.text}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}
      <div className="overflow-x-auto rounded-[10px] border light-grey bg-base-100">
        <table className="table">
          {/* head */}
          <thead className="border-b">
            <tr>
              <th className="!text-[16px]">#</th>
              <th className="!text-[16px]">Transaction Name</th>
              <th className="!text-[16px]">Amount(USD)</th>
              <th className="!text-[16px]">Type</th>
              <th className="!text-[16px]">Source</th>
              <th className="!text-[16px]">Date</th>
              <th className="!text-[16px]">Delete</th>
            </tr>
          </thead>
          <tbody className="[&>tr]:border-b [&>tr]:border-0">
            {sortedTransactions.map((transaction, index) => (
              <tr key={transaction.id} className="border-0">
                <th>{index + 1}</th>
                <td>{transaction.title}</td>
                <td>{transaction.amount}</td>
                <td>
                  <span className={`badge ${transaction.type === 'expense' ? 'badge-error text-white uppercase text-xs' : 'badge-success text-white uppercase text-xs'}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>
                  <span className={`badge badge-ghost text-xs uppercase`}>
                    {transaction.source}
                  </span>
                </td>
                <td>{new Date(transaction.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    icon={<MdDeleteForever style={{ width: '24px', height: '24px' }}/>}
                    text="Delete"
                    className="btn-ghost text-error"
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