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

    } else if (player2.mark = 'X') {
      player2.currentPlayer = 'true';
      player1.currentPlayer = 'false';
    }
  }

  const markSpace = (e) => {
    
    let index = gameBoard.gridTiles.indexOf(e.target);
    gameBoard.gameBoardArr[index] = 'bang!';
    gameBoard.render()
    
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