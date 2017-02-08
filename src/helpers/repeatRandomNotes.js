import {PLAY_NOTE,UNLOCK} from '../constants'

export default (state, dispatch) => {
    let i = 0;
    play();
  
    function play() {
      const promise = new Promise((resolve, reject) => {
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
      
      promise
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
            play();
          },
          error => console.log('error =>', error)
        )
        .catch(
          error=>console.log('error =>', error)
        );
    }
}