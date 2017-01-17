import {CLICK_NOTE, START_GAME} from '../constants'

import {Map, List}  from 'immutable'


const defaultState =Map({
  noteCount     : 1,
  currentStep:0,
  randomNotes : List([]),
  answerTimer:null,
  started:false
});

export default (game = defaultState, action) => {
  const {type, payload} = action;

  switch (type) {
    case CLICK_NOTE:
      console.log('game',game, );
      playSoundtrack(payload);
      if (game.getIn(['randomNotes', game.get('currentStep')])==payload){
        console.log('нажата правильная нота');
        let newState = game.set('currentStep', game.get('currentStep')+1);
        debugger;
        if (newState.get('currentStep')===newState.get('noteCount')){
          let answerTime=newState.get('answerTimer');
          if (answerTime){
            clearTimeout(answerTime);
            let newState = newState.set('answerTimer', null);
          } //удалить id таймаута перед нажатием очередной ноты

          let newState=nextTurn(newState);
        } else{
          let newState = newState.set('answerTimer', setTimeout(errorAnswer, 5000));
        }
      }
      else {
        console.log('нажата неправильная нота');
        return errorAnswer(game);
      }

      return newState;
    
    case START_GAME:
      let newState=addNote(defaultState.set('started',true));
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
  newState=addNote(newState);
  repeatRandomNotes(newState);
  return newState;
}

function addNote(state){
  const min = 1;
  const max = 4;
  const newNote=Math.floor(Math.random() * (max - min + 1)) + min;

  const debugRandomNotes=state.get('randomNotes').push(newNote);
  console.log('newNote',newNote, 'debugRandomNotes',debugRandomNotes);
  return state.set('randomNotes', debugRandomNotes );
}