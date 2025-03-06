// Imports 
import { UserAuth } from '../context/AuthContext' 

// Import components 
import TopBar from '../components/TopBar'

const Dashboard = () => {
  const { session } = UserAuth()
  console.log(session)

  return (
    <div>
      <TopBar/>
      <h1>Welcome {session?.user?.user_metadata?.name}</h1>
    </div>
  )
}

export default Dashboard