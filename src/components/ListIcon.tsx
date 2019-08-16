import * as React from 'react';
import { connect } from 'react-redux';
import { changeLists, changeLastListId } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addList, deleteList, updateList } from '../queries/lists';
import { withRouter } from 'react-router';
import ProgressBar from './ProgressBar';

library.add(faTrashAlt, faPencilAlt, faPlus);

interface Props {
  listId: number;
  listFirestoreId: string;
  isToAdd: boolean;
  name: string;
  id: string;
  lists: Array<any>;
  lastListId: number;
  onAddNewList: (value: Array<any>) => void;
  onChangeLastListId: (value: number) => void;
  history: any;
  percentage: number;
}

interface State {
  isBeingCreated: boolean;
  isBeingModified: boolean;
  newListName: string;
  newFirestoreId: string;
}

class ListIcon extends React.Component<Props, State> {
  node: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isBeingCreated: false,
      isBeingModified: false,
      newListName: 'List name...',
      newFirestoreId: '',
    };
    this.onAddList = this.onAddList.bind(this);
    this.onRenameList = this.onRenameList.bind(this);
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
      this.setState({ isBeingCreated: false, isBeingModified: false });
    }
  };

  async onAddList() {
    const newFirestoreId = await addList(this.props.id, this.props.lastListId + 1, this.state.newListName);
    const newItem = {
      id: this.props.lastListId + 1,
      firestoreId: newFirestoreId,
      name: this.state.newListName,
      percentage: 0,
    };
    let newList = this.props.lists.slice();
    newList.unshift(newItem);
    this.props.onAddNewList(newList);
    this.setState({ isBeingCreated: false, newListName: 'List name...' });
    this.props.onChangeLastListId(this.props.lastListId + 1);
  }

  onRenameList() {
    updateList(this.props.id, this.props.listFirestoreId, this.state.newListName);
    let newList = this.props.lists.slice();
    let ref = newList.find(item => item.id === this.props.listId);
    ref.name = this.state.newListName;
    this.props.onAddNewList(newList);
    this.setState({ isBeingModified: false, newListName: 'List name...' });
  }

  onDeleteList() {
    let newList = this.props.lists.slice();
    const ref = newList.find(item => item.id === this.props.listId);
    newList.splice(newList.indexOf(ref), 1);
    this.props.onAddNewList(newList);
    if (this.props.listFirestoreId == undefined) {
      deleteList(this.props.id, this.state.newFirestoreId);
    } else {
      deleteList(this.props.id, this.props.listFirestoreId);
    }
  }

  render() {
    return (
      <div ref={node => (this.node = node)}>
        {this.props.isToAdd ? (
          <div>
            {this.state.isBeingCreated ? (
              <div className="listicon new-form">
                <input
                  id="inputtext"
                  type="text"
                  onChange={e => this.setState({ newListName: e.target.value })}
                  placeholder="List name..."
                  autoFocus
                />
                <button id="addbutton" className="listicon-button-add" onClick={this.onAddList}>
                  Add
                </button>
              </div>
            ) : (
              <div
                className="listicon new-button"
                onClick={() => {
                  this.setState(() => {
                    return {
                      isBeingCreated: true,
                    };
                  });
                }}
              >
                <FontAwesomeIcon icon="plus" size="2x" />
                <div>{this.props.name}</div>
              </div>
            )}
          </div>
        ) : (
          <div>
            {this.state.isBeingModified ? (
              <div className="listicon rename-form">
                <input
                  id="inputtext"
                  type="text"
                  onChange={e => this.setState({ newListName: e.target.value })}
                  placeholder="List name..."
                  autoFocus
                />
                <button id="addbutton" className="listicon-button-rename" onClick={this.onRenameList}>
                  Rename
                </button>
              </div>
            ) : (
              <div className="listicon normal">
                <div
                  className="listicon-leftbox"
                  onClick={() => {
                    this.props.history.push('/yourlists/' + this.props.name);
                  }}
                >
                  <div className="listicon-listname">{this.props.name}</div>
                  <ProgressBar percentage={this.props.percentage} />
                </div>
                <div className="listicon-rightbox">
                  <div
                    className="listicon-pencilicon"
                    onClick={() => {
                      this.setState(() => {
                        return {
                          isBeingModified: true,
                        };
                      });
                    }}
                  >
                    <FontAwesomeIcon icon="pencil-alt" size="1x" />
                  </div>
                  <div className="listicon-deleteicon" onClick={() => this.onDeleteList()}>
                    <FontAwesomeIcon icon="trash-alt" size="1x" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    id: state.userReducer.id,
    lists: state.userReducer.lists,
    lastListId: state.userReducer.lastListId,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAddNewList: (value: Array<any>) => {
      dispatch(changeLists(value));
    },
    onChangeLastListId: (value: number) => {
      dispatch(changeLastListId(value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListIcon));
