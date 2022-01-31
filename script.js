const game = (() => {
  let gameMode;
  let currentPlayer;
  let playerName;
  let playerMark;
  let player1Name;
  let player2Name;
  let player1Mark;
  let player2Mark;
  let index;
  let gameIsOver = false;
  let isArrayFull;

  const player = (name, mark) => {
    this.name = name;
    this.mark = mark;
    let currentPlayer
    return {
      name,
      mark,
      currentPlayer: currentPlayer,
    }
  }

  const player1 = player('name', 'mark');
  const player2 = player('name2', 'mark2');
  const newGameBtn = document.getElementById('newGameBtn');
  const newGameForm = document.getElementById('newGameForm');
  const displayWinner = document.getElementById('displayWinner');


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

  const getMark1 = () => {
    if ((!document.getElementById('X').checked) && (!document.getElementById('O').checked)) return

    if (document.getElementById('X').checked) {
      playerMark = "X"
    }
    if (document.getElementById('O').checked) {
      playerMark = "O"
    }
  }

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

  const createNewPlayers = () => {
    player1.name = player1Name;
    player1.mark = player1Mark;
    player2.name = player2Name;
    player2.mark = player2Mark;
  }

  const setCurrentPlayer = () => {
    if (player1.mark === 'X') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';

    } else if (player2.mark === 'X') {
      player2.currentPlayer = 'true';
      player1.currentPlayer = 'false';
    }


  }

  const switchCurrentPlayer = () => {
    if (player1.currentPlayer === 'true' && player2.currentPlayer === 'false') {
      player1.currentPlayer = 'false';
      player2.currentPlayer = 'true';

    } else if (player1.currentPlayer === 'false' && player2.currentPlayer === 'true') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';
    }
  }

  const getGameIsOver = () => gameIsOver;

  const markSpace = (e) => {
    index = gameBoard.gridTiles.indexOf(e.target);
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

  const checkForWin = () => {
    checkRows();
    checkColumns();
    checkDiagonals();
    checkDraw();
    console.log(gameIsOver);
  }

  const checkRows = () => {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'X')) ||

      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'X')) ||

      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'O')) ||

      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'O')) ||

      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');

    } else return
  }



  const checkColumns = () => {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X')) ||

      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'X')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O')) ||

      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'O')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');

    } else return
  }



  const checkDiagonals = () => {
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X'))) {
      gameIsOver = true;
      declareWinner('X');

    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O')) ||

      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O'))) {
      gameIsOver = true;
      declareWinner('O');

    } else return
  }

  const checkDraw = () => {
    if (gameIsOver === false && isArrayFull === true) {
      gameIsOver = true;
      declareDraw();
    }
  }

  const declareDraw = () => {
    displayWinner.textContent = "It's a draw!";
    displayWinner.classList.add('visible');
    displayWinner.classList.remove('hidden');
  }



  const declareWinner = (mark) => {
    if (player1.mark === mark) {
      displayWinner.textContent = `${player1.name} won! Congratulations!`;
    } else if (player2.mark === mark) {
      displayWinner.textContent = `${player2.name} won! Congratulations!`;
    }
    displayWinner.classList.add('visible');
    displayWinner.classList.remove('hidden');
  }

  const startNewRound = () => {
    gameIsOver = false;
    gameBoard.gameBoardArr = gameBoard.gameBoardArr.map((elem, ind) => gameBoard.gameBoardArr[ind] = '')
    gameBoard.render();
  }

  document.getElementById('chooseMode').addEventListener('click', setGameMode)

  document.getElementById('playerMark').addEventListener('click', getMark1)

  document.getElementById('player1Mark').addEventListener('click', getMark2)

  newGameBtn.addEventListener('click', () => {
    getPlayerNames();
    createNewPlayers();
    setCurrentPlayer();
  })

  const playGame = (e) => {
    console.log('fired playgame');
    if (gameIsOver === true) {
      startNewRound();
    } else {
      markSpace(e);
    }
  }

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

  const render = function () {
    for (let i = 0; i < gridTiles.length; i++) {
      console.log(gameBoardArr);
      gridTiles[i].textContent = gameBoardArr[i];
    }
    console.table(gridTiles);
    return gridTiles
  }


  grid.addEventListener('click', game.playGame);


  return {
    gameBoardArr,
    gridTiles,
    grid,
    render,
  }
})()



