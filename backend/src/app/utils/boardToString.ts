import { BoardState } from "./../../types";

function boardToString(board: BoardState) {
  let gameString = "";
  for (const xArray of board) {
    gameString += xArray.join(" ");
    gameString += "\n";
  }
  return gameString;
}

export default boardToString;
