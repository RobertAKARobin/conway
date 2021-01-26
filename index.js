const ROWS = 3;
const COLS = 3;
const LIVE = '0';
const DEAD = '.';
const NUM_GENERATIONS = 5;
const STARTING_LIVE_CELLS = [
  '2,2',
];

let state = boardDraw(ROWS, COLS, STARTING_LIVE_CELLS);

for (let generation = 1; generation <= NUM_GENERATIONS; generation++) {
  console.log(`GENERATION ${generation}`);
  state = generationNew(state);
  boardRender(state);
  console.log('');
}

function boardDraw(rows, cols, liveCoords = []) {
  const board = [];
  for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
    const row = [];
    for (let colIndex = 1; colIndex <= cols; colIndex++) {
      const coord = `${colIndex},${rowIndex}`;
      if (liveCoords.includes(coord)) {
        row.push(LIVE);
      } else {
        row.push(DEAD);
      }
    }
    board.push(row);
  }
  return board;
}

function boardGetAt(board, row, col) {
  
}

function boardRender(board) {
  for (const row of board) {
    console.log(row.join(''));
  }
}

function generationNew(board) {
  const newState = [];
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
  return newstate;
}
