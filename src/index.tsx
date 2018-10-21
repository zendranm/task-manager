import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { HashRouter } from 'react-router-dom';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import './styles/main.css';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(middleware)));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
