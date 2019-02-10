import * as React from 'react';
import { connect } from 'react-redux';
import { addNewList, changeLastListId } from '../actions/userActions';
import { changeName } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import fire from '../../firebase';

library.add(faTrashAlt);

interface Props {
  onNameChange: any;
  isToAdd: Boolean;
  name: String;
  onAddNewList: any;
  lists: Array<any>;
  userId: Number;
  listId: Number;
  lastListId: number;
  onChangeLastListId: any;
}

interface State {
  isBeingModified: Boolean;
  newListName: String;
}

class ListIcon extends React.Component<Props, State> {
  node: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      isBeingModified: false,
      newListName: 'Some new name',
    };
    this.onAddList = this.onAddList.bind(this);
    this.onDeleteList = this.onDeleteList.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  }

  handleOutsideClick = (e: any) => {
    if (!this.node.contains(e.target)) {
      this.setState({ isBeingModified: false });
    }
  };

  async onAddList(e: any) {
    let db = fire.firestore();
    db.collection('Lists').add({
      ID: this.props.lastListId + 1,
      Name: this.state.newListName,
    });

    let newItem = { id: this.props.lastListId + 1, authorId: this.props.userId, name: this.state.newListName };
    let newList = this.props.lists.slice();
    newList.push(newItem);
    this.props.onAddNewList(newList);
    this.setState({ isBeingModified: false, newListName: 'Some new name' });

    let tmp = this.props.lastListId;
    this.props.onChangeLastListId(tmp + 1);
  }

  onDeleteList(e: any) {
    let db = fire.firestore();
    let item = db.collection('Lists').where('ID', '==', this.props.listId);

    item.get().then(function(querySnapshot: any) {
      querySnapshot.forEach(function(doc: any) {
        doc.ref.delete();
      });
    });

    let newList = this.props.lists.slice();
    let ref = newList.find(item => item.id === this.props.listId);
    newList.splice(newList.indexOf(ref), 1);
    this.props.onAddNewList(newList);
  }

  render() {
    return (
      <div ref={node => (this.node = node)}>
        {this.props.isToAdd ? (
          <div>
            {this.state.isBeingModified ? (
              <div className="newlisticon">
                New list:
                <br />
                <input
                  type="text"
                  onChange={e => this.setState({ newListName: e.target.value })}
                  placeholder="Some new name"
                />
                <button onClick={this.onAddList}>Add</button>
              </div>
            ) : (
              <div
                className="listicon"
                onClick={() => {
                  this.setState(() => {
                    return {
                      isBeingModified: true,
                    };
                  });
                }}
              >
                {this.props.name}
              </div>
            )}
          </div>
        ) : (
          <div className="listicon">
            {this.props.name}
            <div className="deleteicon" onClick={this.onDeleteList}>
              <FontAwesomeIcon icon="trash-alt" size="1x" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    lists: state.userReducer.lists,
    userId: state.userReducer.id,
    lastListId: state.userReducer.lastListId,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAddNewList: (event: any) => {
      dispatch(addNewList(event));
    },
    onNameChange: (event: any) => {
      dispatch(changeName(event));
    },
    onChangeLastListId: (event: any) => {
      dispatch(changeLastListId(event));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIcon);
