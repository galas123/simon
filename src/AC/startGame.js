import {START_GAME} from '../constants';
import repeatRandomNotes from '../helpers/repeatRandomNotes';

export const startGame = () => {
  return (dispatch, getState) => {
    dispatch({
      type: START_GAME
    });
    setTimeout(()=>repeatRandomNotes(getState().game, dispatch), 500);
  }
};
