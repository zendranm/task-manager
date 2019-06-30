import * as React from 'react';
import { connect } from 'react-redux';
import { changeName, changeAge } from '../actions/userActions';

interface Props {
  onNameChange: any;
  onSecondNameChange: any;
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
        <input type="text" onChange={this.props.onSecondNameChange} />
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
      dispatch(changeName(event.target.value));
    },
    onSecondNameChange: (event: any) => {
      dispatch(changeAge(event.target.value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
