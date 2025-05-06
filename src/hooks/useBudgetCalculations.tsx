// Imports
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

// Import types
import { BudgetCalculations } from '../types/types'


const useBudgetCalculations = (folderId: string): BudgetCalculations => {
  const [calculations, setCalculations] = useState<BudgetCalculations>({
    totalTransactions: 0,
    remainingAmount: 0,
    spentOrEarned: 0,
    isLoading: true,
    error: null,
    type: null
  })

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        // Получаем информацию о папке бюджета
        const { data: folderData, error: folderError } = await supabase
          .from('Budget_Folders')
          .select('*')
          .eq('id', folderId)
          .single()

        if (folderError) throw folderError

        // Получаем все транзакции для этой папки
        const { data: transactionsData, error: transactionsError } = await supabase
          .from('Budget_Folder_Transactions')
          .select('amount, type')  // Добавляем тип транзакции в выборку
          .eq('budget_folder_id', folderId)

        if (transactionsError) throw transactionsError

        // Подсчитываем суммы транзакций по типу
        const expenseSum = transactionsData
          .filter(t => t.type === 'expense')
          .reduce((sum, t) => sum + (t.amount || 0), 0)

        const incomeSum = transactionsData
          .filter(t => t.type === 'income')
          .reduce((sum, t) => sum + (t.amount || 0), 0)

        let remainingAmount = 0
        let spentOrEarned = 0
        
        // Вычисляем суммы в зависимости от типа бюджета
        if (folderData.type === 'expense') {
          // Для expense папки учитываем только расходы
          spentOrEarned = expenseSum
          remainingAmount = Math.max(0, folderData.amount - expenseSum)
        } else {
          // Для income папки учитываем только доходы
          spentOrEarned = incomeSum
          remainingAmount = Math.max(0, folderData.amount - incomeSum)
        }

        setCalculations({
          totalTransactions: folderData.type === 'expense' ? expenseSum : incomeSum,
          remainingAmount,
          spentOrEarned,
          isLoading: false,
          error: null,
          type: folderData.type
        })

      } catch (error: any) {
        setCalculations(prev => ({
          ...prev,
          isLoading: false,
          error: error.message,
          type: null
        }))
      }
    }

    if (folderId) {
      fetchBudgetData()
    }
  }, [folderId])

  return calculations
}

export default useBudgetCalculations
