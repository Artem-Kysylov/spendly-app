// Imports 
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'

// Components 
import BudgetDetailsInfo from '../components/BudgetDetailsInfo'
import BudgetDetailsForm from '../components/BudgetDetailsForm'
import BudgetDetailsControls from '../components/BudgetDetailsControls'
import Spinner from '../components/ui-elements/Spinner'

// Import types
import { BudgetDetailsProps } from '../types/types'

const BudgetDetails = () => {
  const { id } = useParams()
  const { session } = UserAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [budgetDetails, setBudgetDetails] = useState<BudgetDetailsProps>({
    emoji: '😊',
    name: 'Loading...',
    amount: 0
  })

  useEffect(() => {
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
      <BudgetDetailsControls />
      <div className='flex items-start justify-between gap-[20px]'>
        <BudgetDetailsInfo 
          emoji={budgetDetails.emoji}
          name={budgetDetails.name}
          amount={budgetDetails.amount}
        />
        <BudgetDetailsForm />
      </div>
    </div>
  )
}

export default BudgetDetails