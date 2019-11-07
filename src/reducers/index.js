import { combineReducers } from 'redux';
import {
  WRITE_USER_NAME,
  START_GAME
} from '../constants/actionType';
import {
  BEFORE_START_GAME,
  PLAYING_GAME
} from '../constants/status';

const userInitialState = {
  name: ''
}

const user = (state = userInitialState, action) => {
  switch (action.type) {
    case WRITE_USER_NAME:
      return Object.assign({...state}, {
        name: action.userName,
      });

    default:
      return state;
  }
};

const gameInitialState = {
  gameProgress: BEFORE_START_GAME,
  time: '',
  score: 0
}

const game = (state = gameInitialState, action) => {
  switch (action.type) {
    case START_GAME:
      return Object.assign({...state}, {
        gameProgress: PLAYING_GAME,
      });

    default:
      return state;
  }
};

export default combineReducers({
  user,
  game
});
