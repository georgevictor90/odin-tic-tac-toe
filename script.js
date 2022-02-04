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
  let isArrayFull;
  let player1Score = 0;
  let player2Score = 0;

  // GRAB DOM ELEMENTS
  const newGameBtn = document.getElementById('newGameBtn');
  const displayWinner = document.getElementById('displayWinner');
  const p1NameInfo = document.getElementById('p1Name');
  const p2NameInfo = document.getElementById('p2Name');
  const p1ScoreInfo = document.getElementById('p1Score');
  const p2ScoreInfo = document.getElementById('p2Score');

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


  // GAME MODE 1 MEANS SINGLE PLAYER (VS COMPUTER), GAME MODE 2 MEANS TWO PLAYERS (PLAYER VS PLAYER)
  const setGameMode = () => {
    if (document.getElementById('vsComputer').checked) {
      document.getElementById('vsComputerForm').classList.add('visible');
      document.getElementById('vsComputerForm').classList.remove('hidden');
      document.getElementById('vsPlayerForm').classList.remove('visible');
      document.getElementById('vsPlayerForm').classList.add('hidden');
      gameMode = 1;
    }
    if (document.getElementById('vsPlayer').checked) {
      document.getElementById('vsPlayerForm').classList.add('visible');
      document.getElementById('vsPlayerForm').classList.remove('hidden');
      document.getElementById('vsComputerForm').classList.remove('visible');
      document.getElementById('vsComputerForm').classList.add('hidden');
      gameMode = 2
    }
    if (!gameMode) return
    return gameMode
  }

  // GETS THE SELECTED PLAYER MARK FOR SINGLE PLAYER GAME MODE
  const getMark1 = () => {
    if ((!document.getElementById('X').checked) && (!document.getElementById('O').checked)) return

    if (document.getElementById('X').checked) {
      playerMark = "X"
    }
    if (document.getElementById('O').checked) {
      playerMark = "O"
    }
  }

  // GETS THE SELECTED PLAYER MARKS FOR 2 PLAYERS GAME MODE
  const getMark2 = () => {
    if ((!document.getElementById('p1-X').checked) && (!document.getElementById('p1-O').checked)) return

    if (document.getElementById('p1-X').checked) {
      player1Mark = "X";
      player2Mark = "O";
    }
    if (document.getElementById('p1-O').checked) {
      player1Mark = "O";
      player2Mark = "X"
    }
  }

  // GETS THE PLAYER NAMES FROM USER INPUT VALUES
  const getPlayerNames = () => {
    if (gameMode === 2) {
      player1Name = document.getElementById('player1Name').value;
      player2Name = document.getElementById('player2Name').value;
    }
    if (gameMode === 1) {
      player1Name = document.getElementById('playerName').value;
      player2Name = 'Computer';
    }

  }

  // ASSIGNS THE PLAYER NAMES AND MARKS TO THE PLAYER OBJECTS
  const createNewPlayers = () => {
    player1.name = player1Name;
    player1.mark = player1Mark;
    player2.name = player2Name;
    player2.mark = player2Mark;
  }

  //DISPLAYS THE PLAYER NAMES IN THE PLAYERINFO DIV
  const displayPlayerNames = () => {
    p1NameInfo.textContent = `Player1 Name: ${player1Name.toUpperCase()}`;
    p2NameInfo.textContent = `Player2 Name: ${player2Name.toUpperCase()}`;
  }

  //DISPLAYS SCORES IN PLAYERINFO DIV
  const displayScores = () => {
    p1ScoreInfo.textContent = `Player1 Score: ${player1Score}`;
    p2ScoreInfo.textContent = `Player2 Score: ${player2Score}`;
  }

  //DISPLAY PLAYER NAMES AND SCORES
  const displayInfo = () => {
    displayPlayerNames();
    displayScores();
  }

  //SETS THE CURRENT PLAYER FOR THE FIRST MOVE BASED ON MARK (x starts first)
  const setCurrentPlayer = () => {
    if (player1.mark === 'X') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';

    } else if (player2.mark === 'X') {
      player2.currentPlayer = 'true';
      player1.currentPlayer = 'false';
    }


  }

  // SWITCHES CURRENT PLAYER AFTER EACH TURN
  const switchCurrentPlayer = () => {
    if (player1.currentPlayer === 'true' && player2.currentPlayer === 'false') {
      player1.currentPlayer = 'false';
      player2.currentPlayer = 'true';

    } else if (player1.currentPlayer === 'false' && player2.currentPlayer === 'true') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';
    }
  }

  // RETURNS VALUE OF GAMEISOVER
  const getGameIsOver = () => gameIsOver;

  // CHECKS THE CURRENT PLAYER AND MARKS THE CLICKED SPACE WITH ITS MARK, THEN SWITCHES CURRENT PLAYER AND CHECK FOR WIN
  const markSpace = (e) => {
    index = gameBoard.gridTiles.indexOf(e.target);
    console.log(`markSpace --> index: ${index}, player1.mark: ${player1.mark}, player2.mark: ${player2.mark}`);
    if (!(gameBoard.gameBoardArr[index] === '')) return
    if (player1.currentPlayer === 'true') {
      gameBoard.gameBoardArr[index] = player1.mark;
    }
    if (player2.currentPlayer === 'true') {
      gameBoard.gameBoardArr[index] = player2.mark;
    }
    gameBoard.render();

    switchCurrentPlayer();

    isArrayFull = gameBoard.gameBoardArr.every(element => element !== '');

    checkForWin()
  }

  // CHECKS FOR WIN ON ROWS, COLUMNS AND DIAGONALS , THEN CHECKS FOR DRAW
  const checkForWin = () => {
    console.log('Fired checkForWin');
    checkRows();
    checkColumns();
    checkDiagonals();
    checkDraw();
    displayScores();
  }

  // CHECKS FOR THREE IDENTICAL MARKS ON GRID ROWS
  const checkRows = () => {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'X')) ||

      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'X')) ||

      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');
      player1Score++;
      return

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'O')) ||

      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'O')) ||

      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');
      player2Score++;
      return

    } else return
  }


  // CHECKS FOR THREE IDENTICAL MARKS ON GRID COLUMNS
  const checkColumns = () => {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X')) ||

      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'X')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');
      player1Score++;
      return

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O')) ||

      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'O')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');
      player2Score++;
      return

    } else return
  }


  // CHECKS FOR THREE IDENTICAL MARKS ON GRID DIAGONALS
  const checkDiagonals = () => {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');
      player1Score++;
      return

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');
      player2Score++;
      return

    } else return
  }

  // CHECKS FOR DRAW
  const checkDraw = () => {
    if (gameIsOver === false && isArrayFull === true) {
      gameIsOver = true;
      declareDraw();
    }
  }

  // ANNOUNCES DRAW GAME ON SCREEN
  const declareDraw = () => {
    displayWinner.textContent = "It's a draw!";
    displayWinner.classList.add('visible');
    displayWinner.classList.remove('hidden');
  }


  // ANNOUNCES WINNER OF ROUND ON SCREEN
  const declareWinner = (mark) => {
    if (player1.mark === mark) {
      displayWinner.textContent = `${player1.name} won! Congratulations!`;
    } else if (player2.mark === mark) {
      displayWinner.textContent = `${player2.name} won! Congratulations!`;
    }
    displayWinner.classList.add('visible');
    displayWinner.classList.remove('hidden');
  }
  

  // CLEARS THE GRID AND STARTS NEW ROUND
  const startNewRound = () => {
    gameIsOver = false;
    setCurrentPlayer();
    gameBoard.gameBoardArr = ["", "", "", "", "", "", "", "", ""];
    console.log(`Fired startNewRound, gameIsOver = false, setCurrentPlayer, gameBoardArr is empty`);
    gameBoard.render();
  }

  // STARTS GAME
  const playGame = (e) => {
    console.log('Fired playGame')
    if (gameIsOver === true) {
      console.log('playGame if --> gameIsOver = true, startNewRound, markSpace(e)')
      startNewRound();
      displayWinner.classList.remove('visible');
      displayWinner.classList.add('hidden');
    } else {
      console.log('playGame else (gameIsOver = false) --> markSpace(e)')
      markSpace(e);
    }
    
  }

  // EVENT LISTENERS
  document.getElementById('chooseMode').addEventListener('click', setGameMode)

  document.getElementById('playerMark').addEventListener('click', getMark1)

  document.getElementById('player1Mark').addEventListener('click', getMark2)

  newGameBtn.addEventListener('click', () => {
    getPlayerNames();
    createNewPlayers();
    startNewRound();
    displayInfo();
  })


  return {
    markSpace,
    switchCurrentPlayer,
    startNewRound,
    getGameIsOver,
    playGame,
  }


})()


const gameBoard = (() => {
  let gameBoardArr = ["", "", "", "", "", "", "", "", ""];
  let gridTiles = Array.from(document.getElementsByClassName('gridTile'));
  let grid = document.getElementById('gameBoard');

  // ASSIGNS MARKS IN GRID TILES FOR EACH ELEMENT OF THE ARRAY
  const render = () => {
    console.log('Fired render');
    for (let i = 0; i < gridTiles.length; i++) {
      gridTiles[i].textContent = gameBoard.gameBoardArr[i]
    }
    return gridTiles
  }

  // EVENT LISTENER FOR STARTING THE GAME
  grid.addEventListener('click', game.playGame);


  return {
    gameBoardArr,
    gridTiles,
    grid,
    render,
  }
})()



