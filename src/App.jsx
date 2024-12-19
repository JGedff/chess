import { Board } from './components'
import './App.css'
import './style.css'

function App() {
  return (
    <div className="container text-center w-500p h-500p">
      <Board initLength={8} initHeight={8} />
    </div>
  )
}

export default App
