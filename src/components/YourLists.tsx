import * as React from 'react';
import { connect } from 'react-redux';
import { userModel } from '../models/userModel';
import ListIcon from './ListIcon';

interface Props {
  id: any;
  firstName: any;
  secondName: any;
  lists: any;
}

class YourLists extends React.Component<Props> {
  render() {
    return (
      <div className="yourlists">
        {this.props.lists.map((item: any) => (
          <ListIcon key={item.id} isToAdd={false} name={item.name} />
        ))}
        <ListIcon isToAdd={true} name="Add New" />
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
