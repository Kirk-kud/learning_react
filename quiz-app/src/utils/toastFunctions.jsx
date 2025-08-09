import { toast } from 'react-toastify';

export function showCorrectAnswer(correctAnswerPoints) {
    toast.success(`Correct for ${correctAnswerPoints} points`, {
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

export function alertUser(questionTime) {
    toast.info("Time to answer!", {
        position: "top-left",
        autoClose: (questionTime - 1000),
        pauseOnHover: false,
        hideProgressBar: false,
        theme: "colored"
    })
}