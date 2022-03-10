const game = (() => {
  let origBoard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

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
  let switchPlayer;
  let first2Move;

  // GRAB DOM ELEMENTS
  const gridTiles = Array.from(document.getElementsByClassName('gridTile'));
  const grid = document.getElementById('gameBoard');
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
  }

  // GETS THE SELECTED PLAYER MARK FOR SINGLE PLAYER GAME MODE
  function getMark1() {
    if ((!mode1ChoiceX.checked) && (!mode1ChoiceO.checked)) return

    if (mode1ChoiceX.checked) {
      player1Mark = "X";
      player2Mark = "O";
    }
    if (mode1ChoiceO.checked) {
      player1Mark = "O";
      player2Mark = "X";
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
    if (player1Name === null || player2Name === null) {
      p1NameInfo.textContent = `Player1 Name: `;
      p2NameInfo.textContent = `Player2 Name: `;
    } else {
      p1NameInfo.textContent = `Player1 Name: ${player1Name.toUpperCase()}`;
      p2NameInfo.textContent = `Player2 Name: ${player2Name.toUpperCase()}`;
    }
  }

  //DISPLAYS SCORES IN PLAYERINFO DIV
  function displayScores() {
    p1ScoreInfo.textContent = `Player1 Score: ${player1.score}`;
    p2ScoreInfo.textContent = `Player2 Score: ${player2.score}`;
  }

  //DISPLAY PLAYER NAMES AND SCORES
  function displayInfo() {
    displayPlayerNames();
    displayScores();
  }

  // EVENT LISTENERS
  gameModeDiv.addEventListener('click', setGameMode);
  mode1PlayerMarkDiv.addEventListener('click', getMark1);
  player1MarkDiv.addEventListener('click', getMark2);
  newGameBtn.addEventListener('click', newGame);

  function resetGameBoard() {
    origBoard = ['0','1','2','3','4','5','6','7','8'];
    render();
  }

  function render() {
    for (let i = 0; i < gridTiles.length; i++) {
      if (origBoard[i] === 'X' || origBoard[i] === 'O') {
        gridTiles[i].textContent = origBoard[i];
      }
      else gridTiles[i].textContent = '';
    }
  } 

  function newGame() {
    newGameForm.style.display = 'none';
    player1.score = 0;
    player2.score = 0;
    gameSetOver = false;
    gameIsOver = false;
    resetGameBoard();
    getPlayerNames();
    createNewPlayers();
    startNewRound();
    displayInfo();

    if (gameMode === 1) {
      gameMode1Start();
    } else if (gameMode === 2) {
      gameMode2Start();
    }
  }  

  function move(e) {
    let targetIndex = gridTiles.indexOf(e.target);
    if (gameSetOver === true) {
      newGame();
      return
    }
    if (player1.mark === 'X' && gameIsOver === true) {
      resetGameBoard();
      gameIsOver = false;
      return
    }
    if (player2.mark === 'X' && gameIsOver === true) {
      resetGameBoard();
      gameIsOver = false;
      //CPU random move
      let randomSpot = Math.floor(Math.random() * 10);
      setTimeout(markSpace1, 500, player2.mark, randomSpot);
      winning(origBoard, player2.mark);
      return
    }
  
  
    if ((origBoard[targetIndex] === 'X' || origBoard[targetIndex] === 'O') && gameIsOver === false) {
      return
    } else if ((origBoard[targetIndex] === 'X' || origBoard[targetIndex] === 'O') && gameIsOver === true) {
      resetGameBoard();
      gameIsOver = false;
      return
    }
  
    if (gameIsOver === true) {
      resetGameBoard();
      gameIsOver = false;
      return
    }
  
    if (player1.mark === 'X') {
      markSpace1('X', targetIndex);
    } else {
      markSpace1('O', targetIndex);
    }
    
    winning(origBoard, player1.mark);
    let step = minimax(origBoard, player2.mark);
    markSpace1(player2.mark, step.index);
    // setTimeout(markSpace, 500, player2.mark, step.index);
    winning(origBoard, player2.mark);
    isGameOver();
  
    if (player1.score === 5 || player2.score === 5) {
      gameIsOver = true;
      gameSetOver = true;
      return
      // newGame();
      //declare winner
    }
  }

  function winning(board, player) {
    if (board[0] == player && board[1] == player && board[2] == player ||
        board[3] == player && board[4] == player && board[5] == player ||
        board[6] == player && board[7] == player && board[8] == player ||
        board[0] == player && board[3] == player && board[6] == player ||
        board[1] == player && board[4] == player && board[7] == player ||
        board[2] == player && board[5] == player && board[8] == player ||
        board[0] == player && board[4] == player && board[8] == player ||
        board[2] == player && board[4] == player && board[6] == player) {
        return true;
    } else {
        return false;
    }
  }

  function minimax(newBoard, player) {
    const availSpots = emptyIndexes(newBoard);
    
    if (winning(newBoard, player1.mark)) {
      return {score : -10};
    }
    else if (winning(newBoard, player2.mark)) {
      return {score: 10};
    }
    else if (availSpots.length === 0) {
      return {score: 0};
    }
    
    const moves = [];
    
    for (let i = 0; i < availSpots.length; i++) {
      const move = {};
    
      move.index = newBoard[availSpots[i]];
    
      newBoard[availSpots[i]] = player;
    
      if (player == player2.mark) {
        let result = minimax(newBoard, player1.mark);
        move.score = result.score;
      }
      else {
        let result = minimax(newBoard, player2.mark);
        move.score = result.score;
      }
    
      newBoard[availSpots[i]] = move.index;
    
      moves.push(move);
    }
  
    let bestMove;
  
    if (player === player2.mark) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
  }

  function emptyIndexes(board) {
    return board.filter(s => s !== "O" && s !== "X");
  }

  function isGameOver() {
    if (winning(origBoard, player1.mark)) {
      player1.score++;
      displayScores();
      gameIsOver = true;
    }
    if (winning(origBoard, player2.mark)) {
      player2.score++;
      displayScores();
      gameIsOver = true;
    }
    if (emptyIndexes(origBoard).length === 0) {
      gameIsOver = true;
    }
  }

  function gameMode1Start() {
    player1.mark === 'X' ? first2Move = 'hu' : first2Move = 'ai';
    if (first2Move === 'ai') {
      //CPU random move
      let randomSpot = Math.floor(Math.random() * 10);
      setTimeout(markSpace1, 500, player2.mark, randomSpot);
      console.log(origBoard);
      // markSpace(player2.mark, randomSpot);
      grid.addEventListener('click', move)
    } else {
      grid.addEventListener('click', move);
    }
  }

  function gameMode2Start() {
    grid.addEventListener('click', playGame);
  }

  function markSpace1(mark, index) {
    origBoard[index] = mark;
    render();
  }

  function markSpace2(e) {
    index = gridTiles.indexOf(e.target);
    if (!(origBoard[index] === '')) {
      switchPlayer = false;
      return
    }
  
    if (player1.currentPlayer === 'true') {
      origBoard[index] = player1.mark;
      switchPlayer = true;
      return
    }
    if (player2.currentPlayer === 'true') {
      origBoard[index] = player2.mark;
      switchPlayer = true;
      return
    }
  }

  // CLEARS THE GRID AND STARTS NEW ROUND
  function startNewRound() {
    gameIsOver = false;
    setCurrentPlayer();
    if (gameMode === 2) {
      origBoard = ["", "", "", "", "", "", "", "", ""];
      render();
    }
  }

  function playGame(e) {
    if (gameIsOver === true) {
      startNewRound();
      hideElement(displayWinner);
    } else {
      playRound(e);
    }
  }

  // PLAYS ONE ROUND OF TIC TAC TOE
  function playRound(e) {
    markSpace2(e);
    render();
    if (switchPlayer === false) {
      return
    } else {
      switchCurrentPlayer();
      isArrayFull = origBoard.every(element => element !== '');
      checkRoundWin();

      if (gameSetIsOver === true) {
        modal.style.display = 'block';
        displayGameSetWinner();
        resetValues();
        gameModeDiv.removeEventListener('click', setGameMode)
        mode1PlayerMarkDiv.removeEventListener('click', getMark1)
        player1MarkDiv.removeEventListener('click', getMark2)
        newGameBtn.removeEventListener('click', newGame);
      }
    }
  }  

  // CHECKS FOR WIN ON ROWS, COLUMNS AND DIAGONALS , THEN CHECKS FOR DRAW
  function checkRoundWin() {
    isGameOver();
    displayScores();
  }  
  

  return {
    origBoard,
    player1,
    player2,

  }
    
})()