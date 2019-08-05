import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getAllTasks } from '../queries/tasks';
import { ScaleLoader } from 'react-spinners';
import TaskColumn from './TaskColumn';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface Props {
  match: any;
  id: string;
}

interface State {
  isDataReady: boolean;
  columns: Array<any>;
}

class YourTasks extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDataReady: false,
      columns: [],
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
    this.setState({
      columns: [{ id: 'column1', name: 'To Do', tasks: todoList }, { id: 'column2', name: 'Done', tasks: doneList }],
    });
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = this.state.columns.find(column => column.id == source.droppableId);
    const finish = this.state.columns.find(column => column.id == destination.droppableId);

    if (start.id == finish.id) {
      const newTasks = Array.from(start.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, start.tasks.find((task: any) => task.taskId == draggableId));

      const newColumn = {
        ...start,
        tasks: newTasks,
      };

      let newColumns = this.state.columns;
      const index = this.state.columns.indexOf(finish);
      newColumns[index] = newColumn;
      this.setState({ columns: newColumns });

      return;
    } else {
      const startTasks = Array.from(start.tasks);
      startTasks.splice(source.index, 1);
      const newStartColumn = {
        ...start,
        tasks: startTasks,
      };

      const finishTasks = Array.from(finish.tasks);
      finishTasks.splice(destination.index, 0, start.tasks.find((task: any) => task.taskId == draggableId));
      const newFinishColumn = {
        ...finish,
        tasks: finishTasks,
      };

      let newColumns = this.state.columns;
      const indexStart = this.state.columns.indexOf(start);
      const indexFinish = this.state.columns.indexOf(finish);
      newColumns[indexStart] = newStartColumn;
      newColumns[indexFinish] = newFinishColumn;
      this.setState({ columns: newColumns });

      return;
    }
  };

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="taskcolumn-container">
              {this.state.columns.map((column: any) => (
                <TaskColumn key={column.id} id={column.id} name={column.name} tasks={column.tasks} />
              ))}
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
