import { useState, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const correctAnswerPoints = 5;
  let [ score, setScore ] = useState(0);
  let [ questions, setQuestions ] = useState([]);
  const questionTime = 5000;
  // const trueInputRef = useRef(null);
  // const falseInputRef = useRef(null);

  const trueInput = useRef(false);
  const falseInput = useRef(false);
  
  document.addEventListener('DOMContentLoaded', () => {
    
  })

  function showCorrectAnswer() {
    toast.success(`Correct for ${correctAnswerPoints} points`, {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: "colored"
    })
  }

  function showWrongAnswer() {
    toast.error('Wrong answer...', {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: "colored"
    })
  }

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
      toast.dismiss();
      if (count > 0){
        var correctAnswer = Boolean(questions[count - 1].correct_answer);
        console.log("Correct Answer: " + correctAnswer);
        console.log("True Input: " + trueInput.current);
        console.log("False Input: " + falseInput.current);

        if ((correctAnswer && trueInput.current) || (!correctAnswer && falseInput.current)){
          score += correctAnswerPoints;
          showCorrectAnswer();
        }
        else {
          showWrongAnswer();
        }

        falseInput.current = false;
        trueInput.current = false;
      }
      resetOptions();
      console.log("Options have been reset");

      if (!questions[count]){
        clearInterval(showQuestions);
        root.render(<Results score={score} />);
        return;
      }
  
      console.log(Boolean(questions[count].correct_answer));
      
      root.render(<Question question={questions[count].question} count={count} />);
      
      console.log("True Radio Input: " + trueInput.current);
      console.log("False Radio Input: " + falseInput.current);

      toast.info("Time to answer!", {
        position: "top-left",
        autoClose: (questionTime - 1000),
        pauseOnHover: false,
        hideProgressBar: false,
        theme: "colored"
      })
      count++;
      console.log(score);
    }, questionTime);
  };

  function resetOptions() {
    var choices = document.getElementsByName("choice");
    for (var i = 0; i<choices.length; i++)
        choices[i].checked = false;
    
  }

  const resetQuiz = () => {
    document.getElementById('welcome-display').style.display = "block";
    setQuestions([]);
  };

  function Question(props){
    // Using a ref to keep track of answers
    
    const handleQuestionSubmit = () => {
      console.log("Question Answered");
    };

    const handleTrueInputChange = (e) => {
      console.log(e.target.checked);
      trueInput.current = e.target.checked;
    }

    const handleFalseInputChange = (e) => {
      console.log(e.target.checked)
      falseInput.current = e.target.checked;
    }

    return (
      <>
        <ToastContainer />
        <div id="question-div">
          <h2 className="question-text">
            {new DOMParser().parseFromString(props.question, "text/html").body.textContent}
          </h2>
          <div>
            <fieldset>
              <form id="question-form"> {/*  ref="formRef" */}
                <legend>Select an Answer: </legend>
                <input type="radio" id="true" name="choice" value={true} onChange={handleTrueInputChange} /> {/* ref={trueInputRef} */}
                <label htmlFor="true">
                  True
                </label>

                <input type="radio" id="false" name="choice" value={false}  onChange={handleFalseInputChange} /> {/* ref={falseInputRef} */}
                <label htmlFor="false">
                  False
                </label>
                <br />
                <input onSubmit={handleQuestionSubmit} type="submit" value={props.count + 1 < questions.length ? "Next Question" : "Finish Quiz"} />
              </form>
            </fieldset>            
          </div>
        </div>
      </>
    )
  }

  function Results(props){
    return(
      <>
        <div>
          Here are the results:
          <br />
          {"You scored " + props.score + " out of "+ (questions.length*correctAnswerPoints)}
          <br />
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
