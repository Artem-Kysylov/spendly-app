// Imports 
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient' 
import { MdModeEditOutline } from 'react-icons/md'
import { UserAuth } from '../context/AuthContext'

// Import hooks
import useTransactions from '../hooks/useTransactions'

const TransactionsCounters = ({ onIconClick }: { onIconClick: () => void }) => {
    const { session } = UserAuth()
    const { transactions } = useTransactions()
    const [budget, setBudget] = useState(0)

    // Calculate totals from all transactions (both general and budget)
    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((total, t) => total + t.amount, 0)

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((total, t) => total + t.amount, 0)

    useEffect(() => {
        const fetchBudget = async () => {
            if (!session?.user?.id) return

            const { data, error } = await supabase
                .from('Main_Budget')
                .select('amount')
                .eq('user_id', session.user.id)
                .single()

            if (error) {
                console.error('Error fetching budget:', error)
                return
            }

            if (data) {
                setBudget(data.amount)
            }
        }

        fetchBudget()
    }, [session?.user?.id])
    
    return (
        <div className="flex flex-col md:flex-row justify-between gap-5">
            <div className="flex flex-col items-center justify-center gap-2 w-full h-[20vh] rounded-lg light-grey border relative">
                <div className="absolute top-5 right-5 cursor-pointer" onClick={onIconClick}>
                    <MdModeEditOutline className="text-primary text-[24px] duration-300 hover:opacity-50" />
                </div>
                <h3 className="text-6 text-primary text-center">Total Budget</h3>
                <span className="text-[25px] font-semibold text-primary text-center">${budget}</span>
            </div>
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