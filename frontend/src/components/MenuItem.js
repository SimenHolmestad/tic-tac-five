import React from 'react';
import { Link } from 'react-router-dom';

function MenuItem(props) {
  const urlBase = '/play/' + props.game._id;
  return (
    <div>
      <h1>Game: { props.game.name }</h1>
      <ul>
        <li><Link to={ urlBase + '/X_player'}>Play as X</Link></li>
        <li><Link to={ urlBase + '/O_player'}>Play as O</Link></li>
        <li><Link to={ urlBase + '/both_players'}>Play with both players</Link></li>
        <li><Link to={ urlBase + '/observe'}>Observe the game</Link></li>
      </ul>
      <hr/>
    </div>
  );
}

export default MenuItem;
