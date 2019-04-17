import * as React from 'react';
import { getAllTasks } from '../queries/queries';
import TaskIcon from './TaskIcon';

interface Props {
  match: any;
}

interface State {
  taskList: any;
  isDataReady: boolean;
}

class YourTasks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskList: null,
      isDataReady: false,
    };
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllTasks(this.props.match.params.name);
    this.setState({ taskList: newList, isDataReady: true });
  }

  render() {
    return (
      <div>
        {this.props.match.params.name} <br />
        {this.state.isDataReady ? (
          <div>
            {this.state.taskList.map((item: any) => (
              <TaskIcon key={item.id} id={item.id} name={item.name} status={true} />
            ))}
          </div>
        ) : (
          <div>Not ready</div>
        )}
      </div>
    );
  }
}

export default YourTasks;
