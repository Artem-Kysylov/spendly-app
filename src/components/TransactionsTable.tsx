// Imports 
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'    
import { UserAuth } from '../context/AuthContext'
import { Transaction } from '../types/types'

// Import components 
import Button from '../components/Button'

const TransactionsTable = () => {
  const { session } = UserAuth()
 
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase.from('Transactions').select('*')
      setTransactions(data as Transaction[])
      if (error) {
        console.error('Error fetching transactions:', error)
      }
    }
    fetchTransactions()
  }, [])

  return (
    <div>
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
                            <td>{transaction.type}</td>
                            <td>{transaction.created_at}</td>
                            <td>
                                <Button
                                    text="Delete"
                                    className='btn-ghost text-error'
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