import {LOCK, PLAY_NOTE, NEXT_TURN, WRONG_NOTE, NEXT_NOTE, UNLOCK} from '../constants'
import repeatRandomNotes from '../helpers/repeatRandomNotes';

export const clickNote = (id) => {

  return (dispatch, getState) => {
    const state = getState().game;
    const lock  = state.get('lock');
    console.log('lock');
    dispatch(
      {
        type: LOCK
      }
    );
    const started = state.get('started');

    if (started) {
      if (state.getIn(['randomNotes', state.get('currentStep')]) == id) {
        console.log('kjddhfkjhdkjg', state.getIn(['randomNotes', state.get('currentStep')]), id);
        dispatch(
          {
            type   : PLAY_NOTE,
            payload: id
          }
        );
        const step       = Number(state.get('currentStep')) + 1;
        const countNotes = Number(state.get('noteCount'));
        if (step === countNotes) {
          dispatch(
            {
              type: NEXT_TURN
            }
          );

          setTimeout(()=>repeatRandomNotes(getState().game, dispatch), 1500);
        }
        else {
          dispatch(
            {
              type: NEXT_NOTE
            }
          );
        }
      }
      else {
        dispatch(
          {
            type   : PLAY_NOTE,
            payload: id,
            wrong:true
          }
        );
        dispatch(
          {
            type: WRONG_NOTE,
            payload: id,
          }
        );

       setTimeout( ()=>errorAnswer(getState().game),300);

      }
    }

    function errorAnswer(state) {
      const url   = 'http://s0.vocaroo.com/media/download_temp/Vocaroo_s0uIfEdiF7qP.mp3';
      const audio = new Audio(url);
      audio.play();
        setTimeout(()=> {
            repeatRandomNotes(state, dispatch).then(() => {
              dispatch(
                {
                  type: UNLOCK
                }
              );
            })
          }
          , 3000
        );



      return state;
    }

  }
}

