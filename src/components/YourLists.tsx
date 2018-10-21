import * as React from 'react';
import { connect } from 'react-redux';
import { userModel } from '../models/userModel';
import ListIcon from './ListIcon';

interface Props {
  lists: any;
}

class YourLists extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.lists.map((item: any) => (
          <ListIcon key={item.id} name={item.name} />
        ))}
        <ListIcon name="Add New" />
      </div>
    );
  }
}

function mapPropsToState(state: any): userModel {
  return {
    id: state.userReducer.id,
    firstName: state.userReducer.firstName,
    secondName: state.userReducer.secondName,
    lists: state.userReducer.lists,
  };
}

export default connect(mapPropsToState)(YourLists);
