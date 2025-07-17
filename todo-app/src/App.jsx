import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [ task, setTask ] = useState('');
  const [ tasks, setTasks ] = useState([]);

  const setCompleted = (taskId) => {
    const selectedTask = tasks.find(t => t.id === taskId);

    // setting the resolved status to true
    selectedTask.isResolved = true;
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTask = {
      "id": tasks.length,
      "message": task,
      "isResolved": false
    };

    setTasks([...tasks, newTask]);
  };
 
  return (
    <>
      <div>
        <h1>Welcome to the To-Do List App</h1>

        <h3>
          Here are your tasks:
        </h3>
        <div>
          <ul>
            {tasks.map((t) => (    
              <li key={t.id} style={{ textDecoration: t.isResolved ? 'line-through' : 'none' }}>
                {t.message}
                <button onClick={() => {setCompleted(t.id)}}>
                  Complete Task
                </button>  
              </li>
            ))
          }
        </ul>
        </div> 

        {/* adding functionality for adding a new task */}
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Add a New Task:
            </label>
            <input id="new-task" type="text" value={task} onChange={handleTaskChange}/>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
