import './App.css'
import './style.css'

import { Board } from './components'

function App() {
  return (
    <div className="border border-dark rounded-8p container text-center w-500p h-500p">
      <Board initLength={8} initHeight={8} />
    </div>
  )
}

export default App
