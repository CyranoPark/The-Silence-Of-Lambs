import { connect } from 'react-redux';
import App from '../component/App/App';
import { getScores, postScore, getPrevScores } from '../api'
import { deathCountToPenaltyTime } from '../utils';
import {
  changeUserNameInput,
  startGame,
  completeGame,
  startSaveScore,
  completeSaveScore,
  startFetchScores,
  fetchScores,
  completeFetchTopScores,
  completeFetchScores
} from '../action';

const mapStateToProps = state => {
  const { name } = state.user;
  const {
    gameProgress,
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
    gameProgress,
    isSavingScore,
    clearTime,
    deathCount,
    score,
    isLoadingResult,
    topRankList,
    rankList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    changeUserNameInput(userName) {
      dispatch(changeUserNameInput(userName));
    },
    handleGameStart() {
      dispatch(startGame());
    },
    saveScore(name, clearTime, deathCount) {
      const totalTime = clearTime + deathCountToPenaltyTime(deathCount);

      startSaveScore();

      postScore(name, new Date().toISOString(), clearTime, deathCount, totalTime)
        .then(() => {
          dispatch(completeSaveScore());
          dispatch(completeGame(clearTime, deathCount, totalTime));
        })
        .catch(() => {
          console.log('save failed');
        })
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
