const startButton = document.querySelector("#start-button");
const questionsContainer = document.querySelector(".questions");
const answersContainer = document.querySelector(".answers");
const scoreContainer = document.querySelector("#score");
const initialsInput = document.querySelector("#initials-input");
const saveScoreButton = document.querySelector("#save-score-button");

let timer = 60;
let score = 0;
let currentQuestionIndex = 0;

const questions = [
  {
    question: "What is the correct syntax for creating an object in JavaScript?",
    answers: [
      "object myObject = {}",
      "var myObject = new Object()",
      "var myObject = {}",
      "myObject = {}"
    ],
    correctAnswer: "var myObject = {}"
  },
  {
    question: "What is the correct syntax for an array in JavaScript?",
    answers: [
      "var myArray = (1, 2, 3)",
      "var myArray = [1, 2, 3]",
      "var myArray = 1, 2, 3",
      "var myArray = new Array(1, 2, 3)"
    ],
    correctAnswer: "var myArray = [1, 2, 3]"
  },
  {
    question: "What is the correct syntax for a function in JavaScript?",
    answers: [
      "function myFunction()",
      "var myFunction = function()",
      "function: myFunction()",
      "var myFunction()"
    ],
    correctAnswer: "function myFunction()"
  }
];

startButton.addEventListener("click", startGame);
answersContainer.addEventListener("click", checkAnswer);
saveScoreButton.addEventListener("click", saveScore);

function startGame() {
  startButton.style.display = "none";
  questionsContainer.style.display = "block";
  answersContainer.style.display = "block";
  scoreContainer.style.display = "block";
  setTimer();
  displayQuestion();
}

function setTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    scoreContainer.textContent = `Timer: ${timer}`;
    if (timer === 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionsContainer.textContent = question.question;
  for (let i = 0; i < 4; i++) {
    const answerButton = document.querySelector(`#answer${i+1}`);
    answerButton.textContent = question.answers[i];
  }
}

function checkAnswer(event) {
  const selectedButton = event.target;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;
  if (selectedButton.textContent === correctAnswer) {
    score++;
    alert("Correct!");
  } else {
    timer -= 10;
    alert("Incorrect!");
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

function endGame() {
  questionsContainer.style.display = "none";
  answersContainer.style.display = "none";
  scoreContainer.style.display = "none";
  initialsInput.style.display = "block";
  saveScoreButton.style.display = "block";
  alert("Game Over! Your score is " + score);
}

function saveScore() {
  const initials = initialsInput.value;
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials, score });
  localStorage.setItem("highscores", JSON.stringify(highscores));
  window.location.href = "./highscore.html";
}