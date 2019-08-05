import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskIcon from './TaskIcon';

interface Props {
  id: string;
  name: string;
  tasks: Array<any>;
}

class TaskColumn extends React.Component<Props> {
  render() {
    return (
      <div className="taskcolumn-column">
        {this.props.name}
        <Droppable droppableId={this.props.id}>
          {(provided: any, snapshot: any) => (
            <div
              className="taskcolumn-list"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {this.props.tasks.map((item: any, index: number) => (
                <TaskIcon key={item.firebaseId} id={item.taskId} name={item.name} index={index} />
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
