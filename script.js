const questions = [

    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Lion", correct: false },
            { text: "Tiger", correct: false },
            { text: "Elephant", correct: true },
            { text: "Horse", correct: false },
        ]
    },
    {
        question: "Which is the largest Fish in the world?",
        answers: [
            { text: "Gold fish", correct: false },
            { text: "Dolphin", correct: false },
            { text: "Phirana", correct: false },
            { text: "Whale", correct: true },
        ]

    },
    {
        question: "Which is the largest River in the world?",
        answers: [
            { text: "Nile", correct: false },
            { text: "Amazon", correct: true },
            { text: "Ganga", correct: false },
            { text: "Yamuna", correct: false },
        ]

    },
    {
        question: "Which is the Tallest Building in the world?",
        answers: [
            { text: "Burj Khalifa", correct: true },
            { text: "Shanghai Tower", correct: false },
            { text: "Qutub Minar", correct: false },
            { text: "Leaning Tower of Pisa", correct: false },
        ]

    }


];

const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    // now to display the right answer and dsiable multiselect following is done
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});


startQuiz();