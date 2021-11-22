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

  // Play 5 rounds
  for (let i = 0; i < 5; i++) {
    console.log(`ROUND ${i + 1}`);

    // Get player input. Keep looping as long as the user keeps typing
    // stuff that isn't Rock, Paper or Scissors
    do {
      playerSelection = prompt(`ROUND ${i + 1}: Rock, paper or scissors?`);
    }
    while (!["ROCK", "PAPER", "SCISSORS"].includes(playerSelection.toUpperCase(), 0));

    // Get the computer's selection with a random algorithm
    computerSelection = computerPlay();

    // Simulate a round with each participant's inputs and log the result
    roundResult = playRound(playerSelection, computerSelection);

    // Calculate the wins of the round, do nothing on tie
    if (roundResult === 1) {
      console.log("You won!");
      playerWins++;
    } else if (roundResult === -1) {
      console.log("You lost!");
      aiWins++;
    } else {
      console.log("Draw!");
    }
  }

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
