import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const correctAnswerPoints = 5;
  const [ score, setScore ] = useState(0);
  const [ progressCount, setProgressCount ] = useState(0);
  let [ questions, setQuestions ] = useState([]);

  document.addEventListener('DOMContentLoaded', () => {
    
    
  })

  const handleCorrectAnswer = () => {
    setScore(score + correctAnswerPoints);
  };

  const initialiseQuiz = () => {
    document.getElementById('welcome-display').style.display = "none"
    fetch('https://opentdb.com/api.php?amount=6&type=boolean').then(
      response => {
        if (!response.ok){
          throw new Error("Could not fetch quiz questions");
        }
        return response;
      }        
    ).then(
      response => response.json()
    ).then(
      // checking data for
      data => {
        console.log(data)
        questions = data.results;
        console.log(questions);
      }
    ).catch(
      error => {
        console.error(error.message);
      }
    );
    const node = document.getElementById('display-questions');
    const root = createRoot(node);

    let count = 0;
    const showQuestions = setInterval(() => {
      resetOptions();
      if (!questions[count]){
        clearInterval(showQuestions);
      }
  
      console.log(questions[count]);
      setProgressCount(progressCount + 1);
      console.log('count: ' + progressCount);
      root.render(<Question question={questions[count].question} count={count} />);
      toast.info("Time to answer!", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        theme: "colored"
      })
      count++;
    }, 3000);
   
  };

  function resetOptions() {
    var ele = document.getElementsByName("choice");
    for(var i=0;i<ele.length;i++)
        ele[i].checked = false;
  }

  const resetQuiz = () => {
    document.getElementById('welcome-display').style.display = "block";
    setQuestions([]);
  };

  function Question(props){
    function handleQuestionSubmit() {

    };

    return (
      <>
        <ToastContainer />
        <div id="question-div">
          <h2 className="question-text">
            {props.question}
          </h2>
          <div>
            <fieldset>
              <form>
                <legend>Select an Answer: </legend>
                <input type="radio" id="true" name="choice" value={true} />
                <label htmlFor="true">
                  True
                </label>

                <input type="radio" id="false" name="choice" value={false} />
                <label htmlFor="false">
                  False
                </label>
                <br />
                <input type="submit" value={props.count + 1 < questions.length ? "Next Question" : "Finish Quiz"} />
              </form>
            </fieldset>            
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div id="welcome-display">
        <h1>
          Welcome to the Quiz App
        </h1>
        <h3>
          Take a quick quiz
        </h3>
        <button onClick={initialiseQuiz}>
          Take Quiz
        </button>
      </div>
      <div id="display-questions">
      </div>     
    </>
  )
}

export default App
