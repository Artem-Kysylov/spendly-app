// Imports 
import { useState } from 'react'

// Import hooks 
import useModal from '../hooks/useModal'

// Import components 
import NewBudget from '../components/NewBudget'
import NewBudgetModal from '../components/modals/NewBudgetModal'
import ToastMessage from '../components/ui-elements/ToastMessage'

// Import types
import { ToastMessageProps } from '../types/types'

const Budgets = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessageProps | null>(null)
  const { isModalOpen, openModal, closeModal } = useModal()

  const handleToastMessage = (text: string, type: ToastMessageProps['type']) => {
    setToastMessage({ text, type })
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const handleBudgetSubmit = (message: string, type: ToastMessageProps['type']) => {
    handleToastMessage(message, type)
  }

  return (
    <div className='mt-[30px] px-5'>
      {toastMessage && (
        <ToastMessage text={toastMessage.text} type={toastMessage.type} />
      )}
      <div className='flex flex-col items-start gap-[15px] mb-[30px]'>
        <h1 className="text-[35px] font-semibold text-secondary-black">
          Budgets💰
        </h1>
        <p>Let`s organize your transactions</p>
      </div>
      <div>
        <NewBudget onClick={openModal} />
      </div>

      {isModalOpen && (
        <NewBudgetModal
          title="Create a new budget💸"
          onClose={() => {
            closeModal()
            handleToastMessage('Budget creation cancelled', 'error')
          }}
          onSubmit={handleBudgetSubmit}
        />
      )}
    </div>
  )
}

export default Budgets