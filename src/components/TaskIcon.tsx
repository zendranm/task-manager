import * as React from 'react';

interface Props {
  id: number;
  name: string;
  status: boolean;
}

class TaskIcon extends React.Component<Props> {
  render() {
    return (
      <div className="TaskIcon">
        {this.props.name} <br />
      </div>
    );
  }
}

export default TaskIcon;
