import {
  WRITE_USER_NAME,
  START_GAME,
  COMPLETE_GAME,
  START_SAVE_SCORE,
  COMPLETE_SAVE_SCORE,
  START_FETCH_SCORES,
  FETCH_SCORES,
  COMPLETE_FETCH_TOP_SCORES,
  COMPLETE_FETCH_SCORES
} from '../constants/actionType';

export const changeUserNameInput= userName => ({
  type: WRITE_USER_NAME,
  userName
});

export const startGame= () => ({
  type: START_GAME
});

export const startSaveScore = () => ({
  type: START_SAVE_SCORE
});

export const completeSaveScore = () => ({
  type: COMPLETE_SAVE_SCORE,
});

export const completeGame = (clearTime, deathCount, score) => ({
  type: COMPLETE_GAME,
  clearTime,
  deathCount,
  score
});

export const startFetchScores = () => ({
  type: START_FETCH_SCORES,
});

export const fetchScores = scores => ({
  type: FETCH_SCORES,
  scores
});

export const completeFetchScores = () => ({
  type: COMPLETE_FETCH_SCORES
});

export const completeFetchTopScores = scores => ({
  type: COMPLETE_FETCH_TOP_SCORES,
  scores
});

