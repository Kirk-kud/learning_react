function reloadPage() {
    window.location.reload();
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
            {"You scored " + props.score + " out of "+ (props.length * props.correctAnswerPoints) + " points"}
          </h2>         
          <br />
          <button id="return-button" onClick={reloadPage}>
              Go Back to Home Page ←
          </button>
        </div>
      </>
    )
}

export default Results;