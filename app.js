/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let dom = {
  rollBtn: document.querySelector(".btn-roll"),
  newBtn: document.querySelector(".btn-new"),
  holdBtn: document.querySelector(".btn-hold"),
  cancelBtn: document.querySelector(".btn-cancel"),
  dice: document.querySelector(".dice"),
  modal: document.querySelector(".modalContainer"),
  acceptBtn: document.querySelector(".btn-accept"),
  winScore: document.querySelector(".winScore"),
  player: [
    {
      roundScore: document.querySelector("#current-0"),
      globalScore: document.querySelector("#score-0"),
      panel: document.querySelector(".player-0-panel"),
      name: document.querySelector("#name-0"),
      customName: document.querySelector(".player-0-name"),
    },
    {
      roundScore: document.querySelector("#current-1"),
      globalScore: document.querySelector("#score-1"),
      panel: document.querySelector(".player-1-panel"),
      name: document.querySelector("#name-1"),
      customName: document.querySelector(".player-1-name"),
    },
  ],
};
let playerScore = [
  {
    roundScore: 0,
    globalScore: 0,
  },
  {
    roundScore: 0,
    globalScore: 0,
  },
];

let currentPlayer;

// Call the init function
init();
// function to initialize the game
function init() {
  currentPlayer = 0;
  dom.player.forEach((cur) => {
    cur.roundScore.textContent = "0";
    cur.globalScore.textContent = "0";
  });

  dom.dice.style.display = "none";

  dom.player[0].panel.classList.add("active");
  dom.player[1].panel.classList.remove("active");
  dom.player[0].panel.classList.remove("winner");
  dom.player[1].panel.classList.remove("winner");
  dom.player[0].name.textContent = "Player 1";
  dom.player[1].name.textContent = "Player 2";

  dom.holdBtn.removeAttribute("disabled");
  dom.rollBtn.removeAttribute("disabled");
}

// To generate the random number
function generateRandom() {
  return Math.round(Math.random() * 5) + 1;
}

// add to player's round score
function addRoundScore(score, actPlayer) {
  if (score !== 1) {
    playerScore[actPlayer].roundScore += score;
  } else {
    nextPlayer(actPlayer);
  }
}

// function to change to next player
function nextPlayer(actPlayer) {
  dom.dice.style.display = "none";
  playerScore[actPlayer].roundScore = 0;
  dom.player[actPlayer].roundScore.textContent = "0";
  dom.player[actPlayer].panel.classList.remove("active");
  actPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  dom.player[currentPlayer].panel.classList.add("active");
}

// funtion to show the dice number on ui
function showScore(actPlayer, score) {
  dom.player[actPlayer].roundScore.textContent =
    playerScore[actPlayer].roundScore;
  dom.dice.src = "./images/dice-" + score + ".png";
  dom.dice.style.display = "block";
}

// rollDice function to roll the dice
function rollDice() {
  let score = generateRandom();
  addRoundScore(score, currentPlayer);
  showScore(currentPlayer, score);
  console.log(score);
}

function handleHold() {
  let pGlobalScore;
  playerScore[currentPlayer].globalScore +=
    playerScore[currentPlayer].roundScore;
  dom.player[currentPlayer].globalScore.textContent =
    playerScore[currentPlayer].globalScore;
  pGlobalScore = playerScore[currentPlayer].globalScore;
  if (pGlobalScore >= 10) {
    dom.player[currentPlayer].panel.classList.add("winner");
    dom.dice.style.display = "none";
    dom.player[currentPlayer].name.textContent = "winner";
    dom.holdBtn.setAttribute("disabled", "");
    dom.rollBtn.setAttribute("disabled", "");
  } else {
    nextPlayer(currentPlayer);
  }
}

function startNewGame() {
  // initialize game
  init();
  // Set the scores to zero
  playerScore.forEach((cur) => {
    cur.roundScore = 0;
    cur.globalScore = 0;
  });
}

// Function to close Modal and cancel input
function closeModal() {
  dom.modal.style.display = "none";
}

// Function to validate the input
function checkInput(inputField) {
  return inputField.value.length < 20;
}

// Function to show the error
function showError(text, target) {
  const markup = `<p class="alert">${text}</p>`;
  target.parentElement.insertAdjacentHTML("beforeend", markup);
}
// Function to change win score and players' name
function setInput() {
  dom.player.forEach((cur) => {
    if (checkInput(cur.customName)) {
      cur.name.textContent = cur.customName.value;
    } else {
      showError("Name can not be more than 20 chars", cur.customName);
    }
  });
}
// Event Listener for roll button
dom.rollBtn.addEventListener("click", rollDice);

// Event listener for hold button
dom.holdBtn.addEventListener("click", handleHold);

// Event listener for new game button
dom.newBtn.addEventListener("click", startNewGame);

// Event listener for modal cancel/close button
dom.cancelBtn.addEventListener("click", closeModal);

// Event listener for modal accept button
dom.acceptBtn.addEventListener("click", setInput);
