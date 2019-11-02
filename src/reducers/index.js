import { combineReducers } from 'redux';
import { WRITE_USER_NAME } from '../constants/actionType';

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
}

export default combineReducers({
  user
});
