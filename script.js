const colorOptions = document.getElementById('color-options');
const colorDisplay = document.getElementById('color-display');
const scoreboard = document.getElementById('scoreboard');
const highestScoreDisplay = document.getElementById('highest-score');
const gameOverMessage = document.getElementById('game-over');
const newGameBtn = document.getElementById('new-game-btn');
const timerDisplay = document.getElementById('timer').querySelector('span');

let score = 0;
let correctColor;
let gameActive = true;
let timeLeft = 15;
let timer;

// Load highest score from localStorage
let highestScore = localStorage.getItem('highestScore') || 0;
highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function createColorOptions() {
  if (!gameActive) return;
  const colors = [];
  correctColor = getRandomColor();
  colors.push(correctColor);

  for (let i = 0; i < 5; i++) {
    colors.push(getRandomColor());
  }
  colors.sort(() => Math.random() - 0.5);
  colorOptions.innerHTML = '';
  
  colors.forEach(color => {
    const div = document.createElement('div');
    div.classList.add('color-option');
    div.style.backgroundColor = color;
    div.addEventListener('click', () => checkColor(color));
    colorOptions.appendChild(div);
  });
  colorDisplay.style.backgroundColor = correctColor;
}

function showCorrectMessage() {
  const correctMessage = document.createElement('div');
  correctMessage.textContent = 'CORRECT!';
  correctMessage.style.position = 'absolute';
  correctMessage.style.top = '50%';
  correctMessage.style.left = '50%';
  correctMessage.style.transform = 'translate(-50%, -50%)';
  correctMessage.style.fontSize = '2rem';
  correctMessage.style.color = 'green';
  correctMessage.style.fontWeight = 'bold';
  correctMessage.style.animation = 'fadeOut 0.5s ease-in-out';
  document.body.appendChild(correctMessage);
  setTimeout(() => correctMessage.remove(), 1000);
}

function checkColor(selectedColor) {
  if (!gameActive) return;

  if (selectedColor === correctColor) {
    score++;
    timeLeft += 2;
    scoreboard.textContent = `Score: ${score}`;
    showCorrectMessage();
    createColorOptions();
  } else {
    gameOver();
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) gameOver();
  }, 1000);
}

function gameOver() {
  gameActive = false;
  gameOverMessage.classList.remove('hidden');
  colorOptions.innerHTML = '';
  clearInterval(timer);
  updateHighestScore();
}

function updateHighestScore() {
  if (score > highestScore) {
    highestScore = score;
    localStorage.setItem('highestScore', highestScore);
    highestScoreDisplay.textContent = `Highest Score: ${highestScore}`;
  }
}

function newGame() {
  score = 0;
  timeLeft = 15;
  gameActive = true;
  scoreboard.textContent = `Score: ${score}`;
  gameOverMessage.classList.add('hidden');
  timerDisplay.textContent = timeLeft;
  clearInterval(timer);
  startTimer();
  createColorOptions();
}

newGameBtn.addEventListener('click', newGame);

newGame();
