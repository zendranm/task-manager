import '../styles/Navigation.scss';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faInfoCircle, faHome, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { userModel } from '../models/userModel';

library.add(faListUl, faInfoCircle, faHome, faUserTie);

interface Props {
  firstName: string;
  secondName: string;
}

class Navigation extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className="navigation-bar">
          <div className="navigation-options">
            <Link to="/">
              <div className="navigation-div">
                <FontAwesomeIcon icon="home" size="1x" />
                &nbsp; Home
              </div>
            </Link>
            <Link to="/yourlists">
              <div className="navigation-div">
                <FontAwesomeIcon icon="list-ul" size="1x" />
                &nbsp; Your List
              </div>
            </Link>
            <Link to="/about">
              <div className="navigation-div">
                <FontAwesomeIcon icon="info-circle" size="1x" />
                &nbsp; About
              </div>
            </Link>
          </div>
          <Link to="/user">
            <div className="navigation-div">
              <FontAwesomeIcon icon="user-tie" size="1x" />
              &nbsp; {this.props.firstName}
              &nbsp;
              {this.props.secondName}
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

function mapPropsToState(state: any): userModel {
  return {
    firstName: state.userReducer.firstName,
    secondName: state.userReducer.secondName,
    lists: state.userReducer.lists,
    lastListId: state.userReducer.lastListId,
  };
}

export default connect(mapPropsToState)(Navigation);
