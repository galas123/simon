import {CLICK_NOTE} from '../constants'


const defaultState =Map({
  noteCount     : 1,
  currentStep:0,
  randomNotes : List([]),
  answerTimer:null
});

export default (game = defaultState, action) => {
  const {type, payload} = action;

  switch (type) {
    case CLICK_NOTE:
      playSoundtrack(payload.id);
      if (game.randomNotes[currentStep]===payload.id){
        let newState = game.set('currentStep', game[currentStep]+1);
        if (newState[currentStep]===newState[noteCount]-1){
          clearTimeout(newState[answerTimer]);
          let newState = newState.set('answerTimer', null);
          nextTurn(newState);
        } else{
          let newState = newState.set('answerTimer', setTimeout(errorAnswer, 5000));
        }
      }
      else {
        return errorAnswer(game);
      }

      return newState;
  }
  return game;
}

function playSoundtrack(id){
  const url='https://s3.amazonaws.com/freecodecamp/simonSound'+id+'.mp3';
  const audio = new Audio(url);
  audio.play();
}

function errorAnswer(state){
  repeatRandomNotes(state);
  let newState = state.set('answerTimer', setTimeout(errorAnswer, 5000));
  return newState;
}

function repeatRandomNotes(state){
  state[randomNotes].forEach((item)=>playSoundtrack(item));
}

function nextTurn(state){
  let newState = state.set('noteCount', state[noteCount]+1);
  if (newState[noteCount]===10) {
    console.log ('победа');
    return defaultState;
  }
  const min=1;
  const max=4;
  const newNote=Math.floor(Math.random() * (max - min + 1)) + min;
  let newState = state.set('randomNotes', newState[randomNotes].push(newNote));
  repeatRandomNotes(newState);
  
}