import App from '@/App'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'

const rootEl = document.getElementById('root')
if (rootEl == null) {
  throw new Error('Root container #root was not found in the DOM')
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
