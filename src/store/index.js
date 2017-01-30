import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'

import playNote from '../middlewares/playNote'

const logger   = createLogger();
const enhancer = compose(applyMiddleware(thunk, playNote));

const store = createStore(reducer, {}, enhancer);

window.store = store;
export default store