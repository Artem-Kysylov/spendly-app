// Imports 
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

// import components 
import Button from './ui-elements/Button'

const BudgetDetailsControls = () => {
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between'>
        <Button
            text="Go to Budgets"
            className="btn-ghost text-primary p-0"
            onClick={() => navigate('/budgets')}
        />
        <div className='flex items-center gap-2'>
            <Button
                icon={<MdEdit style={{ width: '24px', height: '24px' }}/>}
                text="Edit budget"
                className="btn-ghost text-primary p-0"
                onClick={() => {}}
            />
            <Button
              icon={<MdDeleteForever style={{ width: '24px', height: '24px' }}/>}
              text="Delete"
              className="btn-ghost text-error p-0"
              onClick={() => {}}
            />
        </div>
    </div>
  )
}

export default BudgetDetailsControls