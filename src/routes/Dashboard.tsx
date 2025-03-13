// Imports 
import { UserAuth } from '../context/AuthContext' 

// Import components 
import TopBar from '../components/TopBar'
import Button from '../components/Button'
import TransactionsTable from '../components/TransactionsTable'

// Import hooks 
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const { session } = UserAuth()
  console.log(session)
  const navigate = useNavigate()

  return (
    <div>
      <TopBar/>
      <h1>Welcome {session?.user?.user_metadata?.name}</h1>
      <Button
        className='btn-primary text-white'
        text='Add Transaction'
        onClick={() => navigate('/form')}
      />
      <TransactionsTable/>
    </div>
  )
}

export default Dashboard