import { createRoot } from 'react-dom/client';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Results from './Results'
import Question from './Question'
import LoadingComponent from './LoadingComponent'
import { showCorrectAnswer, showWrongAnswer, alertUser } from '../utils/toastFunctions';

function Quiz() {
    const correctAnswerPoints = 5;
    let [ score, setScore ] = useState(0);
    let [ questions, setQuestions ] = useState([]);
    const questionTime = 5000;

    const trueInput = useRef(false);
    const falseInput = useRef(false);

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

                // console.log("Correct Answer: " + correctAnswer);
                // console.log("True Input: " + trueInput.current);
                // console.log("False Input: " + falseInput.current);

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
            // console.log("Options have been reset");

            if (!questions[count]){
                clearInterval(showQuestions);
                root.render(<Results score={score} length={questions.length} correctAnswerPoints={correctAnswerPoints}/>);
                return;
            }
        
            // console.log("Correct Answer: " + Boolean(questions[count].correct_answer));
            
            root.render(<Question question={(questions)[count].question} count={count} trueInput={trueInput} falseInput={falseInput} />);
            
            // console.log("True Radio Input: " + trueInput.current);
            // console.log("False Radio Input: " + falseInput.current);

            alertUser();

            count++;
            // console.log("Score: " + score);
        }, questionTime);
    };

  function resetOptions() {
    var choices = document.getElementsByName("choice");
    for (var i = 0; i < choices.length; i++)
      choices[i].checked = false;
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
      <div id="display-questions"></div>     
    </>
  )
}

export default Quiz;