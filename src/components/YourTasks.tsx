import * as React from 'react';

interface Props {
  match: any;
}

class YourTasks extends React.Component<Props> {
  render() {
    return (
      <div>
        {this.props.match.params.name} <br />
        Todo: <br />
        1.Sortować listy przy wczytywaniu po dacie dodania albo parametrze jakimś
        <br />
        2.Dodać do bazy zadań taski
        <br />
        3.Dodać alerty przy usuwaninu czy na pewno
      </div>
    );
  }
}

export default YourTasks;
