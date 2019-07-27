import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllTasks } from '../queries/tasks';
import TaskIcon from './TaskIcon';
import { ScaleLoader } from 'react-spinners';

interface Props {
  match: any;
  id: string;
}

interface State {
  taskList: any;
  isDataReady: boolean;
}

class YourTasks extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      taskList: null,
      isDataReady: false,
    };
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllTasks(this.props.id, this.props.match.params.name);
    this.setState({ taskList: newList, isDataReady: true });
  }

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <div>
            <div>
              {this.state.taskList.map((item: any) => (
                <TaskIcon key={item.id} id={item.id} name={item.name} status={true} />
              ))}
            </div>
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
    id: state.userReducer.id,
    lists: state.userReducer.lists,
    lastListId: state.userReducer.lastListId,
  };
}

export default connect(mapStateToProps)(withRouter(YourTasks));
