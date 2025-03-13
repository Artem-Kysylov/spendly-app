import { Session } from '@supabase/supabase-js'

export interface ButtonProps {
    text: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    type?: 'button' | 'submit' | 'reset',
    disabled?: boolean
}

export interface AuthContextType {
    session: Session | null
    signInWithGoogle: () => Promise<{ error: any }>
    signOut: () => Promise<void>
}

export interface ProtectedRouteProps {
    children: React.ReactNode
}