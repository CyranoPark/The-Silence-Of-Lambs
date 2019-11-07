import { connect } from 'react-redux';
import App from '../component/App/App';
import { getScores, postScore, checkValidUserName } from '../api'
import { changeUserNameInput, startGame, completeGame } from '../action';

const mapStateToProps = state => {
  const { name } = state.user;
  const { gameProgress } = state.game;
  return {
    userName: name,
    gameProgress
  };
}

const mapDispatchToProps = dispatch => {
  // postScore('hanjun', 'test', 123,24,124,123).then(() => {
  //   checkValidUserName('hanjun').then((data) => console.log(data))
  // })
  return {
    changeUserNameInput(userName) {
      dispatch(changeUserNameInput(userName));
    },
    handleGameStart() {
      dispatch(startGame());
    },
    finishGame(time, death) {
      dispatch(completeGame(time, death));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
