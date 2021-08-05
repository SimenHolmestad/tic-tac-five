/* Returns how a board of size width*height looked like at the
   given turn with the given history. */
export function getBoardAtTurn(history, turn, height, width) {
  // Create a new, empty board of size width * height
  let board = Array(height).fill(0).map(_ => Array(width).fill("-"));

  // Add every element of history to board one by one
  for (let i = 0; i < turn; i++) {
    const historyElement = history[i]
    const ypos = historyElement[0]
    const xpos = historyElement[1]
    const player = historyElement[2]
    board[ypos][xpos] = player
  }
  return board;
}

/* Returns sliced version of a board with center in the specified
   center. The sliced version is of the form width*height. If the sliced
   version contains squares outside of the board, those squares are
   empty. Thus, the board returned will always be of size width*height.
   The variables width and height should always be odd numbers. */
export function sliceBoard(board, centerY, centerX, height, width) {
  // Create a new, empty board of size width * height
  let newBoard = Array(height).fill(0).map(_ => Array(width).fill("-"));

  // Loop through every element of the new board
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // Find the relative positions in the board returned
      const xAtBoard = centerX - Math.trunc(width / 2) + j;
      const yAtBoard = centerY - Math.trunc(height / 2) + i;

      // Check if position is inside the given board. If so, add it.
      if (yAtBoard >= 0 && yAtBoard < board.length &&
          xAtBoard >= 0 && xAtBoard < board[0].length) {
        newBoard[i][j] = board[yAtBoard][xAtBoard]
      }
    }
  }
  return newBoard;
}
