import React from 'react'

// Import components 
import Button from "../components/Button"

const LandingPage = () => {
  return (
    <>
        <h1>Explore Spendly app</h1>
        <Button
            text='Sign in with Google'
            className="btn-primary text-white"
        />
    </>
  )
}

export default LandingPage