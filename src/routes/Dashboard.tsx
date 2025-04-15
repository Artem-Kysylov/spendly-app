// Imports 
import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

// Import components 
import Button from '../components/ui-elements/Button'
import TransactionsTable from '../components/TransactionsTable'
import EmptyState from '../components/EmptyState'
import TransactionsCounters from '../components/TransactionsCounters'
import Spinner from '../components/ui-elements/Spinner'

// Import hooks 
import { useNavigate } from 'react-router-dom'

// Import types
import { Transaction } from '../types/types'

const Dashboard = () => {
  const { session } = UserAuth()

  const navigate = useNavigate()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchTransactions = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from('Transactions').select('*')
    setTransactions(data as Transaction[])
    setTimeout(() => setIsLoading(false), 500)
    if (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])


  return (
    <div>
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
      {isLoading ? (
        <Spinner />
      ) : transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-[30px] px-5 flex flex-col gap-5">
          <TransactionsCounters />
          <TransactionsTable 
            transactions={transactions} 
            onDelete={fetchTransactions} 
          />
        </div>
      )}
    </div>
  )
}

export default Dashboard