import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

export default class clickNoteBtn extends Component {
  render() {
    const {id}=this.props;
    return (
      <button
        className={`sector sector${id}`}
        onClick={this.clickBtn}
      />
    );
  }

  clickBtn = (ev) => {
    const {clickNote}=this.props;
    ev.preventDefault();
    clickNote(id);
  }
}

const mapStateToProps = state=>({
  turn       : state.game.turn,
  sounds       : state.game.sounds,
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);