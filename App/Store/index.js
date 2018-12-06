import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as keymap } from './keymap';

export const store = createStore(
  combineReducers({
    keymap,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);
