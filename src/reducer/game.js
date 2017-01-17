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
        console.log('нажата правильная нота',game.set('currentStep',0 ));
        const step=Number(game.get('currentStep'))+1;
        const countNotes=Number(game.get('noteCount'))
        let newState = game.set('currentStep',step );
        if (step === countNotes){
          let answerTime=newState.get('answerTimer');
          if (answerTime){
            clearTimeout(answerTime);
            newState = newState.set('answerTimer', null);
          } //удалить id таймаута перед нажатием очередной ноты

           newState=nextTurn(newState);
          console.log ('переход на след уровень', newState);
        } else{
          newState = newState.set('answerTimer', setTimeout(errorAnswer, 5000));
        }
        return newState
      }
      else {
        console.log('нажата неправильная нота');
        return errorAnswer(game);
      }
    
    case START_GAME:
      let addNoteState=addNote(defaultState.set('started',true));
      repeatRandomNotes(addNoteState);
      return addNoteState;

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
  state.get('randomNotes').forEach((item)=>setTimeout(
    ()=>{
      console.log('item',item);
      playSoundtrack(item)
    },3000));
}

function nextTurn(state) {
  const plusCountState = state.set('noteCount', state.get('noteCount') + 1).set('currentStep',0);
  if (plusCountState.get('noteCount') === 10) {
    console.log('победа');
    return defaultState;
  }
  const addNoteState=addNote(plusCountState);
  console.log ('лист нот', addNoteState.get('randomNotes'));
  repeatRandomNotes(addNoteState);
  return addNoteState;
}

function addNote(state){
  const min = 1;
  const max = 4;
  const newNote=Math.floor(Math.random() * (max - min + 1)) + min;

  const debugRandomNotes=state.get('randomNotes').push(newNote);
  console.log('newNote',newNote, 'debugRandomNotes',debugRandomNotes);
  return state.set('randomNotes', debugRandomNotes );
}