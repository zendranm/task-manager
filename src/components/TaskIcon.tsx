import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  id: number;
  index: number;
  name: string;
}

class TaskIcon extends React.Component<Props> {
  render() {
    return (
      <div>
        <Draggable draggableId={this.props.id.toString()} index={this.props.index} isDragDisabled={false}>
          {(provided: any, snapshot: any) => (
            <div
              className="taskicon"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isdragging={snapshot.isDragging.toString()}
              isdragdisabled="false"
            >
              {this.props.name}
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}

export default TaskIcon;
