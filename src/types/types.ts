import { Session } from '@supabase/supabase-js'
import { ReactNode } from 'react'

export interface ButtonProps {
    text: ReactNode,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean,
    isLoading?: boolean
}

export interface AuthContextType {
    session: Session | null
    signInWithGoogle: () => Promise<{ error: any }>
    signOut: () => Promise<void>
}

export interface ProtectedRouteProps {
    children: React.ReactNode
}

export interface ToastMessageProps {
    text: string,
    type: 'success' | 'error',
}

export interface Transaction {
    id: string,
    title: string,
    amount: number,
    type: 'expense' | 'income',
    created_at: string
}

export interface TransactionsTableProps {
    transactions: Transaction[]
    onDelete: () => void
}

export interface ModalProps {
    title: string,
    text: string,
    onClose: () => void,
    onConfirm?: () => void,
    signOut?: () => void
}