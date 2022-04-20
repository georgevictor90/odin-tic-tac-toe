      //////////////////////
//////// GET DOM ELEMENTS ////////
      /////////////////////

//GET THE PAGES
const pages = document.querySelectorAll('.page');
const translateAmount = 100;
let translate = 0;
let gameMode;

//GET THE VS BUTTONS
const vsButtons = document.querySelectorAll('.vs-button');

//GET THE PLAYER MARK BUTTONS ON PAGE 2
const p1MarkButtons = document.querySelectorAll('.p1-mark-button');
const p2MarkButtons = document.querySelectorAll('.p2-mark-button');

//GET 'NEXT' BUTTON 
const nextBtn = document.querySelector('.next');

//GET NAME INPUTS
const p1NameInput = document.querySelector('#p1Name');
const p2NameInput = document.querySelector('#p2Name');

//GET THE PLAYER INFO DISPLAY DIVS
const p1CardName = document.querySelector('.player1-card-name');
const p2CardName = document.querySelector('.player2-card-name');
const p1CardMark = document.querySelector('.player1-card-mark');
const p2CardMark = document.querySelector('.player2-card-mark');
const p1CardScore = document.querySelector('.player1-card-score');
const p2CardScore = document.querySelector('.player2-card-score');

//GET THE PLAYER2 INFORMATION DIV
const player2Info = document.querySelector('.player2-info');

//GET GRID AND GRIDTILES
const gridTiles = Array.from(document.getElementsByClassName('gridTile'));
const grid = document.getElementById('gameBoard');

const winnerInfo = document.querySelector('.winner-info');

////////////////////////////////
//////// CREATE PLAYERS ////////
///////////////////////////////

// PLAYER FACTORY FUNCTION
function Player(name, mark) {
  return {
    name: name,
    mark: mark,
    score: 0,
  }
}

//CREATE PLAYER OBJECTS
const player1 = Player();
const player2 = Player();



///////////////////////////
//////// FUNCTIONS ////////
///////////////////////////

//SLIDE PAGE FUNCTION
slide = (direction) => {
  direction === 'next' ? translate -= translateAmount : translate += translateAmount;
  pages.forEach(
    pages => (pages.style.transform = `translateX(${translate}%)`)
    );
  }
  
//GAME MODE FUNCTION
function setGameMode(value) {
  gameMode = value;
}

//DISPLAY NAME AND MARK INFO IN PLAYER CARDS
function displayNamesMarks() {
  p1CardName.textContent = player1.name;
  p2CardName.textContent = player2.name;
  p1CardMark.textContent = player1.mark;
  p2CardMark.textContent = player2.mark;
}

//DISPLAY SCORES IN PLAYER CARDS
function displayScores() {
  p1CardScore.textContent = `Score: ${player1.score}`;
  p2CardScore.textContent = `Score: ${player2.score}`;
}

//PLAYER TO MAKE THE FIRST MOVE
function setFirstMover() {
  if (isFirstMove()) {
    if (lastRoundWinner === undefined) {
      player1.mark === 'X' ? currentPlayer = player1 : currentPlayer = player2;
    } else {
      currentPlayer = lastRoundWinner;
    };
  };
};

//CHECKS IF IT'S THE FIRST MOVE OF THE ROUND
function isFirstMove() {
  return gridTiles.every(tile => tile.textContent === '');
};


function isGameOver() {
  if (player1.score == 5 || player2.score == 5) {
    return true;
  }
}

function newRound() {
  resetBoard();
  origBoard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  render();
  roundOver = false;
}

function resetBoard() {
  gridTiles.forEach(tile => tile.textContent = '');
}

function winning(board, player) {
  if (board[0].textContent == player.mark && board[1].textContent == player.mark && board[2].textContent == player.mark ||
      board[3].textContent == player.mark && board[4].textContent == player.mark && board[5].textContent == player.mark ||
      board[6].textContent == player.mark && board[7].textContent == player.mark && board[8].textContent == player.mark ||
      board[0].textContent == player.mark && board[3].textContent == player.mark && board[6].textContent == player.mark ||
      board[1].textContent == player.mark && board[4].textContent == player.mark && board[7].textContent == player.mark ||
      board[2].textContent == player.mark && board[5].textContent == player.mark && board[8].textContent == player.mark ||
      board[0].textContent == player.mark && board[4].textContent == player.mark && board[8].textContent == player.mark ||
      board[2].textContent == player.mark && board[4].textContent == player.mark && board[6].textContent == player.mark) {
      return true;
  } else {
      return false;
  }
}

function winning1B(board, player) {
  if (board[0] == player.mark && board[1] == player.mark && board[2] == player.mark ||
      board[3] == player.mark && board[4] == player.mark && board[5] == player.mark ||
      board[6] == player.mark && board[7] == player.mark && board[8] == player.mark ||
      board[0] == player.mark && board[3] == player.mark && board[6] == player.mark ||
      board[1] == player.mark && board[4] == player.mark && board[7] == player.mark ||
      board[2] == player.mark && board[5] == player.mark && board[8] == player.mark ||
      board[0] == player.mark && board[4] == player.mark && board[8] == player.mark ||
      board[2] == player.mark && board[4] == player.mark && board[6] == player.mark) {
      return true;
  } else {
      return false;
  }
}

function checkDraw() {
  if (gridTiles.every(tile => tile.textContent.length > 0) && winning(gridTiles, currentPlayer) === false) {
    return true
  } else {
    return false
  }
}

function switchCurrentPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else if (currentPlayer === player2) {
    currentPlayer = player1;
  }
}

function setOtherPlayer() {
  currentPlayer === player1 ? otherPlayer = player2 : otherPlayer = player1;
}


/////////////////////////////////
//////// EVENT LISTENERS ////////
/////////////////////////////////

vsButtons.forEach((button) => {
  button.addEventListener('click', function(){
    slide('next');
    setGameMode(button.value);
    player2Info.style.display = 'flex';
    if (gameMode === '1a' || gameMode === '1b') {
      player2.name = 'CPU';
      player2Info.style.display = 'none';
    }
    player1.mark = null;
    player2.mark = null;
    p1MarkButtons.forEach(button => {
      button.classList.remove('active');
    })
    p2MarkButtons.forEach(button => {
      button.classList.remove('active')
    })
  })
})

p1MarkButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) return
    button.classList.toggle('active');
    player1.mark = button.value;
    if (button.value === 'X') {
      p1MarkButtons[1].classList.remove('active');
      p2MarkButtons[0].classList.remove('active');
      p2MarkButtons[1].classList.toggle('active');
      player2.mark = p2MarkButtons[1].value;
    }
    if (button.value === 'O') {
      p1MarkButtons[0].classList.remove('active');
      p2MarkButtons[0].classList.toggle('active');
      p2MarkButtons[1].classList.remove('active');
      player2.mark = p2MarkButtons[0].value;
    }
  })
})

p2MarkButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) return
    button.classList.toggle('active');
    player2.mark = button.value;
    if (button.value === 'X') {
      p2MarkButtons[1].classList.remove('active');
      p1MarkButtons[0].classList.remove('active');
      p1MarkButtons[1].classList.toggle('active');
      player1.mark = p1MarkButtons[1].value;
    }
    if (button.value === 'O') {
      p2MarkButtons[0].classList.remove('active');
      p1MarkButtons[0].classList.toggle('active');
      p1MarkButtons[1].classList.remove('active');
      player1.mark = p1MarkButtons[0].value;
    }
  })
})

// nextBtn.addEventListener('click', () => {
//   if (gameMode === '2') {
//     if (p1NameInput.value.length < 1 || p2NameInput.value.length < 1) {
//       alert("Don't forGET to write your names!");
//       return
//     }
//     player1.name = p1NameInput.value;
//     player2.name = p2NameInput.value;
//   } else {
//     if (p1NameInput.value.length < 1) {
//       alert("Don't forGET to write your name!");
//       return
//     }
//     player1.name = p1NameInput.value;
//   }
//   if (!(player1.mark) || !(player2.mark)) {
//     alert("Please choose a mark!");
//     return
//   }
//   slide('next');
//   setFirstMover();
//   if (!(gameMode==='2')) {
//     easyAiMove();
//   }
//   displayNamesMarks();
//   displayScores();
//   winnerInfo.textContent = `${currentPlayer.name}'s turn!`;
// })

nextBtn.addEventListener('click', () => {
  if (!(player1.mark) || !(player2.mark)) {
    alert("Please choose a mark!");
    return
  }
  
  switch(gameMode) {
    case '1a' : 
      if (p1NameInput.value.length < 1) {
        alert("Don't forget to write your name!");
        return
      }
      player1.name = p1NameInput.value;

      currentPlayer = player2;
      easyAiMove();
      currentPlayer = player1;
      gridTiles.forEach(tile => {
        tile.addEventListener('click', playMode1A)
      });
      break;
    case '1b' :
      if (p1NameInput.value.length < 1) {
        alert("Don't forget to write your name!");
        return
      }
      player1.name = p1NameInput.value;
      
      setFirstMover();
      //random ai move
      if (currentPlayer == player2) {
        availableSpots = emptyIndexesMinimax(origBoard);
        let index = Math.floor(Math.random() * availableSpots.length);
        origBoard[index] = player2.mark;
        render();
        switchCurrentPlayer();
      } 
      gridTiles.forEach(tile => {
        tile.addEventListener('click', playMode1B)
      });
      break;
    case  '2' :

      if (p1NameInput.value.length < 1 || p2NameInput.value.length < 1) {
        alert("Don't forget to write your names!");
        return
      }
      player1.name = p1NameInput.value;
      player2.name = p2NameInput.value;

      player1.mark === 'X' ? currentPlayer = player1 : currentPlayer = player2;
      gridTiles.forEach(tile => {
        tile.addEventListener('click', playMode2)
      });
      break;
  }
  slide('next');
  displayNamesMarks();
  displayScores();
  winnerInfo.textContent = `${currentPlayer.name}'s turn!`;
})



//////////////////////////
/////GAMEBOARD////////////
//////////////////////////

//DEFINE VARIABLES
let origBoard = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let currentPlayer;
let otherPlayer;
let roundOver;
let gameOver;
let lastRoundWinner;
let availableSpots;


//EVEN LISTENER FOR GRID TILES
// gridTiles.forEach( tile => {
//   tile.addEventListener('click', function() {
//     setFirstMover();
//     if (gameOver === true) {
//       player1.score = 0;
//       player2.score = 0;
//       displayScores();
//       gameOver = false;
//     }
//     if (roundOver === true) {
//       newRound();
//       winnerInfo.textContent = `${currentPlayer.name}'s turn`;
//       return
//     }
//     setOtherPlayer();
//     if (this.textContent === 'X' || this.textContent === 'O') return
//     winnerInfo.textContent = `${otherPlayer.name}'s turn`;

//     this.textContent = currentPlayer.mark;

//     if (winning(gridTiles, currentPlayer) === true) {
//       winnerInfo.textContent = `${currentPlayer.name} won the round!`;
//       roundOver = true; 
//       currentPlayer.score++;
//       displayScores();
//       if (isGameOver() === true) {
//         winnerInfo.textContent = `${currentPlayer.name} won the game with 5 points! CLICK THE BOARD TO PLAY AGAIN!`;
//         gameOver = true;
//       }
//       lastRoundWinner = currentPlayer;
//       return
//     };

//     if (checkDraw()) {
//       winnerInfo.textContent = 'Draw game!';
//       roundOver = true;
//       return
//     };

//     switchCurrentPlayer();
//   })
// })

// gridTiles.forEach( tile => {
//   tile.addEventListener('click', function() {
//     // setFirstMover();
//     if (gameOver === true) {
//       player1.score = 0;
//       player2.score = 0;
//       displayScores();
//       gameOver = false;
//     }
//     if (roundOver === true) {
//       newRound();
//       winnerInfo.textContent = `${currentPlayer.name}'s turn`;
//       return
//     }
//     setOtherPlayer();
//     if (this.textContent === 'X' || this.textContent === 'O') return
//     winnerInfo.textContent = `${otherPlayer.name}'s turn`;

//     this.textContent = currentPlayer.mark;

//     if (winning(gridTiles, currentPlayer) === true) {
//       winnerInfo.textContent = `${currentPlayer.name} won the round!`;
//       roundOver = true; 
//       currentPlayer.score++;
//       displayScores();
//       if (isGameOver() === true) {
//         winnerInfo.textContent = `${currentPlayer.name} won the game with 5 points! CLICK THE BOARD TO PLAY AGAIN!`;
//         gameOver = true;
//       }
//       lastRoundWinner = currentPlayer;
//       return
//     };

//     if (checkDraw()) {
//       winnerInfo.textContent = 'Draw game!';
//       roundOver = true;
//       return
//     };

//     switchCurrentPlayer();

//     if (!(gameMode === '2')) {
//       if (gameMode === '1a') {
//         easyAiMove();
//       };

//       if (gameMode === '1b') {
//         smartAiMove();
//       };
//       console.log(winning(gridTiles, currentPlayer));
//       if (winning(gridTiles, currentPlayer) === true) {
//         console.log('winning : IT WORKS');
//         winnerInfo.textContent = `${currentPlayer.name} won the round!`;
//         roundOver = true; 
//         currentPlayer.score++;
//         displayScores();
//         if (isGameOver() === true) {
//           winnerInfo.textContent = `${currentPlayer.name} won the game with 5 points! CLICK THE BOARD TO PLAY AGAIN!`;
//           gameOver = true;
//         }
//         lastRoundWinner = currentPlayer;
//         return
//       };

//       if (checkDraw()) {
//         winnerInfo.textContent = 'Draw game!';
//         roundOver = true;
//         return
//       };

//       // switchCurrentPlayer();
//     }
//   console.log(`current player: ${currentPlayer.name}`);  
//   })
// })

function easyAiMove() {
  // if (roundOver === true) {
  //   newRound();
  //   winnerInfo.textContent = `${currentPlayer.name}'s turn`;
  //   return
  // }
  availableSpots = emptyIndexes(gridTiles);
  let index = Math.floor((Math.random() * availableSpots.length));
  availableSpots[index].textContent = player2.mark;

  if (winning(gridTiles, currentPlayer) === true) {
    endRound();
  };

  if (checkDraw()) {
    winnerInfo.textContent = 'Draw game!';
    roundOver = true;
    return
  };
}

function smartAiMove() {
  let step = minimax(origBoard, player2.mark);
  console.log(step);
  origBoard[step.index] = player2.mark;
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

function emptyIndexes(board) {
  return board.filter(s =>  s.textContent.length == 0);
}

function emptyIndexesMinimax(board) {
  return board.filter(s => s !== "O" && s !== "X");
}


// function minimax(newBoard, player) {
//   const availableSpots = emptyIndexesMinimax(newBoard);
  
//   if (winning1B(newBoard, player1.mark)) {
//     return {score : -10};
//   }
//   else if (winning1B(newBoard, player2.mark)) {
//     return {score: 10};
//   }
//   else if (availableSpots.length === 0) {
//     return {score: 0};
//   }
  
//   const moves = [];
  
//   for (let i = 0; i < availableSpots.length; i++) {
//     const move = {};
  
//     move.index = newBoard[availableSpots[i]];
  
//     newBoard[availableSpots[i]] = player;
  
//     if (player == player2.mark) {
//       let result = minimax(newBoard, player1.mark);
//       move.score = result.score;
//     }
//     else {
//       let result = minimax(newBoard, player2.mark);
//       move.score = result.score;
//     }
  
//     newBoard[availableSpots[i]] = move.index;
  
//     moves.push(move);
//   }

//   let bestMove;

//   if (player === player2.mark) {
//     let bestScore = -10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     let bestScore = 10000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }

//   return moves[bestMove];
// }

function minimax(newBoard, player) {
  const availableSpots = emptyIndexesMinimax(newBoard);
  
  if (winning1B(newBoard, player1)) {
    return {score : -10};
  }
  else if (winning1B(newBoard, player2)) {
    return {score: 10};
  }
  else if (availableSpots.length === 0) {
    return {score: 0};
  }
  
  const moves = [];
  
  for (let i = 0; i < availableSpots.length; i++) {
    const move = {};
  
    move.index = newBoard[availableSpots[i]];
  
    newBoard[availableSpots[i]] = player;
  
    if (player == player2.mark) {
      let result = minimax(newBoard, player1.mark);
      move.score = result.score;
    }
    else {
      let result = minimax(newBoard, player2.mark);
      move.score = result.score;
    }
  
    newBoard[availableSpots[i]] = move.index;
  
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


function playMode1A() {
  console.log('started playmode1A');
  if (gameOver === true) {
    player1.score = 0;
    player2.score = 0;
    displayScores();
    gameOver = false;
  }
  if (roundOver === true) {
    newRound();
    currentPlayer = lastRoundWinner;
    if (lastRoundWinner === undefined) {
      switch (player1.mark) {
        case 'X':
          currentPlayer = player1;
          break;
        case 'O':
          currentPlayer = player2;
          break;
      }
    };
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (lastRoundWinner === player1) {
      return
    } else {
      easyAiMove();
      switchCurrentPlayer();
      winnerInfo.textContent = `${currentPlayer.name}'s turn`;
      return
    }
  }

  if (this.textContent.length > 0) return
  this.textContent = player1.mark;

  if (winning(gridTiles, currentPlayer) === true) {
    endRound();
    return
  };

  if (checkDraw() === true) {
    winnerInfo.textContent = 'Draw game!';
    roundOver = true;
    return
  };

  switchCurrentPlayer();
  winnerInfo.textContent = `${currentPlayer.name}'s turn`;

  easyAiMove();

  if (roundOver === true) {
    return
  } else {
    switchCurrentPlayer();
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
  }
}

function playMode1B() {
  console.log('started playmode1B');
  if (gameOver === true) {
    player1.score = 0;
    player2.score = 0;
    displayScores();
    gameOver = false;
    return
  }
  if (roundOver === true) {
    newRound();
    currentPlayer = lastRoundWinner;
    if (lastRoundWinner === undefined) {
      switch (player1.mark) {
        case 'X':
          currentPlayer = player1;
          break;
        case 'O':
          currentPlayer = player2;
          break;
        };
        winnerInfo.textContent = `${currentPlayer.name}'s turn`;
        return
    };
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (lastRoundWinner === player1) {
      return
    } else if (lastRoundWinner === player2) {

      //random ai move
      // availableSpots = emptyIndexesMinimax(origBoard);
      // let index = Math.floor(Math.random() * availableSpots.length);
      // availableSpots[index].textContent = player2.mark;
      let randomSpot = Math.floor(Math.random() * 10);
      origBoard[randomSpot] = player2.mark;
      render();
      // smartAiMove();
      if (winning1B(origBoard, currentPlayer) === true) {
        endRound();
        return
      };
    
      if (checkDraw() === true) {
        winnerInfo.textContent = 'Draw game!';
        roundOver = true;
        return
      };

      switchCurrentPlayer();
      winnerInfo.textContent = `${currentPlayer.name}'s turn`;
      return
    }
  }

  if (this.textContent.length > 0) return
  origBoard[gridTiles.indexOf(this)] = player1.mark;
  render();

  if (winning1B(origBoard, currentPlayer) === true) {
    endRound();
    return
  };

  if (checkDraw() === true) {
    winnerInfo.textContent = 'Draw game!';
    roundOver = true;
    return
  };

  switchCurrentPlayer();
  winnerInfo.textContent = `${currentPlayer.name}'s turn`;

  smartAiMove();

  if (winning1B(origBoard, currentPlayer) === true) {
    endRound();
    return
  };

  if (checkDraw() === true) {
    winnerInfo.textContent = 'Draw game!';
    roundOver = true;
    return
  };


  if (roundOver === true) {
    return
  } else {
    switchCurrentPlayer();
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
  }
}

function playMode2() {
  console.log('started playmode2');
  if (gameOver === true) {
    player1.score = 0;
    player2.score = 0;
    displayScores();
    gameOver = false;
  }
  if (roundOver === true) {
    newRound();
    currentPlayer = lastRoundWinner;
    if (lastRoundWinner === undefined || lastRoundWinner === null) {
      switch (player1.mark) {
        case 'X':
          currentPlayer = player1;
          break;
        case 'O':
          currentPlayer = player2;
          break;
      }
    };
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
    return
  }

  if (this.textContent.length > 0) return
  this.textContent = currentPlayer.mark;
  if (winning(gridTiles, currentPlayer) === true) {
    endRound();
    return
  };

  if (checkDraw()) {
    winnerInfo.textContent = 'Draw game!';
    roundOver = true;
    lastRoundWinner = null;
    return
  };
  switchCurrentPlayer();
  winnerInfo.textContent = `${currentPlayer.name}'s turn`;

}

function endRound() {
    winnerInfo.textContent = `${currentPlayer.name} won the round!`;
    roundOver = true; 
    currentPlayer.score++;
    displayScores();
    if (isGameOver() === true) {
      winnerInfo.textContent = `${currentPlayer.name} won the game with 5 points! CLICK THE BOARD TO PLAY AGAIN!`;
      gameOver = true;
    };
    lastRoundWinner = currentPlayer;
    return
}
