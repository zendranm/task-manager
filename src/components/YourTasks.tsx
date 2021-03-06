import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getListFirestoreId, getAllTasks, getTodoTasksOrder, getDoneTasksOrder, saveNewOrders } from '../queries/tasks';
import { ScaleLoader } from 'react-spinners';
import TaskColumn from './TaskColumn';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { taskModel } from '../models/MyTypes';

interface Props {
  match: any;
  id: string;
}

interface State {
  listFirestoreId: string;
  isDataReady: boolean;
  columns: Array<any>;
  tasks: Array<taskModel>;
  lastTaskId: number;
}

class YourTasks extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      listFirestoreId: '',
      isDataReady: false,
      columns: [],
      tasks: [],
      lastTaskId: 0,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
    this.separateTasks = this.separateTasks.bind(this);
    this.afterNewTaskAdded = this.afterNewTaskAdded.bind(this);
    this.afterTaskDeleted = this.afterTaskDeleted.bind(this);
  }

  async componentDidMount() {
    const newListFirestoreId: string = await getListFirestoreId(this.props.id, this.props.match.params.name);
    this.setState({ listFirestoreId: newListFirestoreId });
    const newTaskList: Array<taskModel> = await getAllTasks(this.props.id, this.state.listFirestoreId);
    const todoTasksOrder = await getTodoTasksOrder(this.props.id, this.state.listFirestoreId);
    const doneTasksOrder = await getDoneTasksOrder(this.props.id, this.state.listFirestoreId);
    let newLastTaskId;
    if (todoTasksOrder.length == 0 && doneTasksOrder.length == 0) {
      newLastTaskId = 0;
    } else {
      newLastTaskId = Math.max.apply(null, todoTasksOrder.concat(doneTasksOrder));
    }
    this.separateTasks(newTaskList, todoTasksOrder, doneTasksOrder);
    this.setState({ isDataReady: true, tasks: newTaskList, lastTaskId: newLastTaskId + 1 });
  }

  separateTasks(taskList: Array<taskModel>, todoTasksOrder: Array<number>, doneTasksOrder: Array<number>) {
    let todoList: any = [];
    let doneList: any = new Array();

    todoTasksOrder.map((index: number) => {
      const taskToPush = taskList.find(task => task.taskId == index);
      todoList.push(taskToPush);
    });

    doneTasksOrder.map((index: number) => {
      const taskToPush = taskList.find(task => task.taskId == index);
      doneList.push(taskToPush);
    });

    this.setState({
      columns: [
        { id: 'column1', name: 'To Do', tasks: todoList, order: todoTasksOrder },
        { id: 'column2', name: 'Done', tasks: doneList, order: doneTasksOrder },
      ],
    });
  }

  afterNewTaskAdded(newTask: taskModel) {
    const todoColumn = this.state.columns.find(column => column.id == 'column1');
    let newOrder: Array<number> = Array.from(todoColumn.order);
    newOrder.unshift(this.state.lastTaskId);
    saveNewOrders(this.props.id, this.state.listFirestoreId, newOrder, undefined);

    const newTasks = Array.from(todoColumn.tasks);
    newTasks.unshift(newTask);

    const newColumn = {
      ...todoColumn,
      tasks: newTasks,
      order: newOrder,
    };

    let newColumns = this.state.columns;
    const index = this.state.columns.indexOf(todoColumn);
    newColumns[index] = newColumn;
    this.setState(prevState => {
      return { columns: newColumns, lastTaskId: prevState.lastTaskId + 1 };
    });
  }

  afterTaskDeleted(taskId: number) {
    const todoColumn = this.state.columns.find(column => column.id == 'column1');
    const doneColumn = this.state.columns.find(column => column.id == 'column2');
    if (todoColumn.order.includes(taskId)) {
      const newOrder: Array<number> = Array.from(todoColumn.order);
      newOrder.splice(todoColumn.order.indexOf(taskId), 1);
      saveNewOrders(this.props.id, this.state.listFirestoreId, newOrder, undefined);

      const newTasks = Array.from(todoColumn.tasks);
      newTasks.splice(todoColumn.order.indexOf(taskId).index, 1);

      const newColumn = {
        ...todoColumn,
        tasks: newTasks,
        order: newOrder,
      };

      let newColumns = this.state.columns;
      const index = this.state.columns.indexOf(todoColumn);
      newColumns[index] = newColumn;
      this.setState({ columns: newColumns });
    } else {
      const newOrder: Array<number> = Array.from(doneColumn.order);
      newOrder.splice(doneColumn.order.indexOf(taskId), 1);
      saveNewOrders(this.props.id, this.state.listFirestoreId, undefined, newOrder);

      const newTasks = Array.from(doneColumn.tasks);
      newTasks.splice(doneColumn.order.indexOf(taskId).index, 1);

      const newColumn = {
        ...doneColumn,
        tasks: newTasks,
        order: newOrder,
      };

      let newColumns = this.state.columns;
      const index = this.state.columns.indexOf(doneColumn);
      newColumns[index] = newColumn;
      this.setState({ columns: newColumns });
    }
  }

  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startColumn = this.state.columns.find(column => column.id == source.droppableId);
    const finishColumn = this.state.columns.find(column => column.id == destination.droppableId);

    if (startColumn.id == finishColumn.id) {
      const newTasks = Array.from(startColumn.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(
        destination.index,
        0,
        startColumn.tasks.find((task: taskModel) => task.taskId.toString() == draggableId)
      );
      const newOrder: Array<number> = Array.from(startColumn.order);
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, Number(draggableId));

      if (startColumn.id == 'column1') {
        saveNewOrders(this.props.id, this.state.listFirestoreId, newOrder, undefined);
      } else {
        saveNewOrders(this.props.id, this.state.listFirestoreId, undefined, newOrder);
      }

      const newColumn = {
        ...startColumn,
        tasks: newTasks,
        order: newOrder,
      };

      let newColumns = this.state.columns;
      const index = this.state.columns.indexOf(finishColumn);
      newColumns[index] = newColumn;
      this.setState({ columns: newColumns });
    } else {
      const startTasks = Array.from(startColumn.tasks);
      startTasks.splice(source.index, 1);
      const newStartOrder: Array<number> = Array.from(startColumn.order);
      newStartOrder.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        tasks: startTasks,
        order: newStartOrder,
      };

      const finishTasks = Array.from(finishColumn.tasks);
      let draggedTask = startColumn.tasks.find((task: taskModel) => task.taskId.toString() == draggableId);

      finishTasks.splice(destination.index, 0, draggedTask);
      const newFinishOrder: Array<number> = Array.from(finishColumn.order);
      newFinishOrder.splice(destination.index, 0, Number(draggableId));
      const newFinishColumn = {
        ...finishColumn,
        tasks: finishTasks,
        order: newFinishOrder,
      };

      if (startColumn.id == 'column1') {
        saveNewOrders(this.props.id, this.state.listFirestoreId, newStartOrder, newFinishOrder);
      } else {
        saveNewOrders(this.props.id, this.state.listFirestoreId, newFinishOrder, newStartOrder);
      }

      let newColumns = this.state.columns;
      const indexStart = this.state.columns.indexOf(startColumn);
      const indexFinish = this.state.columns.indexOf(finishColumn);
      newColumns[indexStart] = newStartColumn;
      newColumns[indexFinish] = newFinishColumn;
      this.setState({ columns: newColumns });
    }
  };

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="taskcolumn-container">
              {this.state.columns.map((column: any) => (
                <TaskColumn
                  key={column.id}
                  id={column.id}
                  name={column.name}
                  tasks={column.tasks}
                  userId={this.props.id}
                  listFirestoreId={this.state.listFirestoreId}
                  lastTaskId={this.state.lastTaskId}
                  afterNewTaskAdded={this.afterNewTaskAdded}
                  afterTaskDeleted={this.afterTaskDeleted}
                />
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
