import {PLAY_NOTE,UNLOCK} from '../constants'

export default (state, dispatch) => {
    let i = 0;
    playNextNote();
  
    function playNextNote() {
      const resolveNote = new Promise((resolve, reject) => {
        if (i === state.get('randomNotes').size) {
          dispatch(
            {
              type: UNLOCK
            }
          );
          reject('finish');
        }
        else {
          const note = state.getIn(['randomNotes', i]);
          setTimeout(() => resolve(note), 500);
        }
      });

      resolveNote
        .then(
          note => {
            dispatch(
              {
                type   : PLAY_NOTE,
                payload: note,
                wrong:false
              }
            );
            i++;
            playNextNote();
          },
          error => console.log('error =>', error)
        )
        .catch(
          error=>console.log('error =>', error)
        );
    }
}