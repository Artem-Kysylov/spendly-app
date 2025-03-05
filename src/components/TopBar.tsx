import React from 'react'
import useAuth from '../hooks/useAuth'

// Import components 
import Button from "../components/Button"

const TopBar = () => {
    const { session, signOut } = useAuth()

  return (
    <div>
        Spendly logo
        <div>
            <div className="avatar">
                <div className="w-8 rounded">
                    <img 
                        src={session?.user?.user_metadata?.avatar_url} 
                        alt='user-avatar'
                    />
                </div>
            </div>
            <Button
                text='Logout'
                className='btn-ghost text-primary'
                onClick={signOut}
            />
        </div>
    </div>
  )
}

export default TopBar