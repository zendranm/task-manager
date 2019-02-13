import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import YourLists from './YourLists';
import User from './User';
import About from './About';
import YourTasks from './YourTasks';

class Container extends React.Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={YourLists} />
          <Route exact path="/yourlists" component={YourLists} />
          <Route path="/user" component={User} />
          <Route path="/about" component={About} />
          <Route exact path="/yourtasks" component={YourTasks} />
        </Switch>
      </div>
    );
  }
}

export default Container;
