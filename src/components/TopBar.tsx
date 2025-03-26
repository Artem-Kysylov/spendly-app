// Imports 
import { UserAuth } from '../context/AuthContext'
import useModal from '../hooks/useModal'

// Import components 
import Button from "../components/Button"
import Modal from "../components/Modal"

const TopBar = () => {
    // Hooks
    const { isModalOpen, openModal, closeModal } = useModal()

    const { session, signOut } = UserAuth()

    return (
        <>
            {isModalOpen && (
                <Modal 
                    title="Signout"
                    text="Are you sure you want to signout?"
                    onClose={closeModal}
                    signOut={signOut}
                    />
                )}
            <div className="flex justify-between items-center p-5 bg-white border-b light-grey">
                <div className="flex items-center">
                    <img 
                        src="/Spendly-logo.svg" 
                        alt="Spendly Logo" 
                        className="h-6 w-auto"
                    />
                </div>
                <div className="flex items-center gap-2 bg-white">
                    {session?.user?.user_metadata?.avatar_url && (
                        <div className="avatar flex items-center justify-center bg-white">
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
                        onClick={openModal}
                    />
                </div>
            </div>
        </>
    )
}

export default TopBar