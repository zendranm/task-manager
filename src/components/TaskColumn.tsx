import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskIcon from './TaskIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

interface Props {
  id: string;
  name: string;
  tasks: Array<any>;
}

interface State {
  isAddClicked: boolean;
}

class TaskColumn extends React.Component<Props, State> {
  node: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isAddClicked: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
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
              <div>BBB</div>
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
