/* eslint-env node, browser */

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './index.css';
import ShopContainer from './containers/ShopContainer';
import registerServiceWorker from './registerServiceWorker';
import shopApp from './reducers';

const initStore = (preloadedState = {}) => {
  const logger = createLogger();
  const middleware = [thunk, logger];
  const store = createStore(
    shopApp,
    preloadedState,
    applyMiddleware(...middleware)
  );
  return store;
};

const store = initStore();

const mainComponent = (
  <Provider store={store}>
    <ShopContainer />
  </Provider>
);

ReactDOM.render(mainComponent, document.getElementById('root'));
registerServiceWorker();
