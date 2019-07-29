import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllTasks } from '../queries/tasks';
// import TaskIcon from './TaskIcon';
import { ScaleLoader } from 'react-spinners';
import TaskColumn from './TaskColumn';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface Props {
  match: any;
  id: string;
}

interface State {
  taskListTodo: Array<any>;
  taskListDone: Array<any>;
  isDataReady: boolean;
}

class YourTasks extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      taskListTodo: [],
      taskListDone: [],
      isDataReady: false,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.separateTasks = this.separateTasks.bind(this);
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllTasks(this.props.id, this.props.match.params.name);
    this.separateTasks(newList);
    this.setState({ isDataReady: true });
  }

  separateTasks(taskList: Array<any>) {
    let todoList: any = new Array();
    let doneList: any = new Array();

    taskList.map((task: any) => {
      if (task.status == 'todo') {
        todoList.push(task);
      } else {
        doneList.push(task);
      }
    });
    this.setState({ taskListTodo: todoList, taskListDone: doneList });
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
  };

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="taskcolumn-container">
              <TaskColumn id="column1" droppableId={'droppableId-1'} name="To Do" tasks={this.state.taskListTodo} />
              <TaskColumn id="column2" droppableId={'droppableId-2'} name="Done" tasks={this.state.taskListDone} />
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
