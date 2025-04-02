// Imports 
import React from 'react'
import { useSignWithGoogle } from '../../hooks/useSignWithGoogle' 

// Import components 
import Button from "../Button"

const Hero = () => {
    const handleGoogleClick = useSignWithGoogle()

  return (
    <section className='mt-[120px] flex flex-col items-center'>
      <div className='flex flex-col items-center gap-[30px] max-w-3xl mb-[30px]'>
        <h1 className="text-[55px] font-semibold text-secondary-black text-center">Finance management without extra hassle</h1>
        <p className="font-medium text-secondary-black text-center">Quickly add expenses and income, create budgets, and control your finances in just a few clicks</p>
        <Button
            text='Sign in with Google'
            className="btn-primary text-white w-[203px]"
            onClick={handleGoogleClick}
        />
      </div>
        <img 
          src="/landing-img-1.png" 
          alt="Dashboard image" 
          className="w-full max-w-[875px] h-auto" 
        />        
    </section>
  )
}

export default Hero