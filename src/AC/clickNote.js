import {CLICK_NOTE, LOCK} from '../constants'
export const clickNote = (id) => {

  return (dispatch, getState) => {
    const state  = getState().game;
    const lock  = state.get('lock');
      dispatch(
        {
          type   : LOCK,
        }
      )
    const started  = state.get('started');
    if (started) {
      dispatch(
        {
          type   : CLICK_NOTE,
          payload: id
        }
      )
    }
  }
}