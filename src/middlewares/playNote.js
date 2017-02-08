import {PLAY_NOTE, SWITCH_OFF_LIGHT, UNLOCK} from '../constants'
import repeatRandomNotes from '../helpers/repeatRandomNotes';

export default store => next => action => {
  const {type, payload, wrong} = action;
  if (type === PLAY_NOTE) {
    const errorVoice = 'http://s0.vocaroo.com/media/download_temp/Vocaroo_s0uIfEdiF7qP.mp3';
    const noteVoice  = `https://s3.amazonaws.com/freecodecamp/simonSound${payload}.mp3`;
    const url        = wrong ? errorVoice : noteVoice;
    const audio = new Audio(url);
    audio.play();
    setTimeout(()=>next({type: SWITCH_OFF_LIGHT}), 500);
  }
  next(action);
}
