// Imports 
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// Import components 
import Button from '../components/ui-elements/Button'
import Spinner from '../components/ui-elements/Spinner'
import TransactionsTable from '../components/TransactionsTable'
import EmptyState from '../components/EmptyState'

// Import types
import { Transaction } from '../types/types'

const Transactions = () => {
  // States 
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
        Transactions 📉
        </h1>
        <Button
          className='btn-primary text-white'
          text='Add Transaction'
        />
      </div>

      {isLoading ? (
        <Spinner />
      ) : transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className='mt-[30px] px-5'>
          <TransactionsTable 
            transactions={transactions} 
            onDelete={fetchTransactions} 
          />
        </div>
        )}
    </div>
  )
}

export default Transactions