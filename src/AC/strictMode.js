import {STRICT_GAME} from '../constants';
import repeatRandomNotes from '../helpers/repeatRandomNotes';

export const strictMode = () => {
  return (dispatch) => {
    dispatch({
      type: STRICT_GAME
    });
  }
};