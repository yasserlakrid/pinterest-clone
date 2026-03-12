import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './application/App'
import Auth from './auth/authPage'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth/>
  </StrictMode>,
)
