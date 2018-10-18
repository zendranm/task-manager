import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import UserComponent from './UserComponent';
import AboutComponenet from './AboutComponenet';

const App = () => {
  return (
    <div>
      <p>React here! Can you believe it?</p>
      <Navigation />
      <Switch>
        <Route exact path="/" component={UserComponent} />
        <Route path="/user" component={UserComponent} />
        <Route path="/about" component={AboutComponenet} />
      </Switch>
    </div>
  );
};

export default App;
