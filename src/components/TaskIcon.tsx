import * as React from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteTask } from '../queries/tasks';

library.add(faTrashAlt, faPencilAlt);

interface Props {
  id: number;
  taskId: number;
  firestoreId: string;
  listFirestoreId: string;
  index: number;
  name: string;
  afterTaskDeleted: (taskId: number) => void;
}

class TaskIcon extends React.Component<Props> {
  onDeleteTask() {
    deleteTask(this.props.id.toString(), this.props.listFirestoreId, this.props.firestoreId);
    this.props.afterTaskDeleted(this.props.taskId);
  }
  render() {
    return (
      <div>
        <Draggable draggableId={this.props.taskId.toString()} index={this.props.index} isDragDisabled={false}>
          {(provided: any, snapshot: any) => (
            <div
              className="taskicon-container"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              isdragging={snapshot.isDragging.toString()}
              isdragdisabled="false"
            >
              <div className="taskicon-leftbox">
                <div className="taskicon-title">{this.props.name}</div>
              </div>
              <div className="taskicon-rightbox">
                {/* <div
                  className="taskicon-pencilicon"
                  onClick={() => {
                    this.setState(() => {
                      return {
                        isBeingModified: true,
                      };
                    });
                  }}
                >
                  <FontAwesomeIcon icon="pencil-alt" size="1x" />
                </div> */}
                <div className="taskicon-deleteicon" onClick={() => this.onDeleteTask()}>
                  <FontAwesomeIcon icon="trash-alt" size="1x" />
                </div>
              </div>
            </div>
          )}
        </Draggable>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    id: state.userReducer.id,
  };
}

export default connect(mapStateToProps)(TaskIcon);
