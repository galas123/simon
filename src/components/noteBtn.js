import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {

  render() {
    const {id, highlightedButtonId, isSwitchedOff, isStarted} = this.props;
    return (
      <button
        className={cx(`sector sector${id}`,{'sector--selected':id===Number(highlightedButtonId)}, 
        {'switch-off': isSwitchedOff}, {'enactive':!isStarted})}
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
  isLocked            : state.game.get('isLocked'),
  highlightedButtonId: state.game.get('highlightedButtonId'),
  isSwitchedOff       : state.game.get('isSwitchedOff'),
  isStarted             : state.game.get('isStarted')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);