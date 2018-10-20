import * as React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col } from 'react-flexbox-grid';

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <Grid fluid>
          <Row className="row-navigation">
            <Col className="col-navigation" xl={3} lg={3} md={3} xs={3}>
              <Link to="/">
                <div className="div-navigation">
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={3} lg={3} md={3} xs={3}>
              <Link to="/user">
                <div className="div-navigation">
                  <p>Your List</p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={3} lg={3} md={3} xs={3}>
              <Link to="/about">
                <div className="div-navigation">
                  <p>About</p>
                </div>
              </Link>
            </Col>
            <Col className="col-navigation" xl={3} lg={3} md={3} xs={3}>
              <Link to="/settings">
                <div className="div-navigation">
                  <p>Settings</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Navigation;
