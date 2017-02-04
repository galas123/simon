import {SWITCH_ON_OFF} from '../constants';

export const switchOnOff = () => {
  return (dispatch) => {
    dispatch({
      type: SWITCH_ON_OFF
    });
  }
};