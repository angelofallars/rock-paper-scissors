// Get the move of the computer
function computerPlay () {
  let computerTurn = Math.floor(Math.random() * 3);

  switch (computerTurn) {
    case (0):
      return 'Rock';
    case (1):
      return 'Paper';
    case (2):
      return 'Scissors';
  }
}

function toCapitalCase(string) {
  const firstLetter = string.slice(0, 1).toUpperCase();
  const otherLetters = string.slice(1).toLowerCase();

  return firstLetter + otherLetters;
}

// Simulate a round of Rock Paper Scissors
function playRound(playerSelection, computerSelection) {
  // Split path depending on player's selection (rock, paper, scissors)
  // For each three paths, three more paths depending on computer selection

  // 1 = player win
  // 0 = tie
  // -1 = AI win
  let playerWins;

  switch (playerSelection.toUpperCase()) {
    case 'ROCK':
      switch(computerSelection) {
        case 'Rock':
          playerWins = 0;
          break;
        case 'Paper':
          playerWins = -1;
          break;
        case 'Scissors':
          playerWins = 1;
          break;
      }
      break;

    case 'PAPER':
      switch(computerSelection) {
        case 'Rock':
          playerWins = 1;
          break;
        case 'Paper':
          playerWins = 0;
          break;
        case 'Scissors':
          playerWins = -1;
          break;
      }
      break;

    case 'SCISSORS':
      switch(computerSelection) {
        case 'Rock':
          playerWins = -1;
          break;
        case 'Paper':
          playerWins = 1;
          break;
        case 'Scissors':
          playerWins = 0;
          break;
      }
      break;
  }


  // Declare winner
  return playerWins;
}

const buttons = document.querySelectorAll(".buttons > button");
const playerScoreText = document.querySelector(".score__number.player");
const aiScoreText = document.querySelector(".score__number.ai");
const roundResultText = document.querySelector(".round-result");
const winner = document.querySelector(".winner");

playerScoreText.textContent = '0';
aiScoreText.textContent = '0';

let playerScore = 0;
let aiScore = 0;

function makePlayerMove (e) {
    const playerMove = toCapitalCase(e.target.getAttribute('id'));
    const aiMove = computerPlay();

    const roundResult = playRound(playerMove, aiMove);

    switch (roundResult) {
      case (1):
        playerScore++;
        playerScoreText.textContent = playerScore;
        roundResultText.textContent = `You won this round! ${playerMove} wins against ${aiMove}!`;
        break;

      case (-1):
        aiScore++;
        aiScoreText.textContent = aiScore;
        roundResultText.textContent = `You lost this round! ${aiMove} wins against ${playerMove}!`;
        break;

      case (0):
        roundResultText.textContent = `Tie! You both chose ${aiMove}!`;
        break;
    }

    if (playerScore >= 5) {
      winner.textContent = "You win!";
      winner.classList.add("show");
      endGame();
    } else if (aiScore >= 5) {
      winner.textContent = "You lost! Better luck next time!";
      winner.classList.add("show");
      endGame();
    }
}

function endGame() {
  buttons.forEach((button) => {
    button.classList.add("inactive");
    button.removeEventListener("click", makePlayerMove);
  })
}


buttons.forEach((button) => {
  button.addEventListener("click", makePlayerMove); 
});
