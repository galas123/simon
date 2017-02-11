import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {startGame} from '../AC/startGame';

class clickStartBtn extends Component {
  render() {
    return (
      <button 
        className="control-btn start"
        onClick={this.onClick}
      >
        START
      </button>
    );
  }

  onClick = (ev) => {
    const {startGame}=this.props;
    ev.preventDefault();
    startGame();
  }
}

export default connect(null, {startGame})(clickStartBtn);