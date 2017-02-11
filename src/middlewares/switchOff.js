import {SWITCH_ON, SWITCH_OFF } from '../constants'

export default store => next => action => {
  const {type} = action;
  const isSwitchedOff=store.getState().game.get('isSwitchedOff');
  if (!isSwitchedOff || type===SWITCH_ON || type===SWITCH_OFF) {
    next(action);
  }
}
