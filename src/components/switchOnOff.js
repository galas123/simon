import React, {
  Component
} from 'react';
import {connect} from 'react-redux';

import {toggleSwitch} from '../AC/toggleSwitch';


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
    const {toggleSwitch}=this.props;
    const checked = e.target.checked;
    toggleSwitch(); 
  }
}

export default connect(null, {toggleSwitch})(switchOnOff);