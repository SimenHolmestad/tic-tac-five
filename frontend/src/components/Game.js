import React, { useEffect } from 'react';
import Board from './Board';
import NewGame from './NewGame';
import RematchButtons from './RematchButtons';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { updateGameId, updatePlayType } from './../actions/GameIdActions';

function Game(props) {
  const dispatch = useDispatch();

  // Set the game id to the id in the url
  useEffect(() => {
    dispatch(updateGameId(props.match.params.gameId));

    let playType = props.match.params.playType;
    if (playType !== 'X_player' && playType !== 'O_player' && playType !== 'both_players') {
      playType = 'observer';
    }
    dispatch(updatePlayType(playType));
  }, [dispatch, props.match.params]);

  // Set infoText to show to player
  const winner = useSelector((state) => state.gameData.winner);
  const nextToMove = useSelector((state) => state.gameData.nextToMove);

  let infoText;

  if (winner) {
    infoText = <h2>Winner: { winner }</h2>;
  } else if  (nextToMove) {
    infoText = <h2>Next To Move: { nextToMove }</h2>;
  }

  // Create string containing info about the playType
  const playType = useSelector((state) => state.gameInfo.playType);
  let playTypeString = '';
  if (playType) {
    playTypeString = playType.replace('_', ' ');
  }

  const urlBase = '/play/' + props.match.params.gameId;

  return (
    <div>
      <h2><Link to={''}>Back to menu</Link></h2>
      <Board/>
      { infoText }
      <RematchButtons/>
      { winner ? <NewGame/> : null }
      { 'In game as: ' + playTypeString }
      <ul>
        <li><Link to={ urlBase + '/X_player'}>Change to playing as X</Link></li>
        <li><Link to={ urlBase + '/O_player'}>Change to playing as O</Link></li>
        <li><Link to={ urlBase + '/both_players'}>Change to playing as both players</Link></li>
        <li><Link to={ urlBase + '/observe'}>Change to observing the game</Link></li>
      </ul>
    </div>
  );
}

export default Game;
