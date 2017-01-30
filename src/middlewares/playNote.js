import { PLAY_NOTE, SWITCH_OF_LIGHT } from '../constants'

export default store => next => action => {
  const {type, payload} = action
  if (type === PLAY_NOTE) {
    const url   = `https://s3.amazonaws.com/freecodecamp/simonSound${payload}.mp3`;
    const audio = new Audio(url);
    audio.play();
    setTimeout(()=>next({type: SWITCH_OF_LIGHT}), 500);
  }
  next(action);
}
