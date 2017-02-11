import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {toggleStrictMode} from '../AC/toggleStrictMode';

class clickStrictBtn extends Component {
  render() {
    const {strict}=this.props;
    return (
    <button
      className={cx(`control-btn`,{'strict':strict})}
      onClick={this.onClick}
    >
      STRICT
    </button>
    );
  }

  onClick = (ev) => {
    const {toggleStrictMode}=this.props;
    ev.preventDefault();
    toggleStrictMode();
  }
}

const mapStateToProps = state=>({
  strict       : state.game.get('strict')
});

export default connect(mapStateToProps, {toggleStrictMode})(clickStrictBtn);