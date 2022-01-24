const game = (() => {
  let gameMode;
  let currentPlayer;
  let playerName; 
  let playerMark;
  let player1Name;
  let player2Name;
  let player1Mark;
  let player2Mark;

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
  let isArrayFull;
  

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
    if ( (!document.getElementById('X').checked) && (!document.getElementById('O').checked) ) return

    if (document.getElementById('X').checked) {
      playerMark = "X"
    }
    if (document.getElementById('O').checked) {
      playerMark = "O"
    }
  }

  const getMark2 = () => {
    if ( (!document.getElementById('p1-X').checked) && (!document.getElementById('p1-O').checked) ) return

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
      console.log('current player is player1');

    } else if (player2.mark === 'X') {
      player2.currentPlayer = 'true';
      player1.currentPlayer = 'false';
      console.log('current player is player1');
    }


  }

  const switchCurrentPlayer = () => {
    if (player1.currentPlayer === 'true' && player2.currentPlayer === 'false') {
      player1.currentPlayer = 'false';
      player2.currentPlayer = 'true';
      console.log('AFTER SWITCH: current player is player2');

    }else if (player1.currentPlayer === 'false' && player2.currentPlayer === 'true') {
      player1.currentPlayer = 'true';
      player2.currentPlayer = 'false';
      console.log('AFTER SWITCH: current player is player1');
    }
  }

  const markSpace = (e) => {
    let index = gameBoard.gridTiles.indexOf(e.target);
    if (!(gameBoard.gameBoardArr[index] === '')) return
    if (player1.currentPlayer === 'true') {
      gameBoard.gameBoardArr[index] = player1.mark;
    }
    if (player2.currentPlayer === 'true') {
      gameBoard.gameBoardArr[index] = player2.mark;
    }
    gameBoard.render();
    switchCurrentPlayer();

    isArrayFull = gameBoard.gameBoardArr.every(element => element !== '')
    console.log(isArrayFull)

    checkForWin()
  }

  const checkForWin = () => {
    console.log('fired check for win')
    checkRows();
    checkColumns();
    checkDiagonals();
  }

  const checkRows = () => {
    console.log('fired check rows')
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'X')) ||
  
      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'X')) ||
  
      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X')) ) {
      console.log('ROWS X')
      declareWinner('X')
  
    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1]) && (gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2]) && (gameBoard.gameBoardArr[2] === 'O')) ||
  
      ((gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === 'O')) ||
  
      ((gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O')) ) {
      console.log('ROWS O')
      declareWinner('O')
      
    } else return
  }

  // const checkRows = () => {
  //   console.log('fired check rows')
  //   if (
  //     gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2] === 'X' ||
  //     gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5] === 'X' ||
  //     gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8] === 'X') {
  //     console.log('ROWS X')
  //     declareWinner('X')
  //   } else if (
  //     gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[2] === 'O' ||
  //     gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[5] === 'O' ||
  //     gameBoard.gameBoardArr[6] === gameBoard.gameBoardArr[7] === gameBoard.gameBoardArr[8] === 'O') {
  //     console.log('ROWS O')
  //     declareWinner('O')
  //   } else return
  // }

  const checkColumns = () => {
    console.log('fired check columns')
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X')) ||
  
      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'X')) ||
  
      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X')) ) {
      console.log('COLUMNS X')
      declareWinner('X')
  
    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3]) && (gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O')) ||
  
      ((gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7]) && (gameBoard.gameBoardArr[7] === 'O')) ||
  
      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5]) && (gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O')) ) {
      console.log('COLUMNS O')
      declareWinner('O')
  
    } else return
  }

  // const checkColumns = () => {
  //   console.log('fired check columns')
  //   if (
  //     gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6] === 'X' ||
  //     gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7] === 'X' ||
  //     gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8] === 'X') {
  //     console.log('COLUMNS X')
  //     declareWinner('X')

  //   } else if (
  //     gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[3] === gameBoard.gameBoardArr[6] === 'O' ||
  //     gameBoard.gameBoardArr[1] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[7] === 'O' ||
  //     gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[5] === gameBoard.gameBoardArr[8] === 'O') {
  //     console.log('COLUMNS O')
  //     declareWinner('O')

  //   } else return
  // }

  const checkDiagonals = () => {
    console.log('fired check diagonals')
    if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'X')) ||
  
      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'X')) ) {
      console.log('DIAGONAL X')
      declareWinner('X')
  
    } else if (
      ((gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8]) && (gameBoard.gameBoardArr[8] === 'O')) ||
  
      ((gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4]) && (gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6]) && (gameBoard.gameBoardArr[6] === 'O')) ) {
      console.log('DIAGONAL O')
      declareWinner('O')
  
    } else return
  }

  // const checkDiagonals = () => {
  //   console.log('fired check diagonals')
  //   if (
  //     gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8] === 'X' ||
  //     gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6] === 'X') {
  //     console.log('DIAGONAL X')
  //     declareWinner('X')

  //   } else if (
  //     gameBoard.gameBoardArr[0] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[8] === 'O' ||
  //     gameBoard.gameBoardArr[2] === gameBoard.gameBoardArr[4] === gameBoard.gameBoardArr[6] === 'O') {
  //     console.log('DIAGONAL O')
  //     declareWinner('O')

  //   } else return
  // }

  const declareWinner = (mark) => {
    if (player1.mark === mark) {
      displayWinner.textContent = `${player1.name} won! Congratulations!`;
    } else if (player2.mark === mark) {
      displayWinner.textContent = `${player2.name} won! Congratulations!`;
    }
    displayWinner.classList.add('visible');
    displayWinner.classList.remove('hidden');
  }


  document.getElementById('chooseMode').addEventListener('click', setGameMode)

  document.getElementById('playerMark').addEventListener('click', getMark1)

  document.getElementById('player1Mark').addEventListener('click', getMark2)

  newGameBtn.addEventListener('click', () => {
    getPlayerNames();
    createNewPlayers();
    setCurrentPlayer();
  })

  return {
    markSpace,
    switchCurrentPlayer,
  }


})()


const gameBoard = (() => {

  let gameBoardArr = ["", "", "", "", "", "", "", "", ""];
  const gridTiles = Array.from(document.getElementsByClassName('gridTile'));
  const grid = document.getElementById('gameBoard');

  const render = function() {
    for (let i = 0; i < gridTiles.length; i++) {
      gridTiles[i].textContent = gameBoardArr[i]
    }
    return gridTiles
  }

  
  grid.addEventListener('click', game.markSpace);


  return {
    gameBoardArr,
    gridTiles,
    grid,
    render,
  }
})()

// const player = (name, mark) => {
//   this.name = name;
//   this.mark = mark;
//   let currentPlayer
//   return {
//     name, 
//     mark,
//     currentPlayer: currentPlayer,
//   }
// }




// document.getElementById(newGameBtn).addEventListener('click', () => {
//   if (gameMode === 1) {
//     playerName = document.getElementById('playerName').value;
//     playerMark = document.getElementById('playerName').value;
//     let player = 
//   }
// })


