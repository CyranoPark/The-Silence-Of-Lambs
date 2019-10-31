import { connect } from 'react-redux';
import App from '../component/App/App';
import { getScores, postScore, checkValidUserName } from '../api'

const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  // postScore('hanjun', 'test', 123,24,124,123).then(() => {
  //   checkValidUserName('hanjun').then((data) => console.log(data))
  // })
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
