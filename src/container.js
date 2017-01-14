import React, {Component, PropTypes} from 'react'
import {Provider} from 'react-redux'
import store from './store/index'
import App from './App'

export default ()=> (
  <Provider store={store}>
    <App/>
  </Provider>
)