import React, {
  Component
} from 'react';

import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {
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
    const {clickNote, id, lock}=this.props;
    ev.preventDefault();
    if (!lock) {
      clickNote(id);
    }
  }
}

const mapStateToProps = state=>({
  lock: state.game.get('lock')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);