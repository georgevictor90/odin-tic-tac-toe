const game = (() => {

  // CREATE VARIABLES
  let gameMode;
  let playerMark;
  let player1Name;
  let player2Name;
  let player1Mark;
  let player2Mark;
  let index;
  let gameIsOver = false;
  let gameSetIsOver = false;
  let isArrayFull;
  let player1Score = 0;
  let player2Score = 0;

  // GRAB DOM ELEMENTS
  const newGameForm = document.getElementById('newGameForm');
  const newGameBtn = document.getElementById('newGameBtn');
  const displayWinner = document.getElementById('displayWinner');
  const p1NameInfo = document.getElementById('p1NameInfo');
  const p2NameInfo = document.getElementById('p2NameInfo');
  const p1ScoreInfo = document.getElementById('p1ScoreInfo');
  const p2ScoreInfo = document.getElementById('p2ScoreInfo');
  const vsComputer = document.getElementById('vsComputer');
  const vsComputerForm = document.getElementById('vsComputerForm');
  const vsPlayerForm = document.getElementById('vsPlayerForm');
  const vsPlayer = document.getElementById('vsPlayer');
  const mode1ChoiceX = document.getElementById('X');
  const mode1ChoiceO = document.getElementById('O');
  const mode2ChoiceX = document.getElementById('p1-X');
  const mode2ChoiceO = document.getElementById('p1-O');
  const player1NameInput = document.getElementById('player1Name');
  const player2NameInput = document.getElementById('player2Name');
  const mode1PlayerNameInput = document.getElementById('playerName');
  const gameModeDiv = document.getElementById('chooseMode');
  const player1MarkDiv = document.getElementById('player1Mark');
  const mode1PlayerMarkDiv = document.getElementById('playerMark');
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  const modalDisplayWinner = document.getElementById('modalDisplayWinner');


  // PLAYER OBJECT FACTORY FUNCTION
  const player = (name, mark) => {
    return {
      name,
      mark,
    }
  }

  // CREATE PLAYERS
  const player1 = player('name', 'mark');
  const player2 = player('name2', 'mark2');

  //FUNCTONS TO SHOW/HIDE ELEMENTS ON THE PAGE
  function hideElement(el) {
    el.classList.add('hidden');
    el.classList.remove('visible');
  } 

  function showElement(el) {
    el.classList.add('visible');
    el.classList.remove('hidden');
  } 

  // GAME MODE 1 MEANS SINGLE PLAYER (VS COMPUTER), GAME MODE 2 MEANS TWO PLAYERS (PLAYER VS PLAYER)
  function setGameMode() {
    if (vsComputer.checked) {
      showElement(vsComputerForm);
      hideElement(vsPlayerForm);
      gameMode = 1;
    }
    if (vsPlayer.checked) {
      showElement(vsPlayerForm);
      hideElement(vsComputerForm);
      gameMode = 2
    }
    if (!gameMode) return
    return gameMode
  }

  // GETS THE SELECTED PLAYER MARK FOR SINGLE PLAYER GAME MODE
  function getMark1() {
    if ((!mode1ChoiceX.checked) && (!mode1ChoiceO.checked)) return

    if (mode1ChoiceX.checked) {
      playerMark = "X"
    }
    if (mode1ChoiceO.checked) {
      playerMark = "O"
    }
  }

  // GETS THE SELECTED PLAYER MARKS FOR 2 PLAYERS GAME MODE
  function getMark2() {
    if ((!mode2ChoiceX.checked) && (!mode2ChoiceO.checked)) return

    if (mode2ChoiceX.checked) {
      player1Mark = "X";
      player2Mark = "O";
    }
    if (mode2ChoiceO.checked) {
      player1Mark = "O";
      player2Mark = "X"
    }
  }

  // GETS THE PLAYER NAMES FROM USER INPUT VALUES
  function getPlayerNames() {
    if (gameMode === 2) {
      player1Name = player1NameInput.value;
      player2Name = player2NameInput.value;
    }
    if (gameMode === 1) {
      player1Name = mode1PlayerNameInput.value;
      player2Name = 'CPU';
    }

  }

  // ASSIGNS THE PLAYER NAMES AND MARKS TO THE PLAYER OBJECTS
  function createNewPlayers() {
    player1.name = player1Name;
    player1.mark = player1Mark;
    player1.winner = false;
    player2.name = player2Name;
    player2.mark = player2Mark;
    player2.winner = false;
  }

  //DISPLAYS THE PLAYER NAMES IN THE PLAYERINFO DIV
  function displayPlayerNames() {
    p1NameInfo.textContent = `Player1 Name: ${player1Name.toUpperCase()}`;
    p2NameInfo.textContent = `Player2 Name: ${player2Name.toUpperCase()}`;
  }

  //DISPLAYS SCORES IN PLAYERINFO DIV
  function displayScores() {
    p1ScoreInfo.textContent = `Player1 Score: ${player1Score}`;
    p2ScoreInfo.textContent = `Player2 Score: ${player2Score}`;
  }

  //DISPLAY PLAYER NAMES AND SCORES
  function displayInfo() {
    displayPlayerNames();
    displayScores();
  }

  //SETS THE CURRENT PLAYER FOR THE FIRST MOVE BASED ON MARK (x starts first)
  function setCurrentPlayer() {
    if (player1.mark === 'X') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';

    } else if (player2.mark === 'X') {
      player2.currentPlayer = 'true';
      player1.currentPlayer = 'false';
    }


  }

  // SWITCHES CURRENT PLAYER AFTER EACH TURN
  function switchCurrentPlayer() {
    if (player1.currentPlayer === 'true' && player2.currentPlayer === 'false') {
      player1.currentPlayer = 'false';
      player2.currentPlayer = 'true';

    } else if (player1.currentPlayer === 'false' && player2.currentPlayer === 'true') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';
    }
  }

  // // RETURNS VALUE OF GAMEISOVER
  // function getGameIsOver() {gameIsOver};

 // CHECKS THE CURRENT PLAYER AND MARKS THE CLICKED SPACE WITH ITS MARK, THEN SWITCHES CURRENT PLAYER AND CHECK FOR WIN
 function markSpace(e) {
  index = gameBoard.gridTiles.indexOf(e.target);
  if (!(gameBoard.gameBoardArr[index] === '')) return
  if (player1.currentPlayer === 'true') {
    gameBoard.gameBoardArr[index] = player1.mark;
  }
  if (player2.currentPlayer === 'true') {
    gameBoard.gameBoardArr[index] = player2.mark;
  }
}

// PLAYS ONE ROUND OF TIC TAC TOE
function playRound(e) {
  markSpace(e);
  gameBoard.render();
  switchCurrentPlayer();
  isArrayFull = gameBoard.gameBoardArr.every(element => element !== '');
  checkRoundWin();
  if (gameSetIsOver === true) {
    modal.style.display = 'block';
    displayGameSetWinner();
  }
}

// DISPLAY GAME SET WINNER
function displayGameSetWinner() {
  if (player1.winner === true) {
    modalDisplayWinner.textContent = `${player1.name} won the game set!` ;
  } else if (player2.winner === true) {
    modalDisplayWinner.textContent = `${player2.name} won the game set!` ;
  }
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


  // CHECKS FOR WIN ON ROWS, COLUMNS AND DIAGONALS , THEN CHECKS FOR DRAW
  function checkRoundWin() {
    checkRows();
    checkColumns();
    checkDiagonals();
    checkDraw();
    displayScores();
  }

  // CHECKS IF ANY OF THE PLAYERS HAS REACHED A SCORE OF 5
  function checkGameSetWin() {
    console.log('fired cGSW');
    if (player1Score === 5 || player2Score === 5) { gameSetIsOver = true };
    if (player1Score === 5) {
      player1.winner = true;
      player2.winner = false;
    } else if (player2Score === 5) {
      player2.winner = true;
      player1.winner = false;
    }
  }

  // CHECKS FOR THREE IDENTICAL MARKS ON GRID ROWS
  function checkRows() {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'X')) ||

      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'X')) ||

      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');
      player1.mark === 'X' ? player1Score++ : player2Score++;
      checkGameSetWin();
      return

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'O')) ||

      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'O')) ||

      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');
      player1.mark === 'O' ? player1Score++ : player2Score++;
      checkGameSetWin();
      return

    } else return
  }


  // CHECKS FOR THREE IDENTICAL MARKS ON GRID COLUMNS
  function checkColumns() {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X')) ||

      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'X')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');
      player1.mark === 'X' ? player1Score++ : player2Score++;
      checkGameSetWin();
      return

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O')) ||

      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'O')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');
      player1.mark === 'O' ? player1Score++ : player2Score++;
      checkGameSetWin();
      return

    } else return
  }


  // CHECKS FOR THREE IDENTICAL MARKS ON GRID DIAGONALS
  function checkDiagonals() {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');
      player1.mark === 'X' ? player1Score++ : player2Score++;
      checkGameSetWin();
      return

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');
      player1.mark === 'O' ? player1Score++ : player2Score++;
      checkGameSetWin();
      return

    } else return
  }

  // CHECKS FOR DRAW
  function checkDraw() {
    if (gameIsOver === false && isArrayFull === true) {
      gameIsOver = true;
      declareDraw();
    }
  }

  // ANNOUNCES DRAW GAME ON SCREEN
  function declareDraw() {
    displayWinner.textContent = "It's a draw!";
    displayWinner.classList.add('visible');
    displayWinner.classList.remove('hidden');
  }


  // ANNOUNCES WINNER OF ROUND ON SCREEN
  function declareWinner(mark) {
    if (player1.mark === mark) {
      displayWinner.textContent = `${player1.name} won! Congratulations!`;
    } else if (player2.mark === mark) {
      displayWinner.textContent = `${player2.name} won! Congratulations!`;
    }
    showElement(displayWinner);
  }
  

  // CLEARS THE GRID AND STARTS NEW ROUND
  function startNewRound() {
    gameIsOver = false;
    setCurrentPlayer();
    gameBoard.gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    gameBoard.render();
  }

  // STARTS GAME
  function playGame(e) {
    if (gameIsOver === true) {
      startNewRound();
      hideElement(displayWinner);
    } else {
      playRound(e);
    }
  }

  // EVENT LISTENERS
  gameModeDiv.addEventListener('click', setGameMode)

  mode1PlayerMarkDiv.addEventListener('click', getMark1)

  player1MarkDiv.addEventListener('click', getMark2)

  newGameBtn.addEventListener('click', () => {
    newGameForm.style.display = 'none';
    getPlayerNames();
    createNewPlayers();
    startNewRound();
    displayInfo();
  })


  return {
    // markSpace,
    // switchCurrentPlayer,
    // startNewRound,
    // getGameIsOver,
    // gameSetIsOver,
    playGame,
    // player1,
    // player2,
  }


})()


const gameBoard = (() => {
  let gameBoardArr = ["", "", "", "", "", "", "", "", ""];
  let gridTiles = Array.from(document.getElementsByClassName('gridTile'));
  let grid = document.getElementById('gameBoard');

  // ASSIGNS MARKS IN GRID TILES FOR EACH ELEMENT OF THE ARRAY
  function render() {
     for (let i = 0; i < gridTiles.length; i++) {
      gridTiles[i].textContent = gameBoard.gameBoardArr[i]
    }
    return gridTiles
  }

  // EVENT LISTENER FOR STARTING THE GAME
  grid.addEventListener('click', game.playGame);


  return {
    // gameBoardArr,
    gridTiles,
    // grid,
    render,
  }
})()



