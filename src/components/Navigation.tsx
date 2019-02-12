import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl, faCogs, faInfoCircle, faHome, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { userModel } from '../models/userModel';

library.add(faListUl, faCogs, faInfoCircle, faHome, faUserTie);

interface Props {
  firstName: string;
  secondName: string;
}

class Navigation extends React.Component<Props> {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row className="row-navigation">
            <Col className="col-navigation" xl={2} lg={2} md={2} xs={2}>
              <Link to="/">
                <div className="div-navigation">
                  <p>
                    <FontAwesomeIcon icon="home" size="1x" />
                    &nbsp; Home
                  </p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={2} lg={2} md={2} xs={2}>
              <Link to="/yourlists">
                <div className="div-navigation">
                  <p>
                    <FontAwesomeIcon icon="list-ul" size="1x" />
                    &nbsp; Your List
                  </p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={2} lg={2} md={2} xs={2}>
              <Link to="/about">
                <div className="div-navigation">
                  <p>
                    <FontAwesomeIcon icon="info-circle" size="1x" />
                    &nbsp; About
                  </p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={2} lg={2} md={2} xs={2}>
              <Link to="/settings">
                <div className="div-navigation">
                  <p>
                    <FontAwesomeIcon icon="cogs" size="1x" />
                    &nbsp; Settings
                  </p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={4} lg={4} md={4} xs={4}>
              <Link to="/user">
                <div className="div-navigation">
                  <b>
                    <FontAwesomeIcon icon="user-tie" size="1x" />
                    &nbsp; {this.props.firstName}
                    &nbsp;
                    {this.props.secondName}
                  </b>
                </div>
              </Link>
            </Col>
          </Row>
        </Grid>
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
