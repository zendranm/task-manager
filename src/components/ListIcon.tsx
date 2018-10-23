import * as React from 'react';
import { connect } from 'react-redux';
import { addNewList } from '../actions/userActions';

interface Props {
  isToAdd: Boolean;
  name: String;
  onAddNewList: any;
  lists: any;
}

interface State {
  isBeingModified: Boolean;
  list: String;
}

class ListIcon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isBeingModified: false,
      list: 'Some new name',
    };
    this.onAddList = this.onAddList.bind(this);
  }

  onAddList(e: any) {
    let l = { id: this.props.lists.length, authorId: this.props.lists.length, name: this.state.list };
    let a = this.props.lists;
    a.push(l);
    this.props.onAddNewList(a);
    this.setState({ list: '' });
  }

  render() {
    console.log('rerender');
    return (
      <div>
        {this.props.isToAdd ? (
          <div>
            {this.state.isBeingModified ? (
              <div className="listicon">
                New list:
                <br />
                <input type="text" onChange={e => this.setState({ list: e.target.value })} />
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
  };
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(ListIcon);
