import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ count, setCount ] = useState(0)
  const [ min, setMin ] = useState(0);
  const [ max, setMax ] = useState(15);

  const decreaseCount = () => {
    console.log("Count: " + count + " Min: " + min);
    if (count === min || count < min){
     setCount(count);
     document.getElementById('error-detail').innerText = "Count has reached its minimum: " + min;
   }
   else{
     setCount(count - 1);
     console.log("Count decremented by 1");
     document.getElementById('error-detail').innerText = "";
   }
  };

  const increaseCount = () => {
    console.log("Count: " + count + " Max: " + max);
    if (count === max || count > max){
     setCount(count);
     document.getElementById('error-detail').innerText = "Count has reached its max: " + max;
   }
   else{
     setCount(count + 1);
     console.log("Count incremented by 1");
     document.getElementById('error-detail').innerText = "";
   }
  }

  const handleMinChange = (e) => {
    setMin(parseInt(e.target.value));
    setCount(min);
  };

  const handleMaxChange = (e) => {
    setMax(parseInt(e.target.value));
    setCount(max);
  };

  return (
    <>
      <div>
        <h1>Welcome to the Counter App</h1>
        <h2>Count: {count}</h2>
        <div>
          <label>
            Set Minimum Value:
          </label>
          <input onChange={handleMinChange} type="number" value={min}/>
          <label>
            Set Maximum Value:
          </label>
          <input onChange={handleMaxChange} type="number" value={max}/>
        </div>
        <div>
          <label>
            Increase:
          </label>
          <button onClick={increaseCount}>
            +
          </button>
          <label>
            Decrease:
          </label>
          <button onClick={decreaseCount}>
            -
          </button>
        </div>
        <h2 id="error-detail">

        </h2>
      </div>
    </>
  )
}

export default App
