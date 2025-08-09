import { ToastContainer, toast } from 'react-toastify';

function Question(props){  
    const handleTrueInputChange = (e) => {
        props.trueInput.current = e.target.checked;
    }

    const handleFalseInputChange = (e) => {      
        props.falseInput.current = e.target.checked;
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

export default Question;