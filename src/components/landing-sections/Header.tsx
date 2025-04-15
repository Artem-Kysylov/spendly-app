import { useState } from 'react'
import { useSignWithGoogle } from '../../hooks/useSignWithGoogle' 
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

// Import components
import Button from '../ui-elements/Button'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  
  const handleGoogleClick = useSignWithGoogle()

  return (
    <header className='border-b light-grey'>
      <div className='landing__container'>
        <div className='pt-[10px] pb-[10px] flex justify-between items-center'>
          <div className="flex items-center">
            <img 
                src="/Spendly-logo.svg" 
                alt="Spendly Logo" 
                className="h-6 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-9">
              <li>
                <a href="#how-it-works" className="font-medium text-secondary-black">
                  How it works
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="font-medium text-secondary-black">
                  Why choose us
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Desktop Button */}
          <div className="hidden lg:block">
            <Button 
              text='Sign in with Google'
              className="btn-primary text-white"
              onClick={handleGoogleClick}        
            />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-secondary-black" 
            onClick={() => setShowMenu(true)}
          >
            <RiMenu3Line size={24} />
          </button>

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
                  <a 
                    href="#how-it-works" 
                    className="font-semibold text-secondary-black text-[20px]"
                    onClick={() => setShowMenu(false)}
                  >
                    How it works
                  </a>
                </li>
                <li>
                  <a 
                    href="#why-choose-us" 
                    className="font-semibold text-secondary-black text-[20px]"
                    onClick={() => setShowMenu(false)}
                  >
                    Why choose us
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Button */}
            <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 w-[90%]">
              <Button 
                text='Sign in with Google'
                className="btn-primary text-white w-full"
                onClick={handleGoogleClick} 
              />       
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header