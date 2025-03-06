import { Session } from '@supabase/supabase-js'

export interface ButtonProps {
    text: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
}

export interface AuthContextType {
    session: Session | null
    signInWithGoogle: () => Promise<{ error: any }>
    signOut: () => Promise<void>
}