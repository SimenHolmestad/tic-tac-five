import React from 'react';
import './Board.css';

import { useSelector, useDispatch } from 'react-redux';
import { doMove } from './../actions/gameDataActions';

function BoardSquare(props) {
  const dispatch = useDispatch();
  const gameData = useSelector((state) => state.gameData);
  const gameId = useSelector((state) => state.gameInfo.gameId);
  const playType = useSelector((state) => state.gameInfo.playType);

  function squareClicked() {
    let player = '';
    if (playType === 'X_player') {
      player = 'X';
    } else if (playType === 'O_player'){
      player = 'O';
    } else if (playType === 'both_players'){
      player = gameData.nextToMove;
    } else {
      return;
    }

    dispatch(doMove(gameId, props.xPos, props.yPos, player));
  }

  let value = props.value;
  // Blink if this is a winning move
  if (props.blinking) {
    value = <div className="blink_me">{props.value}</div>;
  }

  return (
    <button className="square" onClick={ () => squareClicked() }>
      {value}
    </button>
  );
}

export default BoardSquare;
