const colorOptions = document.getElementById('color-options');
const colorDisplay = document.getElementById('color-display');
const scoreboard = document.getElementById('scoreboard');
const highestScoreDisplay = document.getElementById('highest-score');
const gameOverMessage = document.getElementById('game-over');
const newGameBtn = document.getElementById('new-game-btn');

let score = 0;
let correctColor;
let gameActive = true;

// Load the highest score from localStorage
let highestScore = localStorage.getItem('highestScore') || 0;
highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;

// Generate random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Create color options
function createColorOptions() {
  if (!gameActive) return;

  const colors = [];
  correctColor = getRandomColor();
  colors.push(correctColor);

  // Generate 5 more random colors
  for (let i = 0; i < 5; i++) {
    colors.push(getRandomColor());
  }
  // Shuffle the colors
  colors.sort(() => Math.random() - 0.5);

  // Clear previous options
  colorOptions.innerHTML = '';

  // Add color options to the DOM
  colors.forEach(color => {
    const div = document.createElement('div');
    div.classList.add('color-option');
    div.style.backgroundColor = color;
    div.addEventListener('click', () => checkColor(color));
    colorOptions.appendChild(div);
  });

  // Display the correct color
  colorDisplay.style.backgroundColor = correctColor;
}

// Check if the selected color is correct
function checkColor(selectedColor) {
  if (!gameActive) return;

  if (selectedColor === correctColor) {
    score++;
    scoreboard.textContent = `Score: ${score}`;
    createColorOptions();
  } else {
    gameOver();
  }
}

// Handle game over
function gameOver() {
  gameActive = false;
  gameOverMessage.classList.remove('hidden');
  colorOptions.innerHTML = ''; 
  updateHighestScore(); 
}

// Update the highest score
function updateHighestScore() {
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem('highestScore', highestScore);
    highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
  }
}

// Start a new game
function newGame() {
  score = 0;
  gameActive = true;
  scoreboard.textContent = `Score: ${score}`;
  gameOverMessage.classList.add('hidden');
  createColorOptions();
}

// Event listener for new game button
newGameBtn.addEventListener('click', newGame);

// Initialize the game
newGame();
