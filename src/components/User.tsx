import * as React from 'react';
import { connect } from 'react-redux';

interface Props {
  username: string;
  email: string;
  lists: Array<any>;
}

class User extends React.Component<Props> {
  render() {
    return (
      <div className="user-container">
        Username: {this.props.username}
        <br />
        Email: {this.props.email}
        <br />
        Number of lists: {this.props.lists.length}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    username: state.userReducer.username,
    email: state.userReducer.email,
    lists: state.userReducer.lists,
  };
}

export default connect(mapStateToProps)(User);
