const PACMAN = '&#128526;';

let gPacman = {
  symbol: PACMAN,
  location: {
    i: 3,
    j: 4,
  },
  isSuper: false,
};

let nextLocation = {
  i: 0,
  j: 0,
};

function renderCell(board, coords, element) {
  board[coords.i][coords.j] = element;
  printBoard(gBoard, '.gameBoard');
}

document.addEventListener('keydown', movePacman);
function movePacman(e) {
  if (!gGameState.isGameOver && !gGameState.isWon) {
    nextLocation.i = gPacman.location.i;
    nextLocation.j = gPacman.location.j;

    switch (e.code) {
      case 'ArrowUp':
        nextLocation.i--;
        break;
      case 'ArrowDown':
        nextLocation.i++;
        break;
      case 'ArrowRight':
        nextLocation.j++;
        break;
      case 'ArrowLeft':
        nextLocation.j--;
        break;
      default:
        console.log('not a move!');
        break;
    }
    //check if lost
    if (checkEngage(nextLocation, GHOST)) {
      console.log('you Lost, Pacman engage ghost');
      gGameState.isGameOver = true;
      clearInterval(gGhostsInterval);
      return;
    }
    //if super and eat ghost
    if (checkEngage(nextLocation, ANGEL)) {
      console.log('you Eat Angel ghost');
      let ghostId = findGhostId(nextLocation);
      // if the ghost is on a food , count the food as eaten
      // console.log(gGhosts[ghostId].currCellContent);
      //ToDo: reduce too much food fix it ,
      // when ANGEL eat by super pacman he transfer what he stepd on to the base location fix it
      if (gGhosts[ghostId].currCellContent === FOOD) {
        foodCounter--;
        // if (gBoard[3][3] !== ANGEL && gBoard[3][3] !== PACMAN) {
        //   gGhosts[ghostId].currCellContent = gBoard[3][3];
        // }
        // console.log(gBoard[nextLocation.i][nextLocation.j]);
      }
      gGhosts[ghostId].location.i = 3;
      gGhosts[ghostId].location.j = 3;
      renderCell(gBoard, nextLocation, EMPTY);
      renderCell(gBoard, gGhosts[ghostId].location, ANGEL);
      return;
    }

    //check if food or star and no wall
    if (gBoard[nextLocation.i][nextLocation.j] !== WALL) {
      // if eat food
      if (gBoard[nextLocation.i][nextLocation.j] === FOOD) {
        foodCounter--;
        //check if won
        if (foodCounter < 1) {
          gGameState.isWon = true;
          clearInterval(gGhostsInterval);
          console.log('you win');
          return;
        }
        console.log(foodCounter);
      }
      //if eat star
      if (gBoard[nextLocation.i][nextLocation.j] === STAR) {
        console.log('star');
        gPacman.isSuper = true;
        changeGhostState(ANGEL);
        setTimeout(() => {
          gPacman.isSuper = false;
          changeGhostState(GHOST);
        }, 5000);
      }
      // move pacman
      renderCell(gBoard, gPacman.location, EMPTY);
      gPacman.location.i = nextLocation.i;
      gPacman.location.j = nextLocation.j;
      renderCell(gBoard, gPacman.location, gPacman.symbol);
    }
  }
}

function changeGhostState(newSymbol) {
  gGhosts.forEach((ghost) => {
    ghost.symbol = newSymbol;
    renderCell(gBoard, ghost.location, newSymbol);
  });
}
