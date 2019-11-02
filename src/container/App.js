import { connect } from 'react-redux';
import App from '../component/App/App';
import { getScores, postScore, checkValidUserName } from '../api'
import { changeUserNameInput } from '../action';

const mapStateToProps = state => {
  const { name } = state.user;
  return {
    userName: name
  };
}

const mapDispatchToProps = dispatch => {
  // postScore('hanjun', 'test', 123,24,124,123).then(() => {
  //   checkValidUserName('hanjun').then((data) => console.log(data))
  // })
  return {
    onUserNameInputChange(userName) {
      dispatch(changeUserNameInput(userName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
