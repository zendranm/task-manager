import * as React from 'react';

interface Props {
  isToAdd: Boolean;
  name: String;
}

interface State {
  isBeingModified: Boolean;
}

class ListIcon extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isBeingModified: false,
    };
  }
  render() {
    return (
      <div>
        {this.props.isToAdd ? (
          <div>
            {this.state.isBeingModified ? (
              <div className="listicon">Add something here !!!!!!!</div>
            ) : (
              <div
                className="listicon"
                onClick={() => {
                  this.setState(() => {
                    return {
                      isBeingModified: true,
                    };
                  });
                }}
              >
                {this.props.name}
              </div>
            )}
          </div>
        ) : (
          <div className="listicon">{this.props.name}</div>
        )}
      </div>
    );
  }
}

export default ListIcon;
