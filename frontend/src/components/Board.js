import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import BoardSquare from './BoardSquare';
import './Board.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGameData } from './../actions/gameDataActions';

function Board() {
  const dispatch = useDispatch();
  const gameId = useSelector((state) => state.gameInfo.gameId);
  const history = useHistory();
  const playType = useSelector((state) => state.gameInfo.playType);

  // Update game data every second
  useEffect(() => {
    if (gameId === '') {
      return undefined;
    }
    dispatch(fetchGameData(gameId));
    const interval = setInterval(() => dispatch(fetchGameData(gameId, playType, history)), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch, gameId, history, playType]);

  // Get gameData and add loading text if there is no gameData
  const gameData = useSelector((state) => state.gameData);
  if (! gameData.boardState) {
    return <h2>Loading...</h2>;
  }

  const winningLineString = JSON.stringify(gameData.winningLine);

  // Create square components
  const squareRows = gameData.boardState.map((squareRow, rowIndex) => {
    return squareRow.map((squareTile, columnIndex) => {
      let value = squareTile;
      // Change "-" to " " (as "-" comes from database)
      if (value === "-") {
        value =  " ";
      }
      // Check if square is in the winning line
      const shouldBlink = winningLineString.indexOf(JSON.stringify([rowIndex, columnIndex])) !== -1;
      return <BoardSquare
               value={ value }
               key={ columnIndex }
               xPos={ columnIndex }
               yPos={ rowIndex }
               blinking={ shouldBlink }/>;
    });
  });

  // Render the board row by row
  return squareRows.map((squareRow, rowIndex) => {
    return <div className="board-row" key={ rowIndex }>
             { squareRow }
           </div>;
  });
}

export default Board;
