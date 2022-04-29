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
const p1Card = document.querySelector('.player1-card');
const p2Card = document.querySelector('.player2-card');

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


//CHECK FOR A WIN (THREE IN A ROW/COLUMN/DIAGONAL)
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


//CHECK FOR DRAW
function checkDraw() {
  if (gridTiles.every(tile => tile.textContent.length > 0) && winning(gridTiles, currentPlayer) === false) {
    return true
  } else {
    return false
  }
}

//SWITCH CURRENT PLAYER
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


nextBtn.addEventListener('click', () => {
  if (!(player1.mark) || !(player2.mark)) {
    alert("Please choose a mark!");
    return
  }

  player1.color = '#FF6F3C';
  player2.color = '#f6cd61';
  
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
        gridTiles[index].style.color = player2.color;
        switchCurrentPlayer();
      } 
      gridTiles.forEach(tile => {
        tile.addEventListener('click', playMode1B)
      });
      break;
    case '2' :

      if (p1NameInput.value.length < 1 || p2NameInput.value.length < 1) {
        alert("Don't forget to write your names!");
        return
      }
      player1.name = p1NameInput.value;
      player2.name = p2NameInput.value;

      player1.mark === 'X' ? currentPlayer = player1 : currentPlayer = player2;
      if (currentPlayer == player1) {
        winnerInfo.classList.add('orange');
        winnerInfo.classList.remove('yellow');
      }
      if (currentPlayer == player2) {
        winnerInfo.classList.add('orange');
        winnerInfo.classList.remove('yellow');
      }
      gridTiles.forEach(tile => {
        tile.addEventListener('click', playMode2)
      });
      break;
  }
  slide('next');
  displayNamesMarks();
  displayScores();
  winnerInfo.textContent = `${currentPlayer.name}'s turn!`;
  if (currentPlayer == player1) {
    p1Card.classList.add('current-player');
    p2Card.classList.remove('current-player');
  } else if (currentPlayer == player2) {
    p2Card.classList.add('current-player');
    p1Card.classList.remove('current-player');
  } else {
    p1Card.classList.remove('current-player');
    p2Card.classList.remove('current-player');
  }
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


// AI MOVE FOR EASY MODE
function easyAiMove() {
  availableSpots = emptyIndexes(gridTiles);
  let index = Math.floor((Math.random() * availableSpots.length));
  availableSpots[index].textContent = player2.mark;
  availableSpots[index].style.color = currentPlayer.color;

  if (winning(gridTiles, currentPlayer) === true) {
    endRound();
  };

  if (checkDraw()) {
    winnerInfo.textContent = 'Draw game!';
    roundOver = true;
    return
  };
}

// AI MOVE FOR HARD MODE
function smartAiMove() {
  let step = minimax(origBoard, player2.mark);
  origBoard[step.index] = player2.mark;
  render();
  gridTiles[step.index].style.color = player2.color;
}


// RENDER THE ORIGINAL BOARD TO GRIDTILES
function render() {
  for (let i = 0; i < gridTiles.length; i++) {
    if (origBoard[i] === 'X' || origBoard[i] === 'O') {
      gridTiles[i].textContent = origBoard[i];
    }
    else gridTiles[i].textContent = '';
  }
} 

//RETURN EMPTY SPACES
function emptyIndexes(board) {
  return board.filter(s =>  s.textContent.length == 0);
}

//RETURN EMPTY SPACES FOR MINIMAX FUNCTION
function emptyIndexesMinimax(board) {
  return board.filter(s => s !== "O" && s !== "X");
}


//MINIMAX FUNCTION - ALGORITHM THAT CHOOSES THE BEST POSITION FOR AI PLAY
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

//PLAY MODE : EASY (1A), HARD (1B), 2PLAYERS (2)
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
    if(currentPlayer == player1) {
      winnerInfo.classList.add('orange');
      winnerInfo.classList.remove('yellow');
    }
    if (currentPlayer == player2) {
      winnerInfo.classList.remove('orange');
      winnerInfo.classList.add('yellow');
    }
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (lastRoundWinner === player1) {
      return
    } else {
      easyAiMove();
      switchCurrentPlayer();
      if(currentPlayer == player1) {
        winnerInfo.classList.add('orange');
        winnerInfo.classList.remove('yellow');
      }
      if (currentPlayer == player2) {
        winnerInfo.classList.remove('orange');
        winnerInfo.classList.add('yellow');
      }
      winnerInfo.textContent = `${currentPlayer.name}'s turn`;
      return
    }
  }

  if (this.textContent.length > 0) return
  this.textContent = player1.mark;
  this.style.color = currentPlayer.color;

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
  if(currentPlayer == player1) {
    winnerInfo.classList.add('orange');
    winnerInfo.classList.remove('yellow');
  }
  if (currentPlayer == player2) {
    winnerInfo.classList.remove('orange');
    winnerInfo.classList.add('yellow');
  }
  winnerInfo.textContent = `${currentPlayer.name}'s turn`;

  easyAiMove();

  if (roundOver === true) {
    return
  } else {
    switchCurrentPlayer();
    if(currentPlayer == player1) {
      winnerInfo.classList.add('orange');
      winnerInfo.classList.remove('yellow');
    }
    if (currentPlayer == player2) {
      winnerInfo.classList.remove('orange');
      winnerInfo.classList.add('yellow');
    }
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
        if(currentPlayer == player1) {
          winnerInfo.classList.add('orange');
          winnerInfo.classList.remove('yellow');
        }
        if (currentPlayer == player2) {
          winnerInfo.classList.remove('orange');
          winnerInfo.classList.add('yellow');
        }
        winnerInfo.textContent = `${currentPlayer.name}'s turn`;
        return
    };
    if(currentPlayer == player1) {
      winnerInfo.classList.add('orange');
      winnerInfo.classList.remove('yellow');
    }
    if (currentPlayer == player2) {
      winnerInfo.classList.remove('orange');
      winnerInfo.classList.add('yellow');
    }
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (lastRoundWinner === player1) {
      return
    } else if (lastRoundWinner === player2) {
      let randomSpot = Math.floor(Math.random() * 10);
      origBoard[randomSpot] = player2.mark;
      render();
      gridTiles[randomSpot].style.color = player2.color;

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
      if(currentPlayer == player1) {
        winnerInfo.classList.add('orange');
        winnerInfo.classList.remove('yellow');
      }
      if (currentPlayer == player2) {
        winnerInfo.classList.remove('orange');
        winnerInfo.classList.add('yellow');
      }
      winnerInfo.textContent = `${currentPlayer.name}'s turn`;
      return
    }
  }

  if (this.textContent.length > 0) return
  origBoard[gridTiles.indexOf(this)] = player1.mark;
  render();
  this.style.color = player1.color;

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
  if(currentPlayer == player1) {
    winnerInfo.classList.add('orange');
    winnerInfo.classList.remove('yellow');
  }
  if (currentPlayer == player2) {
    winnerInfo.classList.remove('orange');
    winnerInfo.classList.add('yellow');
  }
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
    if(currentPlayer == player1) {
      winnerInfo.classList.add('orange');
      winnerInfo.classList.remove('yellow');
    }
    if (currentPlayer == player2) {
      winnerInfo.classList.remove('orange');
      winnerInfo.classList.add('yellow');
    }
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
    if (currentPlayer == player1) {
      winnerInfo.classList.add('orange');
      winnerInfo.classList.remove('yellow');
    }
    if (currentPlayer == player2) {
      winnerInfo.classList.add('yellow');
      winnerInfo.classList.remove('orange');
    }
    winnerInfo.textContent = `${currentPlayer.name}'s turn`;
    if (currentPlayer == player1) {
      p1Card.classList.add('current-player');
      p2Card.classList.remove('current-player');
    } else if (currentPlayer == player2) {
      p2Card.classList.add('current-player');
      p1Card.classList.remove('current-player');
    } else {
      p1Card.classList.remove('current-player');
      p2Card.classList.remove('current-player');
    }
    return
  }

  if (this.textContent.length > 0) return
  this.textContent = currentPlayer.mark;
  this.style.color = currentPlayer.color;
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
  if(currentPlayer == player1) {
    winnerInfo.classList.add('orange');
    winnerInfo.classList.remove('yellow');
  }
  if (currentPlayer == player2) {
    winnerInfo.classList.remove('orange');
    winnerInfo.classList.add('yellow');
  }
  winnerInfo.textContent = `${currentPlayer.name}'s turn`;
  if (currentPlayer == player1) {
    p1Card.classList.add('current-player');
    p2Card.classList.remove('current-player');
  } else if (currentPlayer == player2) {
    p2Card.classList.add('current-player');
    p1Card.classList.remove('current-player');
  } else {
    p1Card.classList.remove('current-player');
    p2Card.classList.remove('current-player');
  }

}


//END ROUND - ANNOUNCES WINNER, CHANGES SCORES
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