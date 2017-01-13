import React, {Component} from 'react';
import NoteBtn from './components/noteBtn'

import './App.css';

class App extends Component {

  render() {
    
    return (
      <div className="simon">
        <div className="sector-line">
          <NoteBtn id={"1"}/>
          <NoteBtn id={"2"}/>
          
        </div>
        <div className="sector-line">
          <NoteBtn id={"3"}/>
          <NoteBtn id={"4"}/>
        </div>
        <div className="panel">
          <h3 className="game-caption">SIMON</h3>
          <div className="score">15</div>
          <div className="control-buttons">
            <button className="control-btn start">START</button>
            <button className="control-btn strict">STRICT</button>
          </div>
          <div className="switch-on-off">
            <label className="switch">
              <input className="switch__input" type="checkbox"/>
                <div className="slider round"></div>
            </label>
            <p className="switch-on-off__text">on/off</p>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;
