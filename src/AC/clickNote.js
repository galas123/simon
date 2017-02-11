import {LOCK, PLAY_NOTE, NEXT_TURN, WRONG_NOTE, NEXT_NOTE, UNLOCK} from '../constants'
import repeatRandomNotes from '../helpers/repeatRandomNotes';

export const clickNote = (note) => {
  return (dispatch, getState) => {
    const state = getState().game;
    dispatch(
      {
        type: LOCK
      }
    );
    const currentStep     = state.get('currentStep');
    const nextCorrectNote = Number(state.getIn(['randomNotes', currentStep]));
    const isWrongNote=nextCorrectNote !== Number(note);
    dispatch(
      {
        type   : PLAY_NOTE,
        payload: note,
        wrong  : isWrongNote
      }
    );
    if (!isWrongNote) {
      const step       = Number(state.get('currentStep')) + 1;
      const notesCount = Number(state.get('notesCount'));
      if (step === notesCount) {
        dispatch(
          {
            type: NEXT_TURN
          }
        );
        setTimeout(()=> {
            repeatRandomNotes(getState().game, dispatch)
          }
          , 1000);
      }
      else {
        dispatch(
          {
            type: NEXT_NOTE
          }
        );
        dispatch(
          {
            type: UNLOCK
          }
        );
      }
    }
    else {
      dispatch(
        {
          type   : WRONG_NOTE,
          payload: note
        }
      );
        setTimeout(()=> {
            repeatRandomNotes(getState().game, dispatch)
          }
          , 2000);
    }
  }
};

