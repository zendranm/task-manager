import '../styles/Navigation.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeUsername, changeLists } from '../actions/userActions';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faListUl,
  faInfoCircle,
  faHome,
  faUserTie,
  faSignOutAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../queries/auth';

library.add(faListUl, faInfoCircle, faHome, faUserTie, faSignOutAlt, faSignInAlt);

interface Props {
  history: any;
  username: string;
  isLogged: boolean;
  signOut: () => void;
  onUsernameChange: any;
  onChangeLists: any;
  onChangeIsLogged: any;
}

class Navigation extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="navigation">
        <div className="navigation-bar">
          <div className="navigation-flex">
            {this.props.isLogged == true ? (
              <Link to="/yourlists">
                <button className="navigation-flex navigation-button">
                  <FontAwesomeIcon icon="list-ul" size="1x" />
                  <div className="navigation-label">Your List</div>
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="navigation-flex navigation-button">
                  <FontAwesomeIcon icon="home" size="1x" />
                  <div className="navigation-label">Home</div>
                </button>
              </Link>
            )}
            <Link to="/about">
              <button className="navigation-flex navigation-button">
                <FontAwesomeIcon icon="info-circle" size="1x" />
                <div className="navigation-label">About</div>
              </button>
            </Link>
          </div>

          {this.props.isLogged == true ? (
            <div className="navigation-flex">
              <Link to="/user">
                <button className="navigation-flex navigation-button">
                  <FontAwesomeIcon icon="user-tie" size="1x" />
                  <div className="navigation-label">{this.props.username}</div>
                </button>
              </Link>
              <button
                className="navigation-flex navigation-button"
                onClick={async () => {
                  await signOut();
                  this.props.onUsernameChange('');
                  this.props.onChangeLists(null);
                  this.props.history.push('/');
                }}
              >
                <FontAwesomeIcon icon="sign-out-alt" size="1x" />
                <div className="navigation-label">Log Out</div>
              </button>
            </div>
          ) : (
            <Link to="/signin">
              <button className="navigation-flex navigation-button">
                <FontAwesomeIcon icon="sign-in-alt" size="1x" />
                <div className="navigation-label">Sign In</div>
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    username: state.userReducer.username,
    isLogged: state.userReducer.isLogged,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    onUsernameChange: (value: string) => {
      dispatch(changeUsername(value));
    },
    onChangeLists: (value: Array<any>) => {
      dispatch(changeLists(value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navigation));
