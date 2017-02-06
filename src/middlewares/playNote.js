import { PLAY_NOTE, SWITCH_OFF_LIGHT} from '../constants'

export default store => next => action => {
  const {type, payload, wrong} = action;
    if (type === PLAY_NOTE) {
      if (!wrong) {
        const url   = `https://s3.amazonaws.com/freecodecamp/simonSound${payload}.mp3`;
        const audio = new Audio(url);
        audio.play();
      }
      setTimeout(()=>next({type: SWITCH_OFF_LIGHT}), 500);
    }
    next(action);
}
