/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let dom = {
  rollBtn: document.querySelector(".btn-roll"),
  newBtn: document.querySelector(".btn-new"),
  holdBtn: document.querySelector(".btn-hold"),
  dice: document.querySelector(".dice"),
  player: [
    {
      roundScore: document.querySelector("#current-0"),
      globalScore: document.querySelector("#score-0"),
      panel: document.querySelector(".player-0-panel"),
    },
    {
      roundScore: document.querySelector("#current-1"),
      globalScore: document.querySelector("#score-1"),
      panel: document.querySelector(".player-1-panel"),
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
// IIFE function to initialize the game
function init() {
  currentPlayer = 0;
  dom.player.forEach((cur) => {
    cur.roundScore.textContent = "0";
    cur.globalScore.textContent = "0";
  });

  dom.dice.style.display = "none";

  dom.player[0].panel.classList.add("active");
  dom.player[1].panel.classList.remove("active");
}

// To generate the random number
function generateRandom() {
  return Math.round(Math.random() * 5 + 1);
}

// add round score
function addRoundScore(score, actPlayer) {
  if (score !== 1) {
    playerScore[actPlayer].roundScore += score;
  } else {
    nextPlayer(actPlayer);
  }
}

// function to change to next player
function nextPlayer(actPlayer) {
  playerScore[actPlayer].roundScore = 0;
  dom.player[actPlayer].roundScore.textContent = "0";
  dom.player[actPlayer].panel.classList.remove("active");
  actPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  dom.player[currentPlayer].panel.classList.add("active");
}

// rollDice function to roll the dice
function rollDice() {
  let score = generateRandom();
  addRoundScore(score, currentPlayer);
  showScore(currentPlayer);
  console.log(score);
}

// funtion to show the dice number on ui
function showScore(actPlayer) {
  dom.player[actPlayer].roundScore.textContent =
    playerScore[actPlayer].roundScore;
  console.log(playerScore[actPlayer].roundScore);
}

// Event Listener for roll button
dom.rollBtn.addEventListener("click", rollDice);
