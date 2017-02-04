import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {

  render() {
    const {id, lightingBtn, switchOff}=this.props;
    const cl=`sector${id}--selected`;
    return (
      <button
        className={cx(`sector sector${id}`,{[cl]:Number(id)===Number(lightingBtn)}, {'switch-off': switchOff})}
        onClick={this.clickBtn}
      />
    );
  }

  clickBtn = (ev) => {
    const {clickNote, id, lock}=this.props;
    ev.preventDefault();
    console.log(!lock);
    if (!lock) {
      clickNote(id);
    }
  }
}

const mapStateToProps = state=>({
  lock: state.game.get('lock'),
  lightingBtn:state.game.get('lightingBtn'),
  switchOff:state.game.get('switchOff')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);