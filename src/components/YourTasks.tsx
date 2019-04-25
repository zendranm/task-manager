import * as React from 'react';
import { getAllTasks, addTask } from '../queries/queries';
import TaskIcon from './TaskIcon';
import { ScaleLoader } from 'react-spinners';

interface Props {
  match: any;
}

interface State {
  taskList: any;
  isDataReady: boolean;
  lastTaskId: number;
  taskName: string;
}

class YourTasks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      taskList: null,
      isDataReady: false,
      lastTaskId: 0,
      taskName: '',
    };
    this.onAddTask = this.onAddTask.bind(this);
  }

  async componentDidMount() {
    let newList: any = new Array();
    newList = await getAllTasks(this.props.match.params.name);
    this.setState({ taskList: newList, isDataReady: true, lastTaskId: newList[0].id });
  }

  onAddTask() {
    let newTask = { ID: this.state.lastTaskId + 1, Name: this.state.taskName, Priority: false, Status: true };
    addTask(newTask, this.props.match.params.name);
    this.setState(state => ({ lastTaskId: state.lastTaskId + 1 }));
  }

  render() {
    return (
      <div>
        {this.state.isDataReady ? (
          <div>
            <div className="TaskNavBar">
              <div className="TaskNavOption">Priority</div>
              <div className="TaskNavOption">To Do</div>
              <div className="TaskNavOption">Done</div>
            </div>
            <div className="AddTaskInput">
              <input
                type="text"
                placeholder="Type your task..."
                onChange={e => this.setState({ taskName: e.target.value })}
              />
              <button id="addbutton" className="confirmbutton" onClick={this.onAddTask}>
                Add
              </button>
            </div>
            <div>
              {this.state.taskList.map((item: any) => (
                <TaskIcon key={item.id} id={item.id} name={item.name} status={true} />
              ))}
            </div>
          </div>
        ) : (
          <div className="loader">
            <ScaleLoader height={135} width={10} margin={'10px'} radius={2} color={'#333333'} loading={true} />
          </div>
        )}
      </div>
    );
  }
}

export default YourTasks;
