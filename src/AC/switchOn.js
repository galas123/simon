import {SWITCH_ON} from '../constants';

export const switchOn = () => {
  return (dispatch) => {
    dispatch({
      type: SWITCH_ON
    });
  }
};