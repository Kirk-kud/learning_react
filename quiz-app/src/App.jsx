import { useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import './App.css'

function App() {
  const correctAnswerPoints = 5;
  let [ score, setScore ] = useState(0);
  let [ questions, setQuestions ] = useState([]);
  const questionTime = 5000;

  const trueInput = useRef(false);
  const falseInput = useRef(false);

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

  function alertUser() {
    toast.info("Time to answer!", {
      position: "top-left",
      autoClose: (questionTime - 1000),
      pauseOnHover: false,
      hideProgressBar: false,
      theme: "colored"
    })
  }

  const initialiseQuiz = () => {
    const node = document.getElementById('display-questions');
    const root = createRoot(node);

    document.getElementById('welcome-display').style.display = "none"

    root.render(<LoadingComponent />);

    fetch('https://opentdb.com/api.php?amount=6&category=9&type=boolean').then(
      response => {
        if (!response.ok){
          throw new Error("Could not fetch quiz questions");
        }
        return response;
      }        
    ).then(
      response => response.json()
    ).then(
      data => {
        questions = data.results;
      }
    ).catch(
      error => {
        console.error(error.message);
      }
    );

    

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
  
      console.log("Correct Answer: " + Boolean(questions[count].correct_answer));
      
      root.render(<Question question={questions[count].question} count={count} />);
      
      console.log("True Radio Input: " + trueInput.current);
      console.log("False Radio Input: " + falseInput.current);

      alertUser();

      count++;
      console.log("Score: " + score);
    }, questionTime);
  };

  function resetOptions() {
    var choices = document.getElementsByName("choice");
    for (var i = 0; i < choices.length; i++)
      choices[i].checked = false;
  }

  function Question(props){  
    const handleTrueInputChange = (e) => {
      trueInput.current = e.target.checked;
    }

    const handleFalseInputChange = (e) => {      
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
              <form id="question-form"> 
                {/* <legend>Select an Answer:</legend> */}
                <div className="question-options">
                  <div>
                    <input type="radio" id="true" name="choice" value={true} onChange={handleTrueInputChange} />
                    <label htmlFor="true">
                      True
                    </label>
                  </div>
                  
                  <div>
                    <input type="radio" id="false" name="choice" value={false}  onChange={handleFalseInputChange} />
                    <label htmlFor="false">
                      False
                    </label>
                  </div>                  
                </div>
                <br />
                {/* <input type="submit" value={props.count + 1 < questions.length ? "Next Question" : "Finish Quiz"} /> */}
              </form>
            </fieldset>            
          </div>
        </div>
      </>
    )
  }

  function LoadingComponent() {
    return (
      <div class="loader"></div> 
    );
  }

  function reloadPage() {
    window.location.reload()
  }

  function Results(props){
    return(
      <>
        <div>
          <h3 id="result-present">
            Here are the results:
          </h3>
          <br />
          <h2 id="results-text">
            {"You scored " + props.score + " out of "+ (questions.length*correctAnswerPoints) + " points"}
          </h2>          
          <br />
          <button id="return-button" onClick={reloadPage}>
              Go Back to Home Page ←
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <a className="fixed flex items-center justify-center z-[1000] right-4 top-4" href="https://github.com/Kirk-kud/learning_react/tree/master/quiz-app" target="_blank" rel="nostopper noopener" >
        <img className="w-8 h-8" src="https://img.icons8.com/ios_filled/512/github.png" />
      </a>
      <div id="welcome-display">
        <h1>
          Welcome to the Quiz App
        </h1>
        <button onClick={initialiseQuiz}>
          Take a Quiz
        </button>
      </div>
      <div id="display-questions">
      </div>     
    </>
  )
}

export default App
