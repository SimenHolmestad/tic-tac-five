import { combineReducers } from 'redux';
import gameDataReducer from './GameDataReducer';
import GameInfoReducer from './GameInfoReducer';
import activeGamesReducer from './ActiveGamesReducer';

// Combines all reducers and export them
export default combineReducers({
  gameData: gameDataReducer,
  gameInfo: GameInfoReducer,
  activeGames: activeGamesReducer
});
