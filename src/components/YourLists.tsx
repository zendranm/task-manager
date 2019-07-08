import * as React from 'react';
import { connect } from 'react-redux';
import ListIcon from './ListIcon';
import { changeLists, changeLastListId } from '../actions/userActions';
import { getAllLists, getLastId } from '../queries/queries';

interface Props {
  lists: any;
  onAddNewList: any;
  onChangeLastListId: any;
  history: any;
}

interface State {
  isDataReady: boolean;
}

class YourLists extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isDataReady: false,
    };
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllLists();
    this.props.onAddNewList(newList);
    await getLastId(this.props.onChangeLastListId);
    this.setState({ isDataReady: true });
  }

  render() {
    return (
      <div className="listcontainer">
        {this.state.isDataReady ? (
          <div className="yourlists">
            {this.props.lists.map((item: any) => (
              <ListIcon key={item.id} listId={item.id} isToAdd={false} name={item.name} history={this.props.history} />
            ))}
            <ListIcon listId={-1} isToAdd={true} name="Add New" history={this.props.history} />
            {this.props.lists.map((item: any) => {
              <h1>{item.name}</h1>;
            })}
            <div className="emptyicon" />
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    lists: state.userReducer.lists,
    lastListId: state.userReducer.lastListId,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onAddNewList: (event: any) => {
      dispatch(changeLists(event));
    },
    onChangeLastListId: (event: any) => {
      dispatch(changeLastListId(event));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YourLists);
