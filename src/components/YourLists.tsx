import * as React from 'react';
import { connect } from 'react-redux';
import { userModel } from '../models/userModel';
import ListIcon from './ListIcon';
import { addNewList, changeLastListId } from '../actions/userActions';
import { ScaleLoader } from 'react-spinners';
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
    getAllLists(newList);
    this.props.onAddNewList(newList);

    let tmp = false;
    tmp = await getLastId(this.props.onChangeLastListId, tmp);
    this.setState({ isDataReady: tmp });
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
          <div className="loader">
            <ScaleLoader height={135} width={10} margin={'10px'} radius={2} color={'#333333'} loading={true} />
          </div>
        )}
      </div>
    );
  }
}

function mapPropsToState(state: any): userModel {
  return {
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
