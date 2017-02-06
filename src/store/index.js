import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk';

import playNote from '../middlewares/playNote'
import switchOff from '../middlewares/switchOff'

const enhancer = compose(applyMiddleware(thunk, switchOff, playNote));

const store = createStore(reducer, {}, enhancer);

window.store = store;
export default store