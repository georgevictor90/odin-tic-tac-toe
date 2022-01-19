const game = (() => {
  let gameMode;
  let currentPlayer;
  let playerName; 
  let playerMark;
  let player1Mark;
  let player2Mark;

  let setGameMode = () => {
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
    console.log('Game Mode: ' + gameMode)
    return gameMode
  }


  document.getElementById('chooseMode').addEventListener('click', setGameMode)

  document.getElementById('playerMark').addEventListener('click', () => {
    if ( (!document.getElementById('X').checked) && (!document.getElementById('O').checked) ) return

    if (document.getElementById('X').checked) {
      playerMark = "X"
    }
    if (document.getElementById('O').checked) {
      playerMark = "O"
    }
    console.log('playerMark is ' + playerMark)
  })

  document.getElementById('player1Mark').addEventListener('click', () => {
    if ( (!document.getElementById('p1-X').checked) && (!document.getElementById('p1-O').checked) ) return

    if (document.getElementById('p1-X').checked) {
      player1Mark = "X";
      player2Mark = "O";
    }
    if (document.getElementById('p1-O').checked) {
      player1Mark = "O";
      player2Mark = "X"
    }
    console.log('player1Mark is ' + player1Mark);
    console.log('player2Mark is ' + player2Mark);
  })


})()


const gameBoard = (() => {
  let gameBoardArr = ["", "X", "", "O", "", "", "X", "", ""];
  const gridTiles = Array.from(document.getElementsByClassName('gridTile'));

  const render = function() {
    for (let i = 0; i < gridTiles.length; i++) {
      gridTiles[i].textContent = gameBoardArr[i]
    }
    return gridTiles;
  }

  return {
    gameBoardArr,
    gridTiles,
    render,
  }
})()

const player = (name, mark) => {
  this.name = name;
  this.mark = mark;
  return {
    name, 
    mark,
  }
}




// document.getElementById(newGameBtn).addEventListener('click', () => {
//   if (gameMode === 1) {
//     playerName = document.getElementById('playerName').value;
//     playerMark = document.getElementById('playerName').value;
//     let player = 
//   }
// })