import {
	WRITE_USER_NAME,
	INIT_USER_NAME,
	START_LOADING_GAME,
	COMPLETE_LOADING_GAME,
	START_GAME,
	COMPLETE_GAME,
	RESTART_GAME,
	START_SAVE_SCORE,
	COMPLETE_SAVE_SCORE,
	FAIL_SAVE_SCORE,
	START_FETCH_SCORES,
	FETCH_SCORES,
	COMPLETE_FETCH_TOP_SCORES,
	COMPLETE_FETCH_SCORES,
	INIT_SCORES
} from '../constants/actionType';

export const changeUserNameInput = userName => ({
	type: WRITE_USER_NAME,
	userName
});

export const initUserName = userName => ({
	type: INIT_USER_NAME
});

export const startLoadingGame = () => ({
	type: START_LOADING_GAME
});

export const completeLoadingGame = () => ({
	type: COMPLETE_LOADING_GAME
});

export const startGame = () => ({
	type: START_GAME
});

export const restartGame = () => ({
	type: RESTART_GAME
});

export const startSaveScore = () => ({
	type: START_SAVE_SCORE
});

export const completeSaveScore = () => ({
	type: COMPLETE_SAVE_SCORE
});

export const failSaveScore = () => ({
	type: FAIL_SAVE_SCORE
});

export const completeGame = (clearTime, deathCount, score) => ({
	type: COMPLETE_GAME,
	clearTime,
	deathCount,
	score
});

export const startFetchScores = () => ({
	type: START_FETCH_SCORES
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

export const initializeScores = scores => ({
	type: INIT_SCORES,
	scores
});
