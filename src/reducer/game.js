import {CLICK_NOTE, START_GAME, LOCK} from '../constants'

import {Map, List}  from 'immutable'


const defaultState = Map({
  noteCount  : 1,
  currentStep: 0,
  randomNotes: List([]),
  answerTimer: null,
  started    : false,
  lock:false
});

export default (game = defaultState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LOCK:
      return game.set('lock', true);
      
    case CLICK_NOTE:
      console.log('нажата клавиша:', payload);

      playSoundtrack(payload);

      if (game.getIn(['randomNotes', game.get('currentStep')]) == payload) {
        const step       = Number(game.get('currentStep')) + 1;
        const countNotes = Number(game.get('noteCount'))
        let newState     = game.set('currentStep', step);
        if (step === countNotes) {
          newState = nextTurn(newState);
        }
        console.log('score:', newState.get('noteCount'), 'step', newState.get('currentStep'), 'залочено:', newState.get('lock') );
        return newState.set('lock', false);
      }
      else {
        let errorState     = game.set('currentStep', 0);

        return errorState.set('lock', false);
      }

    case START_GAME:
      let addNoteState = addNote(defaultState.set('started', true));
      repeatRandomNotes(addNoteState);
      return addNoteState;

  }
  return game;
}

function playSoundtrack(id) {
  const url   = 'https://s3.amazonaws.com/freecodecamp/simonSound' + id + '.mp3';
  const audio = new Audio(url);
  audio.play();
}

function errorAnswer(state) {
  const url   = 'https://downloader.disk.yandex.ru/disk/15f8ad73c05ac820fd46757f6bf3e8cff6d84a5e010a27e5bbe28756c751060b/58808b87/1Xy9V5kP-ew_sqPqeLNGLNzFHwUWsrtVdgPCPHtcwIuuxdwaRjhk1vUaW20DCPt8DTKb_DPozPokBSoXm8TZOw%3D%3D?uid=0&filename=Zvuk-Oshibki_kompyutera_%28by_JoKeR%29.mp3&disposition=attachment&hash=%2B6W2vNgvUFtDstq2UrT5t0mzokRn2MULSvhtJw1Lf6k%3D&limit=0&content_type=audio%2Fmpeg&fsize=243945&hid=cb8df1c3cb7f8ceee9d107e72a22cbbb&media_type=audio&tknv=v2';
  const audio = new Audio(url);
  audio.play();
  setTimeout(()=>repeatRandomNotes(state),3000);
  return state;
}

function repeatRandomNotes(state) {
  let i=0;
  play();

  function play() {
    const promise = new Promise((resolve, reject) => {
      if (i===state.get('randomNotes').size) {reject();}
      const note    = state.getIn(['randomNotes', i]);
      setTimeout(() => resolve(note), 500);
    });
    promise
      .then(
        note => {
          playSoundtrack(note);
          i++;
          play();
        },
        error => console.log('error =>',error)
      )
      .catch(
        error=>console.log('error =>',error)
      );
  }
}

function nextTurn(state) {
  const plusCountState = state.set('noteCount', state.get('noteCount') + 1).set('currentStep', 0);
  if (plusCountState.get('noteCount') === 6) {
    console.log('победа');
    return defaultState;
  }

  const addNoteState = addNote(plusCountState);
  setTimeout(()=>repeatRandomNotes(addNoteState),1500);
  return addNoteState;
}

function addNote(state) {
  const min     = 1;
  const max     = 4;
  const newNote = Math.floor(Math.random() * (max - min + 1)) + min;
  const  plusNoteState= state.get('randomNotes').push(newNote);
  console.log ('рандомные ноты:', plusNoteState.toJS());
  return state.set('randomNotes', plusNoteState);
}