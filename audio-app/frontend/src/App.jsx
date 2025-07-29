import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [ numberOfHours, setNumberOfHours ] = useState(1);
  const [ loopedFile, setLoopedFile ] = useState('');
  const [ deviceColor, setDeviceColor ] = useState('')
  const [ outputFileName, setOutputFileName] = useState(" .mp3");
  const fileLimit = 60000000; // file limit in bytes

  const url = "http://127.0.0.1:8080"; // "https://audio-app-lpej.onrender.com"

   const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    // Checking whether a file was attached
    if (!file){
      toast.warn("No file was attached!", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: true,
        theme: "colored"
      })
      return;
    }
    
    // Ensuring that the attached file falls within the stipulated limited
    if (file.size > fileLimit){
      toast.error(`The attached file is greater than ${fileLimit/(10**6)}MB!`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored"
      })
      fileInput.value = '';
      return;
    }

    // Changing the button and informing the user that the audio is being looped in the background
    enableLoadingStatus();
    setLoopedFile('');

    // Pausing the audio
    document.querySelector('audio').pause();

    // Generating the output file's name
    generateFileName(file.name, numberOfHours);

    form.append('file', file, file.name);

    const apiUrl = url + `/convert_audio?hours=${numberOfHours}`;
    
    fetch(apiUrl, {
        method: 'POST',
        // Removed the content-type header since it was causing an error
      body: form
    }).then(
      response => {        
        if (!response.ok){
          // console.log("Bad response");
          throw new Error("The audio could not be looped");
        }
        return response;
      }
    ).then(
      response => response.json()
    ).then(
      data => {
        setLoopedFile(data);
        const source = document.querySelector('source');

        // Configuring the source to play the audio
        source.setAttribute('type', 'audio/mpeg');
        source.setAttribute('src', data);

        // Dismissing the previous waiting toast
        toast.dismiss();
        // Disabling the loading indicators
        disableLoadingStatus();
      }
    ).catch(error => {
      console.error(error.message);
    })
  };

  const handleHourChange = (e) => {
    setNumberOfHours(e.target.value);
  };

  const disableLoadingStatus = () => {
    let submitButton = document.getElementById('loop-file-button');

    // Setting the submit button to indicate that there is no looping in progress
    submitButton.innerText = "Loop Audio";
    submitButton.classList.add('is-active');
    submitButton.classList.remove('is-inactive');
    submitButton.disabled = true;
    document.getElementById('result-audio').style.display = "block";

    toast.dismiss();

    // Alerting the user that the audio is ready
    toast.success("Your audio is ready to download", {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      theme: "colored"
    })
  };

  const enableLoadingStatus = () => {
    let submitButton = document.getElementById('loop-file-button');

    // Setting the submit button to indicate that there is looping in progress
    submitButton.innerText = "Loading...";
    submitButton.classList.add('is-inactive');
    submitButton.classList.remove('is-active');
    submitButton.disabled = false;
    document.getElementById('result-audio').style.display = "none";

    toast.dismiss();

    // Informing the user that the audio is being looped
    toast.info("Looping Audio, Please Wait...", {
      position: "top-right",
      autoClose: false,
      hideProgressBar: false,
      theme: "colored"
    })
  };

  const generateFileName = (fileName, hours) => {
    setOutputFileName(`${fileName.split(".")[0]}_looped_${hours}h.mp3`);
  };

  const deepenButtonColor = (e) => {
    setDeviceColor("#008000");
  };

  const lightenButtonColor = (e) => {
    setDeviceColor("#5cb85c");
  };

  return (
    <>
      <ToastContainer />
      <div>
        <a id="github" href="https://github.com/Kirk-kud/learning_react/tree/master/audio-app" target="_blank" rel="nostopper noopener">
          <img src="https://img.icons8.com/ios_filled/512/github.png"/>
        </a>
        <h1>
          Welcome to the Audio Looper
        </h1>
        <div id="form-div">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>
                Upload audio here:
              </label>
              {/* Allowing the user to only enter three audio file types */}
              <input id="file-input" type="file" accept='.wav, .mp3, .m4a'/>
            </div>
            <div>
              <label>
                Loop Duration (in hours):
              </label>
              <input id="hour-input" type="number" min={1} max={5} onChange={handleHourChange} value={numberOfHours} />
            </div>
            <br/>
            <button id="loop-file-button" className="is-active" type="submit">
              Loop Audio
            </button>
          </form>
        </div>
        <div id="result-audio">
          <h2>
            Find the audio below:
          </h2>
          {/* Presenting the looped file to the user */}
          <audio controls>
            <source src={null} type="" />
          </audio>
          <p>
            <a id="save-audio" href={loopedFile}
              onMouseEnter={deepenButtonColor} onMouseLeave={lightenButtonColor}>
              Save to Device
             <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill={deviceColor}><path d="M288-288h384v-72H288v72Zm192-120 144-144-51-51-57 57v-150h-72v150l-57-57-51 51 144 144Zm.28 312Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>
            </a>   
          </p>
        </div>
      </div>
    </>
  )
}

export default App
