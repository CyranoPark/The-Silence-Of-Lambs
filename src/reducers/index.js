import { combineReducers } from 'redux';
import {
  WRITE_USER_NAME,
  START_LOADING_GAME,
  COMPLETE_LOADING_GAME,
  START_GAME,
  RESTART_GAME,
  START_SAVE_SCORE,
  COMPLETE_SAVE_SCORE,
  COMPLETE_GAME,
  START_FETCH_SCORES,
  FETCH_SCORES,
  COMPLETE_FETCH_TOP_SCORES,
  COMPLETE_FETCH_SCORES,
  INIT_SCORES
} from '../constants/actionType';
import {
  BEFORE_START_GAME,
  PLAYING_GAME,
  CLEAR_GAME
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
  isLoadingGame: false,
  isSavingScore: false,
  isLoadingResult: false,
  clearTime: 0,
  deathCount: 0,
  score: 0,
  topRankList: [],
  rankList: []
}

const game = (state = gameInitialState, action) => {
  switch (action.type) {
    case START_LOADING_GAME:
      return Object.assign({...state}, {
        isLoadingGame: true
      });

    case COMPLETE_LOADING_GAME:
      return Object.assign({...state}, {
        isLoadingGame: false
      });

    case START_GAME:
      return Object.assign({...state}, {
        gameProgress: PLAYING_GAME
      });

    case RESTART_GAME:
      return Object.assign({...state}, {
        gameProgress: BEFORE_START_GAME,
      });

    case START_SAVE_SCORE:
      return Object.assign({...state}, {
        isSavingScore: true,
      });

    case COMPLETE_SAVE_SCORE:
      return Object.assign({...state}, {
        isSavingScore: false,
      });

    case COMPLETE_GAME:
      return Object.assign({...state}, {
        gameProgress: CLEAR_GAME,
        clearTime: action.clearTime,
        deathCount: action.deathCount,
        score: action.score
      });

    case START_FETCH_SCORES:
      return Object.assign({...state}, {
        isLoadingResult: true,
      });

    case COMPLETE_FETCH_TOP_SCORES:
      return Object.assign({...state}, {
        isLoadingResult: false,
        topRankList: action.scores
      });

    case FETCH_SCORES:
      return Object.assign({...state}, {
        rankList: action.scores
      });

    case COMPLETE_FETCH_SCORES:
      return Object.assign({...state}, {
        isLoadingResult: false,
      });

    case INIT_SCORES:
      return Object.assign({...state}, {
        topRankList: [],
        rankList: []
      });

    default:
      return state;
  }
};

export default combineReducers({
  user,
  game
});
