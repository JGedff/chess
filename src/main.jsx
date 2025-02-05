import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChessPerformance } from './performance/performance.js'

const performance = new ChessPerformance()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <button onClick={performance.all}>PERFORMANCE</button>
  </StrictMode>,
)
