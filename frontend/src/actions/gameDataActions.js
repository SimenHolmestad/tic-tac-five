import { UPDATE_GAME_DATA } from './types.js';

export function updateGameData (newGameData) {
  return {
    type: UPDATE_GAME_DATA,
    payload: {
      newGameData: newGameData
    }
  };
}

export function createUrlForGameAndPlayType(gameId, playType) {
  let newPlayType = playType
  if (playType === 'X_player') {
    newPlayType = 'O_player'
  } else if (playType === 'O_player') {
    newPlayType = 'X_player'
  }

  return '/play/' + gameId + '/' + newPlayType
}

export function fetchGameData(gameId, playType, history) {
  return async function(dispatch) {
    const url = process.env.REACT_APP_API_URL + '/api/games/' + gameId;
    try {
      const response = await fetch(url);
      const gameData = await response.json();
      dispatch(updateGameData(gameData));
      console.log(playType);
      if (playType === 'observer' && gameData.nextGame) {
        history.push(createUrlForGameAndPlayType(gameData.nextGame, playType))
      }
    } catch (error) {
      console.log('Could not fetch game data from server', error);
    }
  };
};

export function createRematch(gameId, history, playType) {
  return async function() {
    const url = process.env.REACT_APP_API_URL + '/api/games/' + gameId + '/rematch';
    try {
      const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({})
      });
      const gameData = await response.json();
      history.push(createUrlForGameAndPlayType(gameData._id, playType))
    } catch (error) {
      console.log('Could not fetch game data from server', error);
    }
  };
};

export function doMove(gameId, xPos, yPos, player) {
  return async function(dispatch) {
    const url = process.env.REACT_APP_API_URL + '/api/games/' + gameId + '/move';
    try {
      const opts = {
        xPos: xPos,
        yPos: yPos,
        player: player
      };
      const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(opts)
      });
      const data = await response.json();
      if (! data.error) {
        dispatch(updateGameData(data));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log('Could not fetch game data from server', error);
    }
  };
};
