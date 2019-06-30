import '../styles/Navigation.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faInfoCircle, faHome, faUserTie, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../actions/userActions';

library.add(faListUl, faInfoCircle, faHome, faUserTie, faSignOutAlt);

interface Props {
  username: string;
  isLogged: boolean;
  signOut: () => void;
}

class Navigation extends React.Component<Props> {
  render() {
    return (
      <div className="navigation">
        <div className="navigation-bar">
          <div className="navigation-options">
            {this.props.isLogged == true ? (
              <Link to="/yourlists">
                <div className="navigation-div">
                  <FontAwesomeIcon icon="list-ul" size="1x" />
                  &nbsp; Your List
                </div>
              </Link>
            ) : (
              <Link to="/">
                <div className="navigation-div">
                  <FontAwesomeIcon icon="home" size="1x" />
                  &nbsp; Home
                </div>
              </Link>
            )}
            <Link to="/about">
              <div className="navigation-div">
                <FontAwesomeIcon icon="info-circle" size="1x" />
                &nbsp; About
              </div>
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
              <button className="navigation-button" onClick={this.props.signOut}>
                <FontAwesomeIcon icon="sign-out-alt" size="1x" />
                &nbsp; Log Out
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <div className="navigation-div">
                <FontAwesomeIcon icon="user-tie" size="1x" />
                &nbsp; Sign In
              </div>
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
)(Navigation);
