import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllTasks } from '../queries/tasks';
// import TaskIcon from './TaskIcon';
import { ScaleLoader } from 'react-spinners';
import TaskColumn from './TaskColumn';
import { DragDropContext } from 'react-beautiful-dnd';

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
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllTasks(this.props.id, this.props.match.params.name);
    this.setState({ taskList: newList, isDataReady: true });
  }

  onDragEnd = (result: any) => {};

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="taskcolumn-container">
              <TaskColumn id="column1" name="To Do" tasks={this.state.taskList} />
              <TaskColumn id="column2" name="Done" tasks={this.state.taskList} />
            </div>
          </DragDropContext>
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
