class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log("Game over!");
      this._board.print();
    } else if (!this._board.hasSafeTiles) {
      console.log("You won!");
      this._board.print();
    } else {
      console.log("Current board: ");
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if(this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped.');
      return;
    } else if(this._bombBoard[rowIndex][columnIndex] == 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  };

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;

    let numberOfBombs = 0;

    neighborOffsets.forEach( offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  };

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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

}

const g = new Game(3, 3, 3);
g.playMove(0,0);
