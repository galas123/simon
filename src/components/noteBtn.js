import React, {
  Component
} from 'react';
import cx from 'classnames';
import {connect} from 'react-redux';

import {clickNote} from '../AC/clickNote';

class clickNoteBtn extends Component {

  constructor(props) {
    super(props);
    this.state = {selected: false};
  }
  render() {
    const {id}=this.props;
    const cl=`sector${id}--selected`;
    return (
      <button
        className={cx(`sector sector${id}`,{[cl]:this.state.selected})}
        onClick={this.clickBtn}
        onMouseDown ={this.mouseDownBtn}
        onMouseUp ={this.mouseUpBtn}
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
  mouseDownBtn=(ev) => {
    ev.preventDefault();
    this.setState({
      selected: true
    });
  }
  mouseUpBtn=(ev) => {
    ev.preventDefault();
    this.setState({
      selected: false
    });
  }
}

const mapStateToProps = state=>({
  lock: state.game.get('lock')
});

export default connect(mapStateToProps, {clickNote})(clickNoteBtn);