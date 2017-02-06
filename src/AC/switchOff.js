import {SWITCH_OFF} from '../constants';

export const switchOff = () => {
  return (dispatch) => {
    dispatch({
      type: SWITCH_OFF
    });
  }
};