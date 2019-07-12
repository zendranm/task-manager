import * as React from 'react';

interface Props {
  percentage: number;
}

class ProgressBar extends React.Component<Props> {
  render() {
    return (
      <div className="progressbar-frame">
        <Filler percentage={this.props.percentage} />
      </div>
    );
  }
}

const Filler = (props: any) => {
  return <div className="progressbar-bar" style={{ width: `${props.percentage}%` }} />;
};

export default ProgressBar;
