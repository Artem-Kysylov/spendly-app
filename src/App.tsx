// Imports 
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { Session, Subscription } from '@supabase/supabase-js'
import './index.css'

// Import routes 
import Dashboard from './routes/Dashboard'
import LandingPage from './routes/LandingPage'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    }: { data: { subscription: Subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<LandingPage/>)
  }
  else {
    return (<Dashboard/>)
  }
}

export default App
