import { connect } from 'react-redux';
import App from '../component/App/App';
import { getScores, postScore, getPrevScores } from '../api';
import { deathCountToPenaltyTime } from '../utils';
import {
  changeUserNameInput,
  startLoadingGame,
  completeLoadingGame,
  startGame,
  restartGame,
  completeGame,
  startSaveScore,
  completeSaveScore,
  failSaveScore,
  startFetchScores,
  fetchScores,
  completeFetchTopScores,
  completeFetchScores,
  initializeScores
} from '../action';

const mapStateToProps = state => {
  const { name } = state.user;
  const {
    gameProgress,
    isLoadingGame,
    isSavingScore,
    clearTime,
    deathCount,
    score,
    isLoadingResult,
    topRankList,
    rankList
  } = state.game;

  return {
    userName: name,
    isLoadingGame,
    gameProgress,
    isSavingScore,
    clearTime,
    deathCount,
    score,
    isLoadingResult,
    topRankList,
    rankList
  };
};

const mapDispatchToProps = dispatch => ({
  changeUserNameInput(userName) {
    dispatch(changeUserNameInput(userName));
  },
  handleStartButtonClick() {
    dispatch(startLoadingGame());
  },
  completeStartLoading() {
    dispatch(completeLoadingGame());
  },
  handleGameStart() {
    dispatch(startGame());
  },
  handleGameRestart() {
    dispatch(restartGame());
  },
  saveScore(name, clearTime, deathCount) {
    const totalTime = clearTime + deathCountToPenaltyTime(deathCount);

    dispatch(startSaveScore());

    postScore(name, new Date().toISOString(), clearTime, deathCount, totalTime)
      .then(() => {
        dispatch(completeGame(clearTime, deathCount, totalTime));
        dispatch(completeSaveScore());
      })
      .catch(() => {
        dispatch(failSaveScore());
      });
  },
  fetchTopScores(callback) {
    dispatch(startFetchScores());
    getScores(3, 0)
      .then(data => {
        if (!data.length) {
          dispatch(completeFetchScores());
          callback();
          return;
        }
        dispatch(completeFetchTopScores(data));
        callback();
      });
  },
  fetchScores(limit, start, callback) {
    dispatch(startFetchScores());
    getScores(limit, start)
      .then(data => {
        if (!data.length) {
          dispatch(completeFetchScores());
          return;
        }
        dispatch(fetchScores(data));
        dispatch(completeFetchScores());
        callback();
      });
  },
  fetchPrevScores(limit, end, callback) {
    dispatch(startFetchScores());
    getPrevScores(limit, end)
      .then(data => {
        if (!data.length) {
          dispatch(completeFetchScores());
          return;
        }
        dispatch(fetchScores(data));
        dispatch(completeFetchScores());
        callback();
      });
  },
  initRankingList() {
    dispatch(initializeScores());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
