// Imports 
import { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

// Import components 
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import TransactionsTable from '../components/TransactionsTable'
import EmptyState from '../components/EmptyState'
import TransactionsCounters from '../components/TransactionsCounters'

// Import hooks 
import { useNavigate } from 'react-router-dom'

// Import types
import { Transaction } from '../types/types'

const Dashboard = () => {
  const { session } = UserAuth()

  const navigate = useNavigate()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = async () => {
    const { data, error } = await supabase.from('Transactions').select('*')
    setTransactions(data as Transaction[])
    if (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div>
      <TopBar/>
      <div className="flex items-center justify-between pl-5 pr-5 mt-[30px] md:flex-col md:items-center md:gap-5 md:text-center">
        <h1 className="text-[35px] font-semibold text-secondary-black">
          Welcome <span className="text-primary">{session?.user?.user_metadata?.name}</span>
        </h1>
        <Button
          className='btn-primary text-white'
          text='Add Transaction'
          onClick={() => navigate('/form')}
        />
      </div>
      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div>
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