import '../styles/Navigation.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faInfoCircle, faHome, faUserTie, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../actions/userActions';
import { signOut } from '../queries/auth';

library.add(faListUl, faInfoCircle, faHome, faUserTie, faSignOutAlt);

interface Props {
  history: any;
  username: string;
  isLogged: boolean;
  signOut: () => void;
}

class Navigation extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
        <div className="navigation-bar">
          <div className="navigation-options">
            {this.props.isLogged == true ? (
              <Link to="/yourlists">
                <button className="navigation-button">
                  <FontAwesomeIcon icon="list-ul" size="1x" />
                  &nbsp; Your List
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="navigation-button">
                  <FontAwesomeIcon icon="home" size="1x" />
                  &nbsp; Home
                </button>
              </Link>
            )}
            <Link to="/about">
              <button className="navigation-button">
                <FontAwesomeIcon icon="info-circle" size="1x" />
                &nbsp; About
              </button>
            </Link>
          </div>

          {this.props.isLogged == true ? (
            <div className="navigation-options">
              <Link to="/user">
                <button className="navigation-button">
                  <FontAwesomeIcon icon="user-tie" size="1x" />
                  &nbsp; {this.props.username}
                </button>
              </Link>
              <button
                className="navigation-button"
                onClick={() => {
                  signOut();
                  // this.props.history.push('/');
                }}
              >
                <FontAwesomeIcon icon="sign-out-alt" size="1x" />
                &nbsp; Log Out
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <button className="navigation-button">
                <FontAwesomeIcon icon="user-tie" size="1x" />
                &nbsp; Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

function mapPropsToState(state: any) {
  return {
    username: state.userReducer.username,
    isLogged: state.userReducer.isLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    signOut: () => dispatch(logOut()),
  };
}

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withRouter(Navigation));
