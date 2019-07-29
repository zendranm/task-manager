import * as React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  id: string;
  name: string;
}

class TaskIcon extends React.Component<Props> {
  render() {
    return (
      <div className="TaskIcon">
        <Draggable
          draggableId={this.props.id}
          index={0} //Change for real number
          isDragDisabled={false}
        >
          {(provided: any, snapshot: any) => (
            <div
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
