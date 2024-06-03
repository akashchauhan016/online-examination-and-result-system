
const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result-text');
const restartButton = document.getElementById('restart-btn');

let currentQuestionIndex;
let score = 0;

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Lisbon', correct: false }
        ]
    },
    {
        question: 'Who is the CEO of Tesla?',
        answers: [
            { text: 'Jeff Bezos', correct: false },
            { text: 'Elon Musk', correct: true },
            { text: 'Bill Gates', correct: false },
            { text: 'Tony Stark', correct: false }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Jupiter', correct: true },
            { text: 'Saturn', correct: false }
        ]
    }
];

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    resultContainerElement.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function restartQuiz() {
    startButton.innerText = 'Start Quiz';
    startQuiz();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setTimeout(() => {
            setNextQuestion();
        }, 1000);
    } else {
        setTimeout(showResult, 1000);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showResult() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    resultTextElement.innerText = `You scored ${score} out of ${questions.length}!`;
}