import React from 'react';
import ReactDOM from 'react-dom';
import Store from './Store';
import Game from './Game';

ReactDOM.render(
  <React.Fragment>
    <Store>
      <Game />
    </Store>
  </React.Fragment>,
  document.getElementById('app'),
);
