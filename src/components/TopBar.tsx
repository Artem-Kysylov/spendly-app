// Imports 
import { useState } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useLocation } from 'react-router-dom'
import useModal from '../hooks/useModal'
import { Link } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

// Import components 
import Button from "../components/ui-elements/Button"
import SignOutModal from './modals/SignOutModal'

const TopBar = () => {
    const location = useLocation()
    const [showMenu, setShowMenu] = useState(false)
    // Hooks
    const { isModalOpen, openModal, closeModal } = useModal()
    const { session, signOut } = UserAuth()

    return (
        <>
            {isModalOpen && (
                <SignOutModal 
                    title="Signout"
                    text="Are you sure you want to signout?"
                    onClose={closeModal}
                    signOut={signOut}
                />
            )}
            <div className="flex justify-between items-center p-5 border-b light-grey">
                {/* Mobile Menu Button */}
                <button 
                    className="lg:hidden text-secondary-black" 
                    onClick={() => setShowMenu(true)}
                >
                    <RiMenu3Line size={24} />
                </button>

                <div className="lg:flex lg:items-center">
                    <img 
                        src="/Spendly-logo.svg" 
                        alt="Spendly Logo" 
                        className="w-[122px] h-[33px]"
                    />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        <li>
                            <Link 
                                to="/dashboard" 
                                className={`font-medium transition-colors duration-300 hover:text-primary ${
                                    location.pathname === '/dashboard' 
                                    ? 'text-primary' 
                                    : 'text-secondary-black'
                                }`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/transactions" 
                                className={`font-medium transition-colors duration-300 hover:text-primary ${
                                    location.pathname === '/transactions' 
                                    ? 'text-primary' 
                                    : 'text-secondary-black'
                                }`}
                            >
                                Transactions
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/budgets" 
                                className={`font-medium transition-colors duration-300 hover:text-primary ${
                                    location.pathname === '/budgets' 
                                    ? 'text-primary' 
                                    : 'text-secondary-black'
                                }`}
                            >
                                Budgets
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center gap-2">
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

                {/* Mobile Menu */}
                <div 
                    className={`fixed left-0 w-full h-screen bg-white z-50 flex flex-col transition-all duration-300 ${
                        showMenu ? 'top-0' : 'top-[-100%]'
                    }`}
                >
                    <button 
                        className="absolute top-[20px] right-[20px] text-secondary-black" 
                        onClick={() => setShowMenu(false)}
                    >
                        <RiCloseLine size={30} />
                    </button>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 flex items-center justify-center">
                        <ul className="flex flex-col items-center gap-8">
                            <li>
                                <Link 
                                    to="/dashboard" 
                                    className="font-semibold text-secondary-black text-[20px]"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/transactions" 
                                    className="font-semibold text-secondary-black text-[20px]"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Transactions
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    to="/budgets" 
                                    className="font-semibold text-secondary-black text-[20px]"
                                    onClick={() => setShowMenu(false)}
                                >
                                    Budgets
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default TopBar