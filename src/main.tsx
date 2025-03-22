// Imports 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'



createRoot(document.getElementById('root')!).render(
  <div data-theme="mytheme">
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
  </div>
)
