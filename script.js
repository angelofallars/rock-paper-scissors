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


// Simulate 5 rounds of Rock Paper Scissors
function game() {
  let playerSelection;
  let computerSelection;
  let roundResult;
  let playerWins = 0;
  let aiWins = 0;

  console.log("Rock Paper Scissors vs AI! Win 3 rounds out of 5 to win!")

  return;

  // Declare the winner of the entire game
  if (playerWins > aiWins) {
    console.log("🎆 You won the game! 🎆");
  } else if (playerWins < aiWins) {
    console.log("😭 You lost the game! 😭");
  } else {
    console.log("It's a tie!");
  }
}


game();
