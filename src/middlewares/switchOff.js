import {SWITCH} from '../constants'

export default store => next => action => {
  const {type} = action;
  const isSwitchedOff=store.getState().game.get('isSwitchedOff');
  if (!isSwitchedOff || type===SWITCH) {
    next(action);
  }
}
