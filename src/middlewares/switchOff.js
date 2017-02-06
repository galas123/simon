import {SWITCH_ON, SWITCH_OFF } from '../constants'

export default store => next => action => {
  const {type} = action;
  const switchOff=store.getState().game.get('switchOff');
  if (!switchOff || type===SWITCH_ON || type===SWITCH_OFF) {
    next(action);
  }
}
