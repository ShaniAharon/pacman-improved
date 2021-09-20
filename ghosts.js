const GHOST = '&#128520;';
const ANGEL = '&#128519;';
let gGhostsInterval;
let gId = 0;
let gGhosts = [];

function createGhost() {
  let ghost = {
    symbol: GHOST,
    location: {
      i: 2,
      j: 2,
    },
    id: gId++,
    currCellContent: FOOD,
    isEatable: false,
    nextLocation: {
      i: 0,
      j: 0,
    },
    move() {
      let randomiMove = getRandomInt(-1, 1);
      let randomjMove = getRandomInt(-1, 1);
      this.nextLocation.i = this.location.i + randomiMove;
      this.nextLocation.j = this.location.j + randomjMove;
      // if ghost eat pacman - game over
      if (checkEngage(this.nextLocation, PACMAN)) {
        if (!gPacman.isSuper) {
          console.log('you Lost');
          gGameState.isGameOver = true;
          clearInterval(gGhostsInterval);
          return;
        }
      }
      // if next move is not a ghost or a wall or same location can move
      if (
        gBoard[this.nextLocation.i][this.nextLocation.j] !== WALL &&
        gBoard[this.nextLocation.i][this.nextLocation.j] !== GHOST &&
        gBoard[this.nextLocation.i][this.nextLocation.j] !== ANGEL &&
        this.nextLocation.i !== 0 &&
        this.nextLocation.j !== 0
      ) {
        //dont eat super pacman
        if (
          gPacman.isSuper &&
          gBoard[this.nextLocation.i][this.nextLocation.j] === PACMAN
        ) {
          return;
        }
        // ToDo: save the element that was under the ghost,
        // and return it when she moves
        // restore what we steped on
        gBoard[this.location.i][this.location.j] = this.currCellContent;
        // render the dom
        renderCell(gBoard, this.location, this.currCellContent);
        // save the state of the cell we are going to
        this.currCellContent = gBoard[this.nextLocation.i][this.nextLocation.j];
        // move the ghost
        renderCell(gBoard, this.nextLocation, this.symbol);
        // update the new location
        this.location.i = this.nextLocation.i;
        this.location.j = this.nextLocation.j;
      }
    },
  };
  return ghost;
}

function createGhosts(number) {
  //create number ghosts
  for (let i = 0; i < number; i++) {
    gGhosts.push(createGhost());
    renderCell(gBoard, gGhosts[i].location, gGhosts[i].symbol);
  }
  // move all the ghosts every sec
  gGhostsInterval = setInterval(function moveGhosts() {
    gGhosts.forEach((ghost) => {
      ghost.move();
    });
  }, 1000);
}

// check engage between 2 elements
function checkEngage(nextLocation, element) {
  if (gBoard[nextLocation.i][nextLocation.j] === element) {
    return true;
  }
  return false;
}

// find ghost id from the location
// - when super pacman engage with angel
// check with which ghost he add collision with from the location
// of the engage
function findGhostId(pacmanNextLocation) {
  let id = -1;
  gGhosts.forEach((ghost) => {
    if (
      ghost.location.i === pacmanNextLocation.i &&
      ghost.location.j === pacmanNextLocation.j
    ) {
      id = ghost.id;
      return;
    }
  });
  return id;
}
