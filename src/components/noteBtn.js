import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {

  render() {
    const {id, highlightingButtonId, isSwitchedOff, started} = this.props;
    return (
      <button
        className={cx(`sector sector${id}`,{'sector--selected':Number(id)===Number(highlightingButtonId)}, 
        {'switch-off': isSwitchedOff}, {'enactive':!started})}
        onClick={this.onClick}
      />
    );
  }

  onClick = (ev) => {
    const {clickNote, id, isLocked}=this.props;
    ev.preventDefault();
    if (!isLocked) {
      clickNote(id);
    }
  }
}

const mapStateToProps = state=>({
  isLocked       : state.game.get('isLocked'),
  highlightingButtonId: state.game.get('highlightingButtonId'),
  isSwitchedOff  : state.game.get('isSwitchedOff'),
  started    : state.game.get('started')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);