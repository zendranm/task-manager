import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskIcon from './TaskIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { addTask } from '../queries/tasks';
import { taskModel } from '../models/MyTypes';

library.add(faPlus);

interface Props {
  id: string;
  name: string;
  tasks: Array<taskModel>;
  userId: string;
  listFirestoreId: string;
  lastTaskId: number;
  afterNewTaskAdded: (newTask: taskModel) => void;
  afterTaskDeleted: (taskId: number) => void;
}

interface State {
  isAddClicked: boolean;
  newTask: taskModel;
}

class TaskColumn extends React.Component<Props, State> {
  node: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isAddClicked: false,
      newTask: { firestoreId: '', taskId: this.props.lastTaskId, name: '' },
    };
    this.onAddTaskClick = this.onAddTaskClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  }

  async onAddTaskClick() {
    const newFirestoreId = await addTask(this.props.userId, this.props.listFirestoreId, this.state.newTask);
    let taskToAdd: taskModel = this.state.newTask;
    taskToAdd.firestoreId = newFirestoreId;
    this.props.afterNewTaskAdded(taskToAdd);
    this.setState({ newTask: { firestoreId: '', taskId: 0, name: '' } });
  }

  handleOutsideClick = (e: any) => {
    if (!this.node.contains(e.target)) {
      this.setState({ isAddClicked: false });
    }
  };

  render() {
    return (
      <div className="taskcolumn-column" ref={node => (this.node = node)}>
        {this.props.name == 'To Do' ? (
          <div>
            {!this.state.isAddClicked ? (
              <div className="taskcolumn-header">
                <div />
                <div className="taskcolumn-title">{this.props.name}</div>
                <div className="taskcolumn-button" onClick={() => this.setState({ isAddClicked: true })}>
                  <FontAwesomeIcon icon="plus" size="2x" />
                </div>
              </div>
            ) : (
              <div className="taskcolumn-new-task">
                <input
                  id="task-name"
                  value={this.state.newTask.name}
                  type="text"
                  onChange={e =>
                    this.setState({ newTask: { firestoreId: '', taskId: this.props.lastTaskId, name: e.target.value } })
                  }
                  placeholder="New task..."
                  autoFocus
                />
                <button id="addbutton" className="listicon-button-add" onClick={this.onAddTaskClick}>
                  Add
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="taskcolumn-title">{this.props.name}</div>
        )}

        <Droppable droppableId={this.props.id}>
          {(provided: any) => (
            <div
              className="taskcolumn-list"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.props.tasks.map((item: taskModel, index: number) => (
                <TaskIcon
                  key={item.taskId}
                  taskId={item.taskId}
                  firestoreId={item.firestoreId}
                  listFirestoreId={this.props.listFirestoreId}
                  name={item.name}
                  index={index}
                  afterTaskDeleted={this.props.afterTaskDeleted}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default TaskColumn;
