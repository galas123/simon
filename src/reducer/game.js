import {START_GAME, LOCK, PLAY_NOTE, SWITCH_OF_LIGHT, NEXT_TURN, WRONG_NOTE, NEXT_NOTE, UNLOCK} from '../constants'

import {Map, List}  from 'immutable'


const defaultState = Map({
  noteCount  : 1,
  currentStep: 0,
  randomNotes: List([]),
  answerTimer: null,
  started    : false,
  lock:false,
  lightingBtn:false
});

export default (game = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOCK:
      return game.set('lock', true);
    
    case UNLOCK:
      return game.set('lock', false);
    
    case START_GAME:
      let addNoteState = addNote(defaultState.set('started', true));
      return addNoteState;
    
    case PLAY_NOTE:
      return game.set('lightingBtn', payload);
    
    case NEXT_TURN:
      let newState=nextTurn(game);
      return newState.set('lock', false);

    case NEXT_NOTE:
      let step=game.get('currentStep')+1;
      return game.set('currentStep', step).set('lock', false) ;

    case  SWITCH_OF_LIGHT:
      return game.set('lightingBtn', false);
    
    case WRONG_NOTE:
      let errorState = game.set('currentStep', 0);
      return errorState;
  }
  return game;
}

function nextTurn(state) {
  const plusCountState = state.set('noteCount', state.get('noteCount') + 1).set('currentStep', 0);
  if (plusCountState.get('noteCount') === 6) {
    console.log('победа');
    return defaultState;
  }
  const addNoteState = addNote(plusCountState);
  return addNoteState
}


function addNote(state) {
  const min     = 1;
  const max     = 4;
  const newNote = Math.floor(Math.random() * (max - min + 1)) + min;
  const  plusNoteState= state.get('randomNotes').push(newNote);
  console.log ('рандомные ноты:', plusNoteState.toJS());
  return state.set('randomNotes', plusNoteState);
}