import React from 'react'
import useAuth from '../hooks/useAuth'

// Import components 
import TopBar from '../components/TopBar'

const Dashboard = () => {
  const { session } = useAuth()
  console.log(session)

  return (
    <div>
      <TopBar/>
      <h1>Welcome {session?.user?.user_metadata?.name}</h1>
    </div>
  )
}

export default Dashboard