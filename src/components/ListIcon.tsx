import * as React from 'react';
import { connect } from 'react-redux';
import { addNewList } from '../actions/userActions';
import { changeName } from '../actions/userActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faTrashAlt);

interface Props {
  onNameChange: any;
  isToAdd: Boolean;
  name: String;
  onAddNewList: any;
  lists: Array<any>;
  userId: Number;
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
    let newItem = { id: this.props.lists.length, authorId: this.props.userId, name: this.state.newListName };
    let newList = this.props.lists.slice();
    newList.push(newItem);
    this.props.onAddNewList(newList);
    this.setState({ isBeingModified: false, newListName: 'Some new name' });
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
            <FontAwesomeIcon icon="trash-alt" size="1x" color="OrangeRed" />
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIcon);
