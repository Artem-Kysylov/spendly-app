import React from 'react'
import { useSignWithGoogle } from '../../hooks/useSignWithGoogle' 

// Import components 
import Button from "../Button"

const Hero = () => {
    const handleGoogleClick = useSignWithGoogle()

  return (
    <section>
        <h1>Explore Spendly app</h1>
        <Button
            text='Sign in with Google'
            className="btn-primary text-white"
            onClick={handleGoogleClick}
        />
    </section>
  )
}

export default Hero