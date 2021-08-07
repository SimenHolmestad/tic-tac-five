import React from 'react';
import { useHistory } from "react-router-dom";

import { createRematch, createUrlForGameAndPlayType } from './../actions/gameDataActions';
import { useSelector, useDispatch } from 'react-redux';

function RematchButtons() {
  const dispatch = useDispatch();
  const history = useHistory();

  const winner = useSelector((state) => state.gameData.winner);
  const rematchGame = useSelector((state) => state.gameData.nextGame);
  const gameId = useSelector((state) => state.gameInfo.gameId);
  const playType = useSelector((state) => state.gameInfo.playType);

  if (rematchGame) {
    return <button onClick={() => history.push(createUrlForGameAndPlayType(rematchGame, playType))}>Go to rematch game</button>
  }

  if (winner && !rematchGame) {
    return <button onClick={() => dispatch(createRematch(gameId, history, playType))}>Create rematch</button>
  }

  return null;
}

export default RematchButtons;
