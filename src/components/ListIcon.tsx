import * as React from 'react';
import { connect } from 'react-redux';

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
              <div className="listicon">
                New list:
                <br />
                <input type="text" />
              </div>
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

function mapPropsToState(state: any) {
  return {
    lists: state.userReducer.lists,
  };
}

export default connect(mapPropsToState)(ListIcon);
