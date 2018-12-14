/* eslint no-underscore-dangle: 0 */
import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Game } from './components';
import { field, game, input, tetromino } from './state';

const store = createStore(
  combineReducers({
    field: field.reducer,
    game: game.reducer,
    input: input.reducer,
    tetromino: tetromino.reducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

/**
 * App Component
 */
export default () => (
  <Provider store={store}>
    <Game />
  </Provider>
);
