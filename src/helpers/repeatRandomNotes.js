import {PLAY_NOTE} from '../constants'

export default (state, dispatch) => {
console.log('repeatRandomNotes');
  return new Promise((resolveMelody) => {
    let i = 0;
    play();
  
    function play() {
      const promise = new Promise((resolve, reject) => {
        if (i === state.get('randomNotes').size) {
          reject('finish');

          resolveMelody();
         
        }
        else {
          const note = state.getIn(['randomNotes', i]);
          console.log('repeatNotes, note=', note);
          setTimeout(() => resolve(note), 500);
        }
      });
      
      promise
        .then(
          note => {
            dispatch(
              {
                type   : PLAY_NOTE,
                payload: note
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
  });
}