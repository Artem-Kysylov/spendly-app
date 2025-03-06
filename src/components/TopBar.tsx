// Imports 
import { UserAuth } from '../context/AuthContext'

// Import components 
import Button from "../components/Button"

const TopBar = () => {
    const { session, signOut } = UserAuth()

  return (
    <div>
        Spendly logo
        <div>
            <div className="avatar">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
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