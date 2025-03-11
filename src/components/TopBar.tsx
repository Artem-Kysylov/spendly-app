// Imports 
import { UserAuth } from '../context/AuthContext'

// Import components 
import Button from "../components/Button"

const TopBar = () => {
    const { session, signOut } = UserAuth()
    console.log('User session data:', session?.user?.user_metadata)

    return (
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
                <img 
                    src="/Spendly-logo.svg" 
                    alt="Spendly Logo" 
                    className="h-6 w-auto"
                />
            </div>
            <div className="flex items-center gap-2">
                {session?.user?.user_metadata?.avatar_url && (
                    <div className="avatar flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img 
                                className="w-full h-full object-cover"
                                src={session.user.user_metadata.avatar_url}
                                alt='user-avatar'
                            />
                        </div>
                    </div>
                )}
                <Button
                    text='Logout'
                    className='btn-ghost text-primary p-0'
                    onClick={signOut}
                />
            </div>
        </div>
    )
}

export default TopBar