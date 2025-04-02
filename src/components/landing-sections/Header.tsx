import { useState } from 'react'
import { useSignWithGoogle } from '../../hooks/useSignWithGoogle' 

// Import components
import Button from '../Button'

const Header = () => {
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

          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <a href="/" className="font-medium text-secondary-black">
                  How it works
                </a>
              </li>
              <li>
                <a href="/" className="font-medium text-secondary-black">
                  Why choose us
                </a>
                </li>
              </ul>
          </nav>
          
          <Button 
            text='Sign in with Google'
            className="btn-primary text-white"
            onClick={handleGoogleClick}        
          />
        </div>
      </div>
    </header>
  )
}

export default Header