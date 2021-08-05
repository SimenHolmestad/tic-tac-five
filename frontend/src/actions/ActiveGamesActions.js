import { UPDATE_ACTIVE_GAMES, ADD_ACTIVE_GAME } from './types.js';

export function updateActiveGames (currentActiveGames) {
  return {
    type: UPDATE_ACTIVE_GAMES,
    payload: {
      currentActiveGames: currentActiveGames
    }
  };
}

export function addToActiveGames (gameToAdd) {
  return {
    type: ADD_ACTIVE_GAME,
    payload: {
      gameToAdd: gameToAdd
    }
  };
}

export function fetchActiveGames() {
  return async function(dispatch) {
    const url = process.env.REACT_APP_API_URL + '/api/active_games/';
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(updateActiveGames(data));
    } catch (error) {
      console.log('Could not fetch game data from server', error);
    }
  };
};

export function createNewGame(name) {
  return async function(dispatch) {
    const url = process.env.REACT_APP_API_URL + '/api/games/';
    try {
      // Send message which asks api to create a new game
      const opts = {
        name: name
      };
      const response = await fetch(url, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(opts)
      });
      const data = await response.json();
      // If a game is returned, it is added to the list displayed in the menu
      if (data.error) {
        alert(data.error);
        return;
      }
      dispatch(addToActiveGames(data));
      return data

    } catch (error) {
      console.log('Could not create game', error);
    }
  };
};
