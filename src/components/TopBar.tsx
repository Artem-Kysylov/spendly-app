// Imports 
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'

// Import components 
import Button from "../components/Button"
import Modal from "../components/Modal"

const TopBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { session, signOut } = UserAuth()

    return (
        <>
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
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        </div>
                    )}
                    <Button
                        text='Signout'
                        className='btn-ghost text-primary p-0'
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>
                {isModalOpen && (
                    <Modal 
                        title="Signout"
                        text="Are you sure you want to signout?"
                        onClose={() => setIsModalOpen(false)}
                        signOut={signOut}
                    />
                )}
        </>
    )
}

export default TopBar