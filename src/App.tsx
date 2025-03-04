// Imports 
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import { Session, Subscription } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import './index.css'

// Import components 
import Button from "./components/Button"

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
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>Logged in!</div>)
  }
 
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

export default App
