import {STRICT_GAME} from '../constants';

export const strictMode = () => {
  return (dispatch) => {
    dispatch({
      type: STRICT_GAME
    });
  }
};