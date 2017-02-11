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
  isSwitchedOff  : true,
  notesCount  : '--',
  currentStep: 0,
  randomNotes: List([]),
  started    : false,
  isLocked       : false,
  highlightingButtonId: false,
  strict     : false
});

export default (game = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case LOCK:
      return game.set('isLocked', true);

    case UNLOCK:
      return game.set('isLocked', false);

    case SWITCH_ON:
      return defaultState.set('isSwitchedOff', false).set('isLocked', false);

    case SWITCH_OFF:
      return defaultState.set('isSwitchedOff', true).set('isLocked', true);

    case START_GAME:
      const strict     = game.get('strict');
      let addNoteState = addNote(defaultState.set('started', true).set('strict', strict)).set('isSwitchedOff', false).set('notesCount',1);
      return addNoteState;

    case PLAY_NOTE:
      return game.set('highlightingButtonId', payload);

    case NEXT_TURN:
      let newState = nextTurn(game);
      return newState;


    case NEXT_NOTE:
      let step = game.get('currentStep') + 1;
      return game.set('currentStep', step);

    case  SWITCH_OFF_LIGHT:
      return game.set('highlightingButtonId', false);

    case WRONG_NOTE:
      let errorState;
      if (game.get('strict')) {
        errorState = addNote(defaultState.set('notesCount',1).set('highlightingButtonId', payload).set('started', true).set('strict', true).set('isLocked', true).set('isSwitchedOff', false));
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
    return defaultState.set('notesCount', 'win').set('isSwitchedOff', false).set('isLocked', true);
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