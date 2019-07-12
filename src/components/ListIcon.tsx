import * as React from 'react';
import { connect } from 'react-redux';
import { changeLists, changeLastListId } from '../actions/userActions';
import { changeUsername } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { addList, deleteList } from '../queries/lists';
import { withRouter } from 'react-router';

library.add(faTrashAlt, faPencilAlt, faPlus);

interface Props {
  isToAdd: boolean;
  name: string;
  lists: Array<any>;
  userId: number;
  listId: number;
  lastListId: number;
  onNameChange: any;
  onAddNewList: any;
  onChangeLastListId: any;
  history: any;
  email: string;
}

interface State {
  isBeingModified: boolean;
  newListName: string;
}

class ListIcon extends React.Component<Props, State> {
  node: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isBeingModified: false,
      newListName: 'Some new name',
    };
    this.onAddList = this.onAddList.bind(this);
    this.onDeleteList = this.onDeleteList.bind(this);
    this.onEnterClick = this.onEnterClick.bind(this);
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

  onAddList(e: any) {
    addList(this.props.email, this.props.lastListId, this.state.newListName);
    let newItem = { id: this.props.lastListId + 1, authorId: this.props.userId, name: this.state.newListName };
    let newList = this.props.lists.slice();
    newList.unshift(newItem);
    this.props.onAddNewList(newList);
    this.setState({ isBeingModified: false, newListName: 'Some new name' });
    this.props.onChangeLastListId(this.props.lastListId + 1);
  }

  onDeleteList() {
    deleteList(this.props.email, this.props.listId);
    let newList = this.props.lists.slice();
    let ref = newList.find(item => item.id === this.props.listId);
    newList.splice(newList.indexOf(ref), 1);
    this.props.onAddNewList(newList);
  }

  onEnterClick(input: any, button: any) {
    input.addEventListener('keyup', function(event: any) {
      event.preventDefault();
      if (event.keyCode === 13) {
        button.click();
      }
    });
  }

  render() {
    var input = document.getElementById('inputtext');
    var button = document.getElementById('addbutton');

    if (input != null && button != null) {
      this.onEnterClick(input, button);
    }

    return (
      <div ref={node => (this.node = node)}>
        {this.props.isToAdd ? (
          <div>
            {this.state.isBeingModified ? (
              <div className="listicon new-form">
                <input
                  id="inputtext"
                  className="inputtext"
                  type="text"
                  onChange={e => this.setState({ newListName: e.target.value })}
                  placeholder="List name..."
                  autoFocus
                />
                <button id="addbutton" className="listicon-button" onClick={this.onAddList}>
                  Add
                </button>
              </div>
            ) : (
              <div
                className="listicon new-button"
                onClick={() => {
                  this.setState(() => {
                    return {
                      isBeingModified: true,
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
          <div className="listicon normal">
            <div
              className="namecontainer"
              onClick={() => {
                this.props.history.push('/yourlists/' + this.props.name);
              }}
            >
              {this.props.name}
            </div>
            <div className="iconcontainer">
              <div className="settingsicon">
                <FontAwesomeIcon icon="pencil-alt" size="1x" />
              </div>
              <div className="deleteicon" onClick={() => this.onDeleteList()}>
                <FontAwesomeIcon icon="trash-alt" size="1x" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    email: state.userReducer.email,
    lists: state.userReducer.lists,
    userId: state.userReducer.id,
    lastListId: state.userReducer.lastListId,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAddNewList: (event: any) => {
      dispatch(changeLists(event));
    },
    onNameChange: (event: any) => {
      dispatch(changeUsername(event));
    },
    onChangeLastListId: (event: any) => {
      dispatch(changeLastListId(event));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ListIcon));
