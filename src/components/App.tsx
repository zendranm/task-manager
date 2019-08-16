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
import PageNotFound from './PageNotFound';

const withAuth = (
  Component: React.ComponentClass<any, any> | React.StatelessComponent<any>
): React.ComponentClass<any, any> | React.StatelessComponent<any> => {
  function Protected({ isLogged, ...rest }: any) {
    return isLogged ? <Component {...rest} /> : <Redirect to={{ pathname: '/signin' }} />;
  }

  return connect((state: any) => ({ isLogged: state.userReducer.isLogged }))(Protected);
};

const ProtectedUser = withAuth(User);
const ProtectedYourLists = withAuth(YourLists);
const ProtectedYourTasks = withAuth(YourTasks);

class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/user" component={ProtectedUser} />
          <Route exact path="/yourlists" component={ProtectedYourLists} />
          <Route exact path="/yourlists/:name" component={ProtectedYourTasks} />
          <Route exact path="/about" component={About} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
