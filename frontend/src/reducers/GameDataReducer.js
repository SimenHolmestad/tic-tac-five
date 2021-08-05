import { UPDATE_GAME_DATA } from './../actions/types.js';

const gameDataReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GAME_DATA:
      return action.payload.newGameData;
    default:
      return state;
  }
};

export default gameDataReducer;
