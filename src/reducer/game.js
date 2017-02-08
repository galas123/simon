import {
  START_GAME,
  LOCK,
  PLAY_NOTE,
  SWITCH_OFF_LIGHT,
  NEXT_TURN,
  WRONG_NOTE,
  NEXT_NOTE,
  UNLOCK,
  STRICT_GAME,
  SWITCH_ON,
  SWITCH_OFF
} from '../constants'

import {Map, List}  from 'immutable'


const defaultState = Map({
  switchOff  : true,
  notesCount  : '--',
  currentStep: 0,
  randomNotes: List([]),
  started    : false,
  lock       : false,
  lightingBtn: false,
  strict     : false
});

export default (game = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOCK:
      return game.set('lock', true);

    case UNLOCK:
      console.log('unlock from UNLOCK');
      return game.set('lock', false);

    case SWITCH_ON:
      return defaultState.set('switchOff', false).set('lock', false);

    case SWITCH_OFF:
      return defaultState.set('switchOff', true).set('lock', true);

    case START_GAME:
      const strict     = game.get('strict');
      let addNoteState = addNote(defaultState.set('started', true).set('strict', strict)).set('switchOff', false).set('notesCount',1);
      return addNoteState;

    case PLAY_NOTE:
      return game.set('lightingBtn', payload);

    case NEXT_TURN:
      let newState = nextTurn(game);
      return newState.set('lock', false);


    case NEXT_NOTE:
      let step = game.get('currentStep') + 1;
      return game.set('currentStep', step).set('lock', false);

    case  SWITCH_OFF_LIGHT:
      return game.set('lightingBtn', false);

    case WRONG_NOTE:
      let errorState;
      if (game.get('strict')) {
        errorState = addNote(defaultState.set('notesCount',1).set('lightingBtn', payload).set('started', true).set('strict', true).set('lock', true).set('switchOff', false));
          console.log('набор нот после ошибки:',errorState.get('randomNotes'));     
      }
      else {
        errorState = game.set('currentStep', 0);
      }
      return errorState;

    case STRICT_GAME:
      return game.set('strict', !game.get('strict'));
  }
  return game;
}

function nextTurn(state) {
  const plusCountState = state.set('notesCount', state.get('notesCount') + 1).set('currentStep', 0);
  if (plusCountState.get('notesCount') === 6) {
    return defaultState.set('notesCount', 'win').set('switchOff', false).set('lock', true);
  }
  const addNoteState = addNote(plusCountState);
  return addNoteState
}


function addNote(state) {
  const min           = 1;
  const max           = 4;
  const newNote       = Math.floor(Math.random() * (max - min + 1)) + min;
  const plusNoteState = state.get('randomNotes').push(newNote);
  console.log('рандомные ноты:', plusNoteState.toJS());
  return state.set('randomNotes', plusNoteState);
}