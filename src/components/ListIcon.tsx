import * as React from 'react';

interface Props {
  name: String;
}

class ListIcon extends React.Component<Props> {
  render() {
    return <div className="listicon">{this.props.name}</div>;
  }
}

export default ListIcon;
