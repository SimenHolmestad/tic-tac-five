import { UPDATE_GAME_ID, UPDATE_PLAY_TYPE } from './../actions/types.js';

const gameInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GAME_ID:
      state.gameId = action.payload.newGameId;
      return state;
    case UPDATE_PLAY_TYPE:
      state.playType = action.payload.newPlayType;
      return state;
    default:
      return state;
  }
};

export default gameInfoReducer;
