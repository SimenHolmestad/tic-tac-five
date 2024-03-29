import { BoardState, Player } from "./../../types";

export const lineSearch = (board: BoardState, yPos: number, xPos: number, xInterval: number, yInterval: number, player: Player) => {
  // Search in a line and returns coordinates of squares in a row matching the player
  // string. Note: The starting square is not included.
  const matchingSquares = [];
  let currentX = xPos;
  let currentY = yPos;
  for (let i = 0; i < 5; i++) {
    currentX += xInterval;
    currentY += yInterval;
    if (currentY < 0 || currentY > 20 || currentX < 0 || currentX > 20) {
      break; // Outside of board
    }
    if (board[currentY][currentX] === player) {
      matchingSquares.push([currentY, currentX]);
    } else {
      break;
    }
  }
  return matchingSquares;

}

const checkForWinner = (board: BoardState, yPos: number, xPos: number) => {
  // Checks if the move specified is a winning move. If this is the case, an array of
  // the moves in the winning line is returned. If there is no winner, null is
  // returned.

  const player = board[yPos][xPos] as Player;
  const startSquare = [yPos, xPos];

  const directionsToCheck = [ [1, 0], [0, 1], [1, 1], [1, -1] ];

  for (const direction of directionsToCheck) {
    // Search in both ways to find squares "in a row".
    const squaresInDirection = lineSearch(board, yPos, xPos, direction[1], direction[0], player);
    const squaresInOppositeDirection = lineSearch(board, yPos, xPos, -direction[1], -direction[0], player);
    const totalSquares = [startSquare, ...squaresInDirection, ...squaresInOppositeDirection];

    // Check if there are 5 or more squares in a row
    if (totalSquares.length >= 5) {
      // Sort squares first by y-coordinate and then x-coordinate
      totalSquares.sort((a, b) => {
        return a[0] - b[0];
      });
      totalSquares.sort((a, b) => {
        return a[1] - b[1];
      });

      // Make sure only 5 squares are returned
      const fiveInARow = totalSquares.slice(0, 5);
      return fiveInARow;
    }
  }
  return null;
}


export default checkForWinner;
