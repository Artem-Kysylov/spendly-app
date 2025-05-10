// Imports
import React from 'react'
import { Link } from 'react-router-dom'
import useBudgetCalculations from '../hooks/useBudgetCalculations'

// Import components 
import Spinner from './ui-elements/Spinner'

// Import types 
import { BudgetFolderItemProps } from '../types/types'

const BudgetFolderItemContent = ({ 
  emoji, 
  name, 
  amount, 
  type,
  spentOrEarned,
  remainingAmount,
  isLoading 
}: BudgetFolderItemProps) => {
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center gap-[8px] border light-grey rounded-lg w-full md:w-[335px] md:min-w-[335px] h-[200px]'>
        <Spinner />
      </div>
    )
  }

  const actionText = type === 'expense' ? 'Spent' : 'Earned'

  return (
    <div className='flex flex-col items-center justify-center gap-[8px] border light-grey rounded-lg w-full md:w-[335px] md:min-w-[335px] h-[200px] transition-opacity duration-300 hover:opacity-50'>
        <span className='text-[25px]'>{emoji}</span>
        <h3 className='text-secondary-black text-[16px] font-semibold'>{name}</h3>
        <p className='text-secondary-black text-[25px] font-semibold'>${amount}</p>
        <div className='flex items-center justify-center gap-[10px] opacity-60'>
          <span>${spentOrEarned} {actionText}</span>/<span>${remainingAmount} Remaining</span>
        </div>
    </div>
  )
}

const BudgetFolderItem = ({ id, emoji, name, amount, type }: Omit<BudgetFolderItemProps, 'spentOrEarned' | 'remainingAmount' | 'isLoading'>) => {
  const calculations = useBudgetCalculations(id)

  return (
    <Link to={`/budget/${id}`} className='cursor-pointer w-full md:w-auto'>
      <BudgetFolderItemContent
        id={id}
        emoji={emoji}
        name={name}
        amount={amount}
        type={type}
        spentOrEarned={calculations.spentOrEarned}
        remainingAmount={calculations.remainingAmount}
        isLoading={calculations.isLoading}
      />
    </Link>
  )
}

export default BudgetFolderItem