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

function finishAnimationEnd(element, animationClass) {
  element.addEventListener("animationend", (e) => {
    if (e.target.classList.contains(animationClass)) {
      e.target.classList.remove(animationClass);
    }
  })
}

const container = document.querySelector("#container");
const buttons = document.querySelectorAll(".buttons > button");
const playerScore = document.querySelector(".score__number.player");
const aiScore = document.querySelector(".score__number.ai");
const roundResultText = document.querySelector(".round-result");

const winnerPopup = document.createElement("div");

const winnerText = document.createElement("div");
const playAgainButton = document.createElement("button");
playAgainButton.textContent = "Play Again";
playAgainButton.classList.add("play-again");

playAgainButton.addEventListener("click", startGame);
winnerPopup.classList.add("winner");

winnerPopup.appendChild(winnerText);
winnerPopup.appendChild(playAgainButton);

playerScore.textContent = '0';
aiScore.textContent = '0';

let playerScoreCount = 0;
let aiScoreCount = 0;


// Remove the animation class for the increment animations on the score texts
finishAnimationEnd(playerScore, "score__number--bang");
finishAnimationEnd(aiScore, "score__number--bang");


function makePlayerMove (e) {
    const playerMove = toCapitalCase(e.target.getAttribute('id'));
    const aiMove = computerPlay();

    const roundResult = playRound(playerMove, aiMove);

    switch (roundResult) {
      case (1):
        playerScoreCount++;
        playerScore.textContent = playerScoreCount;
        playerScore.classList.add("score__number--bang");
        roundResultText.textContent = `You won this round! ${playerMove} wins against ${aiMove}!`;
        break;

      case (-1):
        aiScoreCount++;
        aiScore.textContent = aiScoreCount;
        aiScore.classList.add("score__number--bang");
        roundResultText.textContent = `You lost this round! ${aiMove} wins against ${playerMove}!`;
        break;

      case (0):
        roundResultText.textContent = `Tie! You both chose ${aiMove}!`;
        break;
    }

    if (playerScoreCount >= 5) {
      endGame(1);
    } else if (aiScoreCount >= 5) {
      endGame(-1);
    }
}

async function endGame(winner) {
  if (winner === 1) {
    winnerText.textContent = "You win!";
    winnerPopup.classList.add("winner--green");
  } else if (winner === -1) {
    winnerText.textContent = "You lost!";
    winnerPopup.classList.add("winner--gray");
  }

  buttons.forEach((button) => {
    button.removeEventListener("click", makePlayerMove);
    button.removeEventListener("click", animateClickButton);
  })

  buttons.forEach((button) => {
    button.classList.add("button--inactive");
  })

  await new Promise(resolve => setTimeout(resolve, 600));

  container.appendChild(winnerPopup);

}

function animateClickButton(e) {
  e.target.classList.add("button--click");
}

function startGame() {
  // Remove the game over text leftover from a previous game
  if (container.contains(winnerPopup)) {
    container.removeChild(winnerPopup);
    winnerPopup.classList.remove("winner--green");
    winnerPopup.classList.remove("winner--gray");
  }

  roundResultText.textContent = '';

  playerScore.textContent = '0';
  aiScore.textContent = '0';

  playerScoreCount = 0;
  aiScoreCount = 0;

  buttons.forEach((button) => {
    button.classList.remove("button--inactive");

    // Add that clicky clack animation when you click on the button
    button.addEventListener("click", animateClickButton);

    button.addEventListener("click", makePlayerMove); 

    finishAnimationEnd(button, "button--click");
  });
}

startGame();
