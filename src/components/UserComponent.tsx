import * as React from 'react';
import { connect } from 'react-redux';
import { changeName, changeAge } from '../actions/userActions';
import { userModel } from '../models/userModel';

interface Props {
  onNameChange: any;
  onAgeChange: any;
  name: any;
  age: any;
  active: any;
}

class UserComponent extends React.Component<Props> {
  render() {
    return (
      <div>
        <input type="text" onChange={this.props.onNameChange} />
        <br />
        User Name: {this.props.name}
        <br />
        <input type="text" onChange={this.props.onAgeChange} />
        <br />
        User Age: {this.props.age}
        <br />
        Is Active:
        {this.props.active ? <h2>Active</h2> : <h2>Unactive</h2>}
      </div>
    );
  }
}

function mapPropsToState(state: any): userModel {
  return {
    name: state.userReducer.name,
    age: state.userReducer.age,
    active: state.userReducer.active,
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
  mapPropsToState,
  mapDispatchToProps
)(UserComponent);
