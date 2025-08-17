import { createRoot } from 'react-dom/client';
import { useState, useRef, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import Results from './Results'
import Question from './Question'
import LoadingComponent from './LoadingComponent'
import { showCorrectAnswer, showWrongAnswer, alertUser } from '../utils/toastFunctions';
import { DarkModeContext } from '../context/DarkModeContext';

function Quiz() {
    const correctAnswerPoints = 5;
    let [ score, setScore ] = useState(0);
    let [ questions, setQuestions ] = useState([]);
    const questionTime = 5000;

    const trueInput = useRef(false);
    const falseInput = useRef(false);

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    function handleSwitch() {
        toggleDarkMode();
        if (!darkMode){
            document.body.setAttribute('data-theme', "dark");
        }
        else {
            document.body.setAttribute('data-theme', "light");
        }
    };

    // Setting the dark mode automatically if the user prefers it as soon as the app renders
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches){
            document.getElementById("theme-switch").checked = true;
            if (!darkMode){
                toggleDarkMode();
            }
            document.body.setAttribute("data-theme", "dark");   
        }
        // Checking if the user if using light theme on their device
        else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.getElementById("theme-switch").checked = false;
            if (darkMode){
                toggleDarkMode();
            }
            document.body.setAttribute("data-theme", "light");
        }
    }, []);

    function initialiseQuiz() {
        const node = document.getElementById('display-questions');
        const root = createRoot(node);

        document.getElementById('welcome-display').style.display = "none"

        root.render(<LoadingComponent />);

        fetch('https://opentdb.com/api.php?amount=6&category=9&difficulty=medium&type=boolean').then(
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
                var correctAnswer = ((questions)[count - 1].correct_answer);
                correctAnswer = correctAnswer.toLowerCase() == "false" ? false : true;

                if ((correctAnswer && trueInput.current) || (!correctAnswer && falseInput.current)){
                    score += correctAnswerPoints;
                    showCorrectAnswer(correctAnswerPoints);
                }
                else {
                    showWrongAnswer();
                }

                falseInput.current = false;
                trueInput.current = false;
            }

            resetOptions();

            if (!questions[count]){
                clearInterval(showQuestions);
                root.render(<Results score={score} length={questions.length} correctAnswerPoints={correctAnswerPoints}/>);
                return;
            }
            
            root.render(<Question question={(questions)[count].question} count={count} trueInput={trueInput} falseInput={falseInput} />);

            alertUser(questionTime);

            count++;
        }, questionTime);
    };

  function resetOptions() {
    var choices = document.getElementsByName("choice");
    for (var i = 0; i < choices.length; i++){
        choices[i].checked = false;
    }     
  }


  return (
    <>
      <div>
        <a className="fixed flex items-center justify-center z-[1000] right-4 top-4" href="https://github.com/Kirk-kud/learning_react/tree/master/quiz-app" target="_blank" rel="nostopper noopener" >
            <img className="w-8 h-8" src={darkMode ? "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/github-white-icon.png" : "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"}/> 
        </a>
        <div id="welcome-display">
          <h1>
           Welcome to the Quiz App
          </h1>
          <button onClick={initialiseQuiz}>
            Take a Quiz
          </button>
          <br />  
          <p className="mb-[0.2rem]">Dark Mode?</p>    
          <label className="switch">
            <input id="theme-switch" type="checkbox" onChange={handleSwitch}/>
            <span className="slider"></span>
          </label>
        </div>
        <div id="display-questions"></div> 
      </div>          
    </>
  )
}

export default Quiz;