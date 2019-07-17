import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/Main.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { HashRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { auth } from './firebase';
import App from './components/App';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

auth.onAuthStateChanged((authUser: any) => {
  if (authUser != null) {
    store.dispatch({ type: 'CHANGE_IS_LOGGED', isLogged: true });
    store.dispatch({ type: 'CHANGE_EMAIL', email: authUser.email });
  } else {
    store.dispatch({ type: 'CHANGE_IS_LOGGED', isLogged: false });
    store.dispatch({ type: 'CHANGE_EMAIL', email: '' });
  }
});

// persistor.purge();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
