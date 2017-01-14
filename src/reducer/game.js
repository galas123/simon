import {CLICK_NOTE, START_GAME} from '../constants'

import {Map, List}  from 'immutable'


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
      if (game.randomNotes[game.get('currentStep')]===payload.id){
        let newState = game.set('currentStep', game.get('currentStep')+1);
        if (newState[newState.get('currentStep')]===newState.get('noteCount')-1){
          clearTimeout(newState.get('answerTimer'));
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
    
    case START_GAME:
      let newState=addNote(defaultState);
      repeatRandomNotes(newState);
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
  state.get('randomNotes').forEach((item)=>playSoundtrack(item));
}

function nextTurn(state) {
  let newState = state.set('noteCount', state.get('noteCount') + 1);
  if (newState.get('noteCount') === 10) {
    console.log('победа');
    return defaultState;
  }
  addNote(state);
  repeatRandomNotes(newState);
}

function addNote(state){
  const min = 1;
  const max = 4;
  const newNote=Math.floor(Math.random() * (max - min + 1)) + min;
  return state.set('randomNotes', state.get('randomNotes').push(newNote));
}