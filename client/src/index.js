import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducers } from './store/reducers';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';
import { toast, Zoom } from 'react-toastify';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, createLogger({ collapsed: true })];

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middleware)));

toast.configure({
  toastClassName: 'toast_container',
  transition: Zoom,
});

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
  <CookiesProvider>
    <App />
  </CookiesProvider>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
