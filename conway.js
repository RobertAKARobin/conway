const Y_MAX = 10;
const Y_MIN = 1;
const X_MAX = 10;
const X_MIN = 1;
const IS_LIVE = 'O';
const IS_DEAD = '.';
const GEN_INTERVAL_MS = 100;
const GEN_MAX = 20;

function assert(value) {
  if (value === undefined || value === null) {
    throw false;
  }
  return value;
}

const Board = {
  drawNew(xMin, xMax, yMin, yMax) {
    const board = [];
    for (let y = yMin; y <= yMax; y++) {
      const row = [];
      for (let x = xMin; x <= xMax; x++) {
        const cell = IS_DEAD;
        row.push(cell);
      }
      board.push(row);
    }
    return board;
  },

  cellGet(board, x, y) {
    try {
      return assert(board[y - 1][x - 1]);
    } catch(e) {
      // console.warn(`Can't get (${x},${y}).`);
      return null;
    }
  },

  cellSet(board, x, y, isLive) {
    try {
      return (board[y - 1][x - 1] = isLive);
    } catch(e) {
      // console.warn(`Can't set (${x},${y}).`);
    }
  },

  cellEvalState(board, x, y) {
    const cell = Board.cellGet(board, x, y);
        
    let numberOfLiveNeighbors = 0;
    const neighborXMin = x - 1;
    const neighborXMax = x + 1;
    const neighborYMin = y - 1;
    const neighborYMax = y + 1;
    for (let neighborX = neighborXMin; neighborX <= neighborXMax; neighborX++) {
      for (let neighborY = neighborYMin; neighborY <= neighborYMax; neighborY++) {
        const neighbor = Board.cellGet(board, neighborX, neighborY);
        if (neighbor === IS_LIVE) {
          numberOfLiveNeighbors += 1;
        }
      }
    }

    if (cell === IS_LIVE) {
      numberOfLiveNeighbors -= 1;
    }

    if (cell === IS_DEAD && numberOfLiveNeighbors === 3) {
      return IS_LIVE;
    } else if (cell === IS_LIVE && numberOfLiveNeighbors <= 1) {
      return IS_DEAD;
    } else if (cell === IS_LIVE && numberOfLiveNeighbors <= 3) {
      return IS_LIVE;
    }
    return IS_DEAD;
  },

  render(board) {
    return board.map(row => row.join('')).join('\n');
  },

  step(oldBoard) {
    const board = Board.drawNew(X_MIN, X_MAX, Y_MIN, Y_MAX);
    for (let y = Y_MIN; y <= Y_MAX; y++) {
      for (let x = X_MIN; x <= X_MAX; x++) {
        const cellState = Board.cellEvalState(oldBoard, x, y);
        Board.cellSet(board, x, y, cellState);
      }
    }
   return board;
  },
}

function main() {
  let board = Board.drawNew(X_MIN, X_MAX, Y_MIN, Y_MAX);
  let gen = 0;
  let looper = undefined;
  Board.cellSet(board, 5, 5, IS_LIVE);
  Board.cellSet(board, 4, 6, IS_LIVE);
  Board.cellSet(board, 4, 7, IS_LIVE);
  Board.cellSet(board, 5, 7, IS_LIVE);
  Board.cellSet(board, 6, 7, IS_LIVE);
  print();

  looper = setInterval(loop, GEN_INTERVAL_MS);
  
  function loop() {
    gen += 1;
  
    if (gen >= GEN_MAX) {
      clearInterval(looper);
    }

    board = Board.step(board);
    print();
  }

  function print() {
    console.clear();
    console.log(`GENERATION ${gen}`);
    console.log(Board.render(board));
    console.log('');
  }
}

main();
