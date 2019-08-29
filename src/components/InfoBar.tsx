import * as React from 'react';

interface Props {
  type: string;
  content: string;
}

class InfoBar extends React.Component<Props> {
  render() {
    return (
      <div className="infobar">
        {this.props.type == 'error' ? <div className="infobar-error">{this.props.content}</div> : <div />}
      </div>
    );
  }
}

export default InfoBar;
