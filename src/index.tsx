import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import App from './components/App';
import './styles/Main.scss';
import { auth } from './firebase';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

auth.onAuthStateChanged((authUser: any) => {
  authUser
    ? store.dispatch({ type: 'CHANGE_IS_LOGGED', isLogged: true })
    : store.dispatch({ type: 'CHANGE_IS_LOGGED', isLogged: false });
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
