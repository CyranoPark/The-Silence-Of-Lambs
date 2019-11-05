import { WRITE_USER_NAME, START_GAME } from '../constants/actionType';

export const changeUserNameInput= userName => ({
  type: WRITE_USER_NAME,
  userName
});

export const startGame= () => ({
  type: START_GAME
});
