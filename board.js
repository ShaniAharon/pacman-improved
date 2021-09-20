let gBoard;
let gGameState = {
  isGameOver: false,
  isWon: false,
};

const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const STAR = '&#9734;';
let foodCounter = 110;

function init() {
  gBoard = createMat(12, 14);
  printBoard(gBoard, '.gameBoard');
  // ToDo: make create function for the pac, and ghost
  renderCell(gBoard, gPacman.location, gPacman.symbol);
  createGhosts(3);
}

function createMat(sizeRows, sizeCols) {
  let board = [];
  for (let i = 0; i < sizeRows; i++) {
    board[i] = [];
    for (let j = 0; j < sizeCols; j++) {
      if (
        i === 0 ||
        i === sizeRows - 1 ||
        j === 0 ||
        j === sizeCols - 1 ||
        (i >= 5 && i <= 9 && j === 3)
      ) {
        board[i][j] = WALL;
      } else if (
        (i === 10 && j === 12) ||
        (i === 10 && j === 1) ||
        (i === 1 && j === 12) ||
        (i === 1 && j === 1)
      ) {
        board[i][j] = STAR;
      } else {
        board[i][j] = FOOD;
      }
    }
  }
  console.table(board);
  return board;
}

function printBoard(mat, selector) {
  let strHTML = '';
  for (let i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (let j = 0; j < mat[0].length; j++) {
      strHTML += `<td id='cell${i}-${j}'>` + mat[i][j] + '</td>';
    }
    strHTML += '</tr>';
  }
  const elBoard = document.querySelector(selector);
  elBoard.innerHTML = strHTML;
}
