import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

// Import components 
import Button from "../Button"

const Hero = () => {
    const { signInWithGoogle } = useAuth()
    const navigate = useNavigate()

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const { error } = await signInWithGoogle()
        if(!error) {
            navigate('/dashboard')
        }        
    }

  return (
    <section>
        <h1>Explore Spendly app</h1>
        <Button
            text='Sign in with Google'
            className="btn-primary text-white"
            onClick={handleClick}
        />
    </section>
  )
}

export default Hero