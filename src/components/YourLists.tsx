import * as React from 'react';
import { connect } from 'react-redux';
import ListIcon from './ListIcon';
import { changeLists, changeLastListId } from '../actions/userActions';
import { getAllLists } from '../queries/lists';
import { getLastId } from '../queries/lists';
import { ScaleLoader } from 'react-spinners';
import { withRouter } from 'react-router';

interface Props {
  email: string;
  lists: any;
  onAddNewList: any;
  onChangeLastListId: any;
  history: any;
}

interface State {
  isDataReady: boolean;
}

class YourLists extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDataReady: false,
    };
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllLists(this.props.email);
    this.props.onAddNewList(newList);
    await getLastId(this.props.email, this.props.onChangeLastListId);
    this.setState({ isDataReady: true });
  }

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <div className="yourlists-container">
            <ListIcon listId={-1} isToAdd={true} name="Add New" history={this.props.history} />

            {this.props.lists.map((item: any) => (
              <ListIcon key={item.id} listId={item.id} isToAdd={false} name={item.name} history={this.props.history} />
            ))}

            <div className="listicon empty" />
            <div className="listicon empty" />
            <div className="listicon empty" />
          </div>
        ) : (
          <div className="spinner">
            <ScaleLoader height={135} width={10} margin={'10px'} radius={2} color={'#333333'} loading={true} />
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
)(withRouter(YourLists));
