import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import field from './field';
import keymap from './keymap';

export const store = createStore(
  combineReducers({
    field: field.reducer,
    keymap: keymap.reducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export {
  field,
  keymap,
};
