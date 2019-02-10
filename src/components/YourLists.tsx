import * as React from 'react';
import { connect } from 'react-redux';
import { userModel } from '../models/userModel';
import ListIcon from './ListIcon';
import { addNewList, changeLastListId } from '../actions/userActions';
import fire from '../../firebase';

interface Props {
  id: any;
  firstName: any;
  secondName: any;
  lists: any;
  onAddNewList: any;
  onChangeLastListId: any;
}

class YourLists extends React.Component<Props> {
  async componentDidMount() {
    let newList: any = new Array();

    let db = fire.firestore();
    await db
      .collection('Lists')
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          newList.push({ id: doc.data().ID, authorId: 99, name: doc.data().Name });
        });
      });
    this.props.onAddNewList(newList);

    await db
      .collection('Lists')
      .orderBy('ID', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot: any) => {
        querySnapshot.forEach((doc: any) => {
          this.props.onChangeLastListId(doc.data().ID);
        });
      });
  }

  render() {
    return (
      <div className="yourlists">
        {this.props.lists.map((item: any) => (
          <ListIcon key={item.id} listId={item.id} isToAdd={false} name={item.name} />
        ))}
        <ListIcon listId={-1} isToAdd={true} name="Add New" />
        {this.props.lists.map((item: any) => {
          <h1>{item.name}</h1>;
        })}
        <div className="emptyicon" />
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
    lastListId: state.userReducer.lastListId,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAddNewList: (event: any) => {
      dispatch(addNewList(event));
    },
    onChangeLastListId: (event: any) => {
      dispatch(changeLastListId(event));
    },
  };
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(YourLists);
