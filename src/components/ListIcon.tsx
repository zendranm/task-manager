import * as React from 'react';
import { connect } from 'react-redux';
import { addNewList } from '../actions/userActions';
import { changeName } from '../actions/userActions';

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
  constructor(props: Props) {
    super(props);
    this.state = {
      isBeingModified: false,
      newListName: 'Some new name',
    };
    this.onAddList = this.onAddList.bind(this);
  }

  onAddList(e: any) {
    let newItem = { id: this.props.lists.length, authorId: this.props.userId, name: this.state.newListName };
    let newList = this.props.lists.slice();
    newList.push(newItem);
    this.props.onAddNewList(newList);
    this.setState({ isBeingModified: false, newListName: 'Some new name' });
  }

  render() {
    return (
      <div>
        {this.props.isToAdd ? (
          <div>
            {this.state.isBeingModified ? (
              <div className="listicon">
                New list:
                <br />
                <input
                  type="text"
                  onChange={e => this.setState({ newListName: e.target.value })}
                  placeholder="Some new name"
                />
                <br />
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
          <div className="listicon">{this.props.name}</div>
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
