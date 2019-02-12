import * as React from 'react';
import { connect } from 'react-redux';
import { changeName, changeAge } from '../actions/userActions';
import { userModel } from '../models/userModel';

interface Props {
  onNameChange: any;
  onSecondNameChange: any;
  firstName: any;
  secondName: any;
  lists: any;
}

class User extends React.Component<Props> {
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.onNameChange} />
        <br />
        User Name: {this.props.firstName}
        <br />
        <input type="text" onChange={this.props.onSecondNameChange} />
        <br />
        User Surname: {this.props.secondName}
      </div>
    );
  }
}

function mapStateToProps(state: any): userModel {
  return {
    firstName: state.userReducer.firstName,
    secondName: state.userReducer.secondName,
    lists: state.userReducer.lists,
    lastListId: state.userReducer.lastListId,
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
