// Variables to control game state
let score = 0; // Player's score
let lives = 5; // Player's lives
let gameRunning = false; // Keeps track of whether game is active or not
let dropMaker; // Will store our timer that creates drops regularly

// Wait for button click to start the game
document.getElementById("start-btn").addEventListener("click", startGame);
// Wait for button click to reset the game
document.getElementById("reset-btn").addEventListener("click", resetGame);

function startGame() {
  // Prevent multiple games from running at once
  if (gameRunning) return;

  gameRunning = true;

  // Create new drops every second (1000 milliseconds)
  dropMaker = setInterval(createDrop, 1000);
}

function resetGame() {

  score = 0;
  lives = 5;

  gameRunning = false;

  clearInterval(dropMaker);

  document.getElementById("score").textContent = score;
  document.getElementById("lives").textContent = lives;

  // remove all drops
  const drops = document.querySelectorAll(".water-drop");
  drops.forEach(drop => drop.remove());

}

function createDrop() {
  // Create a new div element that will be our water drop
  const drop = document.createElement("div");
  drop.className = "water-drop";

  // Make drops different sizes for visual variety
  const initialSize = 60;
  const sizeMultiplier = Math.random() * 0.8 + 0.5;
  const size = initialSize * sizeMultiplier;
  drop.style.width = drop.style.height = `${size}px`;

  // Position the drop randomly across the game width
  // Subtract 60 pixels to keep drops fully inside the container
  const gameWidth = document.getElementById("game-container").offsetWidth;
  const xPosition = Math.random() * (gameWidth - 60);
  drop.style.left = xPosition + "px";

  // Make drops fall for 4 seconds
  drop.style.animationDuration = "4s";

  // Add the new drop to the game screen
  document.getElementById("game-container").appendChild(drop);

  // Remove drops that reach the bottom (weren't clicked)
  drop.addEventListener("animationend", () => {
    drop.remove(); // Clean up drops that weren't caught
  });

  // Randomly decide if drop is good or bad
const isBad = Math.random() < 0.2;

if (isBad) {
  drop.classList.add("bad-drop");
}

drop.addEventListener("click", () => {

  if (drop.classList.contains("bad-drop")) {

      lives--;

      document.getElementById("lives").textContent = lives;

      drop.style.backgroundColor = "#F5402C"; // charity red

      if (lives <= 0) {
          alert("Game Over!");
          resetGame();
      }

  } else {

      score += 10;

      document.getElementById("score").textContent = score;

      drop.style.backgroundColor = "#4FCB53"; // green success

  }

  drop.style.transform = "scale(1.4)";
  drop.style.opacity = "0";

  setTimeout(() => {
      drop.remove();
  }, 150);

});
}
