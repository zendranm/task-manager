import * as React from 'react';
import { connect } from 'react-redux';
import { changeUsername, changeEmail } from '../actions/userActions';

interface Props {
  onNameChange: any;
  aa: any;
  username: any;
  email: any;
}

class User extends React.Component<Props> {
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.onNameChange} />
        <br />
        Username: {this.props.username}
        <br />
        <input type="text" onChange={this.props.aa} />
        <br />
        Email: {this.props.email}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    username: state.userReducer.username,
    email: state.userReducer.email,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onNameChange: (event: any) => {
      dispatch(changeUsername(event.target.value));
    },
    aa: (event: any) => {
      dispatch(changeEmail(event.target.value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
