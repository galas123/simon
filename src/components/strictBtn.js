import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {strictMode} from '../AC/strictMode';

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
    const {strictMode}=this.props;
    ev.preventDefault();
    strictMode();
  }
}

const mapStateToProps = state=>({
  strict       : state.game.get('strict')
});

export default connect(mapStateToProps, {strictMode})(clickStrictBtn);