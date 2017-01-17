import {CLICK_NOTE} from '../constants'
export const clickNote = (id) => {

  return (dispatch, getState) => {
    const state  = getState().game;
    const started  = state.get('started');
    console.log(state,started);
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