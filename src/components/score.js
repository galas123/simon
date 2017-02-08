import React, {
  Component
} from 'react';

import {connect} from 'react-redux';

class score extends Component {
  render() {
    const {notesCount}=this.props;
    return (
      <div className="score">{notesCount}</div>
    );

  }
}
const mapStateToProps = state=>({
  notesCount       : state.game.get('notesCount')
});

export default connect(mapStateToProps, null)(score);