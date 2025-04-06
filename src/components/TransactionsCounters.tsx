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
    <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex flex-col items-center justify-center gap-2 w-full h-[20vh] rounded-lg light-grey border">
            <h3 className="text-6 text-error text-center">Total Expenses</h3>
            <span className="text-[25px] font-semibold text-error text-center">${totalExpenses}</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-full h-[20vh] rounded-lg light-grey border">
            <h3 className="text-6 text-success text-center">Total Income</h3>
            <span className="text-[25px] font-semibold text-success text-center">${totalIncome}</span>
        </div>
    </div>
  )
}

export default TransactionsCounters