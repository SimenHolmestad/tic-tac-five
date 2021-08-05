import { UPDATE_GAME_ID, UPDATE_PLAY_TYPE } from './types.js';

export function updateGameId (newGameId) {
  return {
    type: UPDATE_GAME_ID,
    payload: {
      newGameId: newGameId
    }
  };
}

export function updatePlayType (newPlayType) {
  return {
    type: UPDATE_PLAY_TYPE,
    payload: {
      newPlayType: newPlayType
    }
  };
}
