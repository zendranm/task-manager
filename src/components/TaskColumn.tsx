import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskIcon from './TaskIcon';

interface Props {
  id: string;
  droppableId: string;
  name: string;
  tasks: Array<any>;
}

class TaskColumn extends React.Component<Props> {
  render() {
    return (
      <div className="taskcolumn-column">
        {this.props.name}
        <Droppable droppableId={this.props.droppableId}>
          {(provided: any, snapshot: any) => (
            <div
              className="taskcolumn-list"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.props.tasks.map((item: any) => (
                <TaskIcon key={item.firebaseId} id={item.taskId} name={item.name} />
              ))}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default TaskColumn;

{
  /* <div className="taskcolumn-list">
            {this.props.tasks.map((task: any) => (
              <div key={task.id}>{task.name}</div>
            ))}
          </div> */
}
