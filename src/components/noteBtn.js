import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {

  render() {
    const {id, lightingBtn}=this.props;
    const cl=`sector${id}--selected`;
  
    return (
      <button
        className={cx(`sector sector${id}`,{[cl]:Number(id)===Number(lightingBtn)})}
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
  lock: state.game.get('lock'),
  lightingBtn:state.game.get('lightingBtn')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);