const startGameBtn = document.getElementById("start-game-btn");
const modal = document.getElementById("game-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const choiceButtons = document.querySelectorAll(".choice-btn");
const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";
const gameLog = [];

let gameIsRunning = false;
let playerChoice = null;

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue <= 0.33) {
    return ROCK;
  } else if (randomValue <= 0.66) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice) => {
  if (cChoice === pChoice) {
    return RESULT_DRAW;
  } else if (
    (cChoice === ROCK && pChoice === SCISSORS) ||
    (cChoice === PAPER && pChoice === ROCK) ||
    (cChoice === SCISSORS && pChoice === PAPER)
  ) {
    return RESULT_COMPUTER_WINS;
  } else {
    return RESULT_PLAYER_WINS;
  }
};

const closeModal = () => {
  modal.style.display = "none";
  gameIsRunning = false;
};

startGameBtn.addEventListener("click", () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  modal.style.display = "block";
});

closeModalBtn.addEventListener("click", closeModal);

function logGame(cChoice, pChoice, winner) {
  const battleDetails = {
    playerChosenChoice: pChoice,
    computerChosenChoice: cChoice,
    result: winner,
  };
  gameLog.push(battleDetails);
  console.log(gameLog);
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playerChoice = button.dataset.choice;
    modal.style.display = "none";

    const computerChoice = getComputerChoice();
    let message = `You picked ${playerChoice}, Computer picked ${computerChoice}, Therefore `;
    const winner = getWinner(computerChoice, playerChoice);
    console.log(winner);
    if (winner === RESULT_COMPUTER_WINS) {
      alert(message + "you lost");
    } else if (winner === RESULT_PLAYER_WINS) {
      alert(message + "you won!");
    } else {
      alert(message + "It's a DRAW");
    }
    logGame(computerChoice, playerChoice, winner);
    gameIsRunning = false;
  });
});
