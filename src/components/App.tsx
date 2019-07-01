import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import Home from './Home';
import Signin from './Signin';
import YourLists from './YourLists';
import User from './User';
import About from './About';
import YourTasks from './YourTasks';

interface Props {
  isLogged: boolean;
}

const PrivateRoute = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) =>
    isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/signin' }} />;
  return <Route {...rest} render={routeComponent} />;
};

class App extends React.Component<Props> {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <PrivateRoute path="/yourlists" isAuthenticated={this.props.isLogged} component={YourLists} />
          <Route exact path="/user" component={User} />
          <Route exact path="/about" component={About} />
          <Route exact path="/yourlists/:name" component={YourTasks} />
        </Switch>
      </div>
    );
  }
}

function mapPropsToState(state: any) {
  return {
    isLogged: state.userReducer.isLogged,
  };
}

export default connect(mapPropsToState)(App);
