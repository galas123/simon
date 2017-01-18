import React, {
  Component
} from 'react';

import {connect} from 'react-redux';

class score extends Component {
  render() {
    const {noteCount}=this.props;
    return (
      <div className="score">{noteCount}</div>
    );

  }
}
const mapStateToProps = state=>({
  noteCount       : state.game.get('noteCount')
});

export default connect(mapStateToProps, null)(score);