import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {switchOn} from '../AC/switchOn';
import {switchOff} from '../AC/switchOff';

import '../App.css';

class switchOnOff extends Component {
  render() {
    return (
      <div className="switch-on-off">
        <label className="switch">
          <input className="switch__input" type="checkbox" onChange={this.onChange}/>
          <div className="slider round"></div>
        </label>
        <p className="switch-on-off__text">off/on</p>
      </div>
    );
  }

  onChange = (e)=> {
    const {switchOn, switchOff}=this.props;
    const checked = e.target.checked;
    checked ? switchOn() : switchOff(); 
  }
}

export default connect(null, {switchOn, switchOff })(switchOnOff);