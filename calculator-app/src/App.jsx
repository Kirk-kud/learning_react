import { useState } from 'react'
import calculatorLog from '/calculator.svg'
import './App.css'

function App() {
  const [ firstNumber, setFirstNumber ] = useState(0);
  const [ secondNumber, setSecondNumber ] = useState(0);
  const [ result, setResult ] = useState(0);

  const handleFirstNumberChange = (e) => {
    setFirstNumber(parseInt(e.target.value));
  }

  const handleSecondNumberChange = (e) => {
    setSecondNumber(parseInt(e.target.value));
  }
  
  const addNumbers = () => {
    setResult(firstNumber + secondNumber);
  }

  const subtractNumbers = () => {
    setResult(firstNumber - secondNumber);
  }

  const multiplyNumbers = () => {
    setResult(firstNumber * secondNumber);
  }
  
   const divideNumbers = () => {
    if (secondNumber != 0)
      setResult((firstNumber / secondNumber).toFixed(3));
    else
      setResult(NaN)
  }
  
  return (
    <>
      <div>
        <img id="header-image" src={calculatorLog}/>
        <h1 id="header">
          Welcome to the Calculator App
        </h1>
        <h3>
          Enter two numbers to start the fun!
        </h3>
      </div>
      <div>
        <form>
          <input type="number" onChange={handleFirstNumberChange} />
          <input type="number" onChange={handleSecondNumberChange} />
        </form>
      </div>
      <div id="options"> 
        {/* Picking the operation to use */}
        <button onClick={addNumbers}>
          Add
        </button>
        <button onClick={subtractNumbers}>
          Subtract
        </button>
        <button onClick={multiplyNumbers}>
          Multiply
        </button>
        <button onClick={divideNumbers}>
          Divide
        </button>
      </div>
      <div>
        <h2>Here's the result: {result}</h2>
      </div>
    </>
  )
}

export default App
