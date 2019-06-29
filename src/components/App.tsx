import * as React from 'react';
import Navigation from './Navigation';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Signin from './Signin';
import YourLists from './YourLists';
import User from './User';
import About from './About';
import YourTasks from './YourTasks';

import { onAuthStateChanged } from '../queries/auth';

interface Props {}

interface State {
  authUser: any;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    console.log(onAuthStateChanged());
    this.setState({ authUser: onAuthStateChanged() });
  }

  render() {
    return (
      <div>
        <Navigation authUser={this.state.authUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/yourlists" component={YourLists} />
          <Route exact path="/user" component={User} />
          <Route exact path="/about" component={About} />
          <Route exact path="/yourlists/:name" component={YourTasks} />
        </Switch>
      </div>
    );
  }
}

export default App;
