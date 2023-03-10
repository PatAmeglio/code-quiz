const startButton = document.querySelector("#start-button");
const questionsContainer = document.querySelector(".questions");
const answersContainer = document.querySelectorAll(".answers button");
const scoreContainer = document.querySelector("#score");
const initialsInput = document.querySelector("#initials-input");
const saveScoreButton = document.querySelector("#save-score-button");
const result = document.querySelector("#result");
const timerContainer = document.querySelector("#timer");

let timer = 60;
let score = 0;
let currentQuestionIndex = 0;

const questions = [
  {
    question: "What does the abbreviation HTML stand for?",
    answers: [
      "All of the below",
      "HighText Markup Language",
      "HyperText Markdown Language",
      "HyperText Markup Language"
    ],
    correctAnswer: "HyperText Markup Language"
  },
  {
    question: "What is the correct syntax to declare a variable in JavaScript?",
    answers: [
      "var myVariable = 1, 2, 3",
      "myVariable var = 1, 2, 3",
      "myVariable = 1, 2, 3",
      "var = myVariable 1, 2, 3"
    ],
    correctAnswer: "var myVariable = 1, 2, 3"
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
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Cross Site Scripting",
      "Communications Support System",
      "Cascading Style Sheets",
      "Customer Satisfaction Survey"
    ],
    correctAnswer: "Cascading Style Sheets"
  }
];

startButton.addEventListener("click", startGame);
answersContainer.forEach(button => button.addEventListener("click", checkAnswer));
saveScoreButton.addEventListener("click", saveScore);

function startGame() {
  startButton.style.display = "none";
  questionsContainer.style.display = "block";
  answersContainer.forEach(button => button.style.display = "block");
  scoreContainer.style.display = "block";
  setTimer();
  displayQuestion();
  scoreContainer.textContent = "Score:" + score;
}

function setTimer() {
  const timerInterval = setInterval(() => {
    timer--;
    timerContainer.textContent = `Timer: ${timer}`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      endGame();
    }    
  }, 1000);
}

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  questionsContainer.textContent = question.question;
  for (let i = 0; i < 4; i++) {
    answersContainer[i].textContent = question.answers[i];
  }
}

function checkAnswer(event) {
  if (event.target.textContent == questions[currentQuestionIndex].correctAnswer) {
    score++ ;
    scoreContainer.textContent = "Score:" + score;
    result.textContent = "Correct!";
    result.style.color = "green";
  } else {
    timer -= 10;
    result.textContent = "Incorrect!";
    result.style.color = "red";
  }
  setTimeout(() => {
    result.textContent = "";
  }, 1000);
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endGame();
  } else {
    displayQuestion();
  }
}

function endGame(event) {
  timerContainer.style.display = "none";
  questionsContainer.style.display = "none";
  answersContainer.forEach(button => button.style.display = "none");
  scoreContainer.style.display = "block";
  initialsInput.style.display = "block";
  saveScoreButton.style.display = "block";
  scoreContainer.textContent = "Game Over! Your score is " + score;
}

function saveScore() {
  const initials = initialsInput.value;
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials, score });
  localStorage.setItem("highscores", JSON.stringify(highscores));
  window.location.href = "./highscore.html";
}