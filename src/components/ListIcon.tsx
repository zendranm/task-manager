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
    let l = { id: this.props.lists.length, authorId: 6, name: this.state.newListName };
    let a = this.props.lists.slice();
    a.push(l);
    console.log(a);
    this.props.onAddNewList(a);
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
                <input type="text" onChange={e => this.setState({ newListName: e.target.value })} />
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

function mapPropsToState(state: any) {
  return {
    lists: state.userReducer.lists,
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
  mapPropsToState,
  mapDispatchToProps
)(ListIcon);
