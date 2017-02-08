import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {

  render() {
    const {id, lightingBtn, switchOff, started} = this.props;
    return (
      <button
        className={cx(`sector sector${id}`,{'sector--selected':Number(id)===Number(lightingBtn)}, 
        {'switch-off': switchOff}, {'enactive':!started})}
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
  lock       : state.game.get('lock'),
  lightingBtn: state.game.get('lightingBtn'),
  switchOff  : state.game.get('switchOff'),
  started    : state.game.get('started')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);