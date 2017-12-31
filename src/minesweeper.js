class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._playerBoard = generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = generateBombBoard(numberOfRows, numberOfColumns);
  }

  get playerBoard() {
    return this._playerBoard;
  }

}

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++){
    // Create new array for each row
    let row = [];
    for (let j = 0; j < numberOfColumns; j++){
      // Create new column within each row array - set to blank space
      row.push(' ');
    };
    // Add rows to board
    board.push(row);
  };
  return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];
  for (let i = 0; i < numberOfRows; i++){
    // Create new array for each row
    let row = [];
    for (let j = 0; j < numberOfColumns; j++){
      // Create new column within each row array - set to empty
      row.push(null);
    };
    // Add rows to board
    board.push(row);
  };
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    // This while loop can place bombs on top of other bombs.
    // I will fix this later with the control flow lesson.
    // Get random row for bomb
    let randomRowIndex = Math.floor(Math.random() *  numberOfRows);
    // Get random column for bomb
    let randomColumnIndex = Math.floor(Math.random() *  numberOfColumns);
    // Set random row/column index in board array to bomb
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        // Increment numberOfBombsPlaced
        numberOfBombsPlaced++;
      }
  };
  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;

  let numberOfBombs = 0;

  neighborOffsets.forEach( offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if(playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;
  } else if(bombBoard[rowIndex][columnIndex] == 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');

printBoard(playerBoard);

console.log('Bomb Board: ');

printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 0);

console.log('Updated Player Board: ');

printBoard(playerBoard);
