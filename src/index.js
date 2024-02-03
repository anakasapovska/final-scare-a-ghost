const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// Add the missing query selectors:
const score = document.querySelector('#score');  // Corrected selector
const timerDisplay = document.querySelector('#timer');
const player = document.getElementById('#player');


let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";
let soundEnabled = true;

//generate random integer
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//set delay duration based on difficulty 
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}
//randomly selects a hole
function chooseHole(holes) {
  let index = randomInteger(0, 8);
  const hole = holes[index];

  if (hole === lastHole) {
    return chooseHole(holes);
  }

  lastHole = hole;
  return hole;
}
//stop game when time is at 0 
function gameOver() {
  if (time > 0) {
    return showUp();
  } else {
    return stopGame();
  }
}
// Initiates the appearance of a mole by determining a random delay and choosing a hole.
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

//Shows the mole by toggling visibility
function showAndHide(hole, delay) {
  toggleVisibility(hole);  // Show
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);  // Hide
    // Call the gameOver function when out of time 
    gameOver();
  }, delay);
  return timeoutID;
}


//Toggles the visibility of the mole by adding or removing the 'show' class to/from the hole element
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}
// Score is increased by one and returns new score.
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

//score is cleared and set back to 0
function clearScore() {
  points = 0;
  score.textContent = points;
}

//updates game time and time decreased until time is out which will end the game.
function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
  } else {
    stopGame();
  }
  return time;
}
//sets game timer
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}
// increases score everytime a ghost is whacked, and returns correct points
function whack(event) {
  updateScore();
  playClickSound(); // Play sound effect
  return points;
}

//Sets up event listeners for each mole element in the game grid, when mole is clicked, it calls the whack function.
function setEventListeners() {
  moles.forEach((mole) => {
    mole.addEventListener('click', whack);
  });
  return moles;
}

function setDuration(duration) {
  time = duration;
  return time;
}
//game ends and stops the timer
function stopGame() {
  clearInterval(timer);
  return "game stopped";
}
//game resets score to 0, starts at 20 seconds, and randomly calls the ghosts,and setting up event listeners for moles. 
function startGame() {
  clearScore();
  setDuration(20);
  timerDisplay.textContent = time;
  showUp();
  startTimer();
  setEventListeners();
  return "game started";
}

startButton.addEventListener("click", startGame);

//popup box to show game over
function showModal() {
  const modal = document.getElementById('gameOverModal');
  modal.style.display = 'block';

  // Display the final score in the modal
  const finalScoreElement = document.getElementById('finalScore');
  finalScoreElement.textContent = points;
}
//x button to close the game over box
function closeModal() {
  console.log('Close button clicked!');
  const modal = document.getElementById('gameOverModal');
  modal.style.display = 'none';
  clearScore();
  setDuration(20);
}
//play again closes modal and starts the game over.
function playAgain() {
  closeModal();
  startGame();
}

function stopGame() {
  clearInterval(timer);
  showModal();
  return "game stopped";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('playAgainButton').addEventListener('click', playAgain);
  document.querySelector('.close').addEventListener('click', closeModal);

});


function toggleSound() {
  soundEnabled = !soundEnabled;
  alert('Sound effects ' + (soundEnabled ? 'enabled' : 'disabled'));
}


function playClickSound() {
  if (soundEnabled) {
    var clickSound = document.getElementById('clickSound');
    clickSound.currentTime = 0;
    clickSound.play();

    var clickSound = document.getElementById('clickSound');
    clickSound.muted = !soundEnabled;
  }
  }
document.getElementById('myButton').addEventListener('click', function() {
  playClickSound();
});


function togglePlayPause() {
  var player = document.getElementById('player');
  player.muted = !player.muted;
}


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
