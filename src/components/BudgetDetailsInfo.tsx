// Import types 
import { BudgetDetailsProps } from '../types/types' 

const BudgetDetailsInfo = ({ 
  emoji, 
  name, 
  amount,
  type,
  spentOrEarned,
  remainingAmount,
  isLoading 
}: BudgetDetailsProps) => {
  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center gap-[8px] border light-grey rounded-lg w-full min-h-[300px]'>
        <span className='text-[25px]'>Loading...</span>
      </div>
    )
  }

  const actionText = type === 'expense' ? 'Spent' : 'Earned'

  return (
    <div className='flex flex-col items-center justify-center gap-[8px] border light-grey rounded-lg w-full min-h-[300px]'>
      <span className='text-[25px]'>{emoji}</span>
      <h1 className='text-secondary-black text-[25px] font-semibold'>{name}</h1>
      <p className='text-secondary-black text-[25px] font-semibold'>${amount}</p>
      <div className='flex items-center justify-center gap-[10px] opacity-60'>
        <span>${spentOrEarned} {actionText}</span>/<span>${remainingAmount} Remaining</span>
      </div>
    </div>
  )
}

export default BudgetDetailsInfo