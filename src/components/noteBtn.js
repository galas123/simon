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
    const {clickNote, id}=this.props;
    ev.preventDefault();
    clickNote(id);
  }
}

export default connect(null, {clickNote})(clickNoteBtn);