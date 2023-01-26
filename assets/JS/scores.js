const highscoresList = document.querySelector("#high-scores");

// Get highscores from local storage
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// Sort highscores by score in descending order
highscores.sort((a, b) => b.score - a.score);

// Display highscores in the ordered list
highscores.forEach(highscore => {
  const li = document.createElement("li");
  li.textContent = `${highscore.initials} - ${highscore.score}`;
  highscoresList.appendChild(li);
});
