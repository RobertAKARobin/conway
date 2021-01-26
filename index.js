const Y_MAX = 20;
const Y_MIN = 1;
const X_MAX = 40;
const X_MIN = 1;
const IS_LIVE = '0';
const IS_DEAD = '.';
const GEN_MAX = 3;

function assert(value) {
  if (!value) {
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
      console.warn(`Can't get (${x},${y}).`);
      return null;
    }
  },

  cellSet(board, x, y, isLive) {
    try {
      board[y - 1][x - 1] = isLive;
    } catch(e) {
      console.warn(`Can't set (${x},${y}).`);
    }
  },

  render(board) {
    return board.map(row => row.join('')).join('\n');
  },

  step(board) {
    return board;
  },
}

let board = Board.drawNew(X_MIN, X_MAX, Y_MIN, Y_MAX);
Board.cellSet(board, 10, 10, IS_LIVE);

for (let gen = 1; gen <= GEN_MAX; gen++) {
  console.log(`GENERATION ${gen}`);
  board = Board.step(board);
  console.log(Board.render(board));
  console.log('');
}

/*
1. Any live cell with fewer than two live neighbors dies, as if by under population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

for each row as row {
  for each col as col {
    cell = boardGetAt(board, row, col);
    if (cell === DEAD) {
      continue
    }
    
    let numberOfLiveNeighbors = 0;
    const neighborColMin = col - 1;
    const neighborRowMin = row - 1;
    const neighborColMax = col + 1;
    const neighborRowMax = row + 1;
    for (let neighborRow = neighborRowMin; neighborRow < neighborRowMax; neighborRow++) {
      for (let neighborCol = neighborColMin; neighborCol < neighborColMax; neighborCol++) {
        const neighbor = boardGetAt(board, neighborRow, neighborCol);
        if (neighbor === LIVE) {
          numberOfLiveNeighbors += 1;
        }
      }
    }
  }
}
*/
