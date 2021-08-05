import { UPDATE_ACTIVE_GAMES, ADD_ACTIVE_GAME } from './../actions/types.js';

const activeGamesReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_GAMES:
      return action.payload.currentActiveGames;
    case ADD_ACTIVE_GAME:
      return [...state, action.payload.gameToAdd];
    default:
      return state;
  }
};

export default activeGamesReducer;
