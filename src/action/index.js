import { WRITE_USER_NAME } from '../constants/actionType';

export const changeUserNameInput= userName => ({
  type: WRITE_USER_NAME,
  userName
});
