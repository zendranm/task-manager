import * as React from 'react';
import { connect } from 'react-redux';
import { changeName, changeAge } from '../actions/userActions';
import { userModel } from '../models/userModel';

interface Props {
  onNameChange: any;
  onAgeChange: any;
  id: any;
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
        <input type="text" onChange={this.props.onAgeChange} />
        <br />
        User Age: {this.props.secondName}
        <br />
        Is Active:
        {this.props.id ? <h2>Active</h2> : <h2>Unactive</h2>}
        <br />
        Id: {this.props.id}
      </div>
    );
  }
}

function mapStateToProps(state: any): userModel {
  return {
    id: state.userReducer.id,
    firstName: state.userReducer.firstName,
    secondName: state.userReducer.secondName,
    lists: state.userReducer.lists,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onNameChange: (event: any) => {
      dispatch(changeName(event.target.value));
    },
    onAgeChange: (event: any) => {
      dispatch(changeAge(event.target.value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
