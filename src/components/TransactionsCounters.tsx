// Imports 
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient' 

// Import types
import { Transaction } from '../types/types'


const TransactionsCounters = () => {
    const [totalExpenses, setTotalExpenses] = useState(0)
    const [totalIncome, setTotalIncome] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
            .from('Transactions')
            .select('type, amount') as { data: Transaction[] | null, error: any }

            if (error) {
                console.error('Error fetching transactions:', error)
                return
            }
          
            const expensesTotal = data?.filter(t => t.type === 'expense').reduce((total, t) => total + t.amount, 0) || 0
            const incomeTotal = data?.filter(t => t.type === 'income').reduce((total, t) => total + t.amount, 0) || 0

            setTotalExpenses(expensesTotal)
            setTotalIncome(incomeTotal)
        };

        fetchData();
    }, []);
    
  return (
    <div>
        <div>
            <h3>Total Expenses</h3>
            <span>${totalExpenses}</span>
        </div>
        <div>
            <h3>Total Income</h3>
            <span>${totalIncome}</span>
        </div>
    </div>
  )
}

export default TransactionsCounters