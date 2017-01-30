import {LOCK, PLAY_NOTE, NEXT_TURN, WRONG_NOTE, NEXT_NOTE, UNLOCK} from '../constants'
import repeatRandomNotes from '../helpers/repeatRandomNotes';

export const clickNote = (id) => {

  return (dispatch, getState) => {
    const state = getState().game;
    const lock  = state.get('lock');
    dispatch(
      {
        type: LOCK
      }
    );
    const started = state.get('started');
    
    if (started) {
      dispatch(
        {
          type   : PLAY_NOTE,
          payload: id
        }
      );

      if (state.getIn(['randomNotes', state.get('currentStep')]) == id) {
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
            type: WRONG_NOTE,
          }
        );

        errorAnswer(getState().game);

      }
    }

    function errorAnswer(state) {
      const url   = 'https://downloader.disk.yandex.ru/disk/15f8ad73c05ac820fd46757f6bf3e8cff6d84a5e010a27e5bbe28756c751060b/58808b87/1Xy9V5kP-ew_sqPqeLNGLNzFHwUWsrtVdgPCPHtcwIuuxdwaRjhk1vUaW20DCPt8DTKb_DPozPokBSoXm8TZOw%3D%3D?uid=0&filename=Zvuk-Oshibki_kompyutera_%28by_JoKeR%29.mp3&disposition=attachment&hash=%2B6W2vNgvUFtDstq2UrT5t0mzokRn2MULSvhtJw1Lf6k%3D&limit=0&content_type=audio%2Fmpeg&fsize=243945&hid=cb8df1c3cb7f8ceee9d107e72a22cbbb&media_type=audio&tknv=v2';
      const audio = new Audio(url);
      audio.play();
      setTimeout(()=>repeatRandomNotes(state, dispatch),3000);


      const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(note), 500);
      });

      promise
        .then(
          note => {
            dispatch(
              {
                type   : UNLOCK,
              }
            );
          }

      return state;
    }

  }
};

