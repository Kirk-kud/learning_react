import { toast } from 'react-toastify';

export function showCorrectAnswer() {
    toast.success(`Correct for 5 points`, { // remember to configure this to use ${correctAnswerPoints}
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: "colored"
    })
}

export function showWrongAnswer() {
    toast.error('Wrong answer...', {
        position: "top-right",
        autoClose: 1000,
        pauseOnHover: false,
        hideProgressBar: true,
        theme: "colored"
    })
}

export function alertUser() {
    toast.info("Time to answer!", {
        position: "top-left",
        autoClose: (5000 - 1000), // remember to configure this to use the questionTime for responsiveness and dynamism
        pauseOnHover: false,
        hideProgressBar: false,
        theme: "colored"
    })
}