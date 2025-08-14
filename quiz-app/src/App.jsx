import Quiz from './components/Quiz'
import { DarkModeProvider } from './context/DarkModeContext' 
import './App.css'

function App() {
  return (
    <>
      <div>
      <DarkModeProvider>
      <Quiz />
      </DarkModeProvider>
      </div>
    </>
  )
}

export default App