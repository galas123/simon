import React, {
  Component
} from 'react';
import '../App.css';
import {connect} from 'react-redux';

import {switchOnOff} from '../AC/switchOnOff';

class clickSwitchOnOff extends Component {
  render() {
    const {switchOff}=this.props;
    return (
      <div
        className="switch-on-off"
        onClick={this.clickBtn}
      >
        <label className="switch">
          <input className="switch__input" type="checkbox"/>
          <div className="slider round"></div>
        </label>
        <p className="switch-on-off__text">off/on</p>
      </div>
    );
  }

  clickBtn = (ev) => {
    const {switchOnOff}=this.props;
    ev.preventDefault();
    switchOnOff();
  }
}


export default connect(null, {switchOnOff})(clickSwitchOnOff);