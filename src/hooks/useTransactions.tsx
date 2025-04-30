import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { UserAuth } from '../context/AuthContext'
import { UnifiedTransaction } from '../types/types'

const useTransactions = () => {
    const { session } = UserAuth()
    const [transactions, setTransactions] = useState<UnifiedTransaction[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchTransactions = async () => {
        if (!session?.user?.id) return

        try {
            setIsLoading(true)
            setError(null)

            // 1. Получаем обычные транзакции
            const { data: regularTransactions, error: regularError } = await supabase
                .from('Transactions')
                .select('*')
                .eq('user_id', session.user.id)

            if (regularError) {
                throw new Error('Error fetching regular transactions')
            }

            // 2. Получаем транзакции бюджетов вместе с типом бюджета
            const { data: budgetTransactions, error: budgetError } = await supabase
                .from('Budget_Folder_Transactions')
                .select(`
                    *,
                    Budget_Folders (
                        type
                    )
                `)
                .eq('user_id', session.user.id)

            if (budgetError) {
                throw new Error('Error fetching budget transactions')
            }

            // 3. Нормализуем и объединяем данные
            const normalizedRegularTransactions = regularTransactions?.map(transaction => ({
                ...transaction,
                source: 'general' as const
            })) || []

            const normalizedBudgetTransactions = budgetTransactions?.map(transaction => ({
                ...transaction,
                type: transaction.Budget_Folders?.type || 'expense',
                source: 'budget' as const
            })) || []

            setTransactions([...normalizedRegularTransactions, ...normalizedBudgetTransactions])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            console.error('Error fetching transactions:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions()
    }, [session?.user?.id])

    return {
        transactions,
        isLoading,
        error,
        refetch: fetchTransactions
    }
}

export default useTransactions
