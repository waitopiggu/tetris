import { env } from '../lib';

export const actionTypes = {
  GAME_START: 'GAME_START',
  GAME_STOP: 'GAME_STOP',
};

export const actions = {
  start: () => ({
    type: actionTypes.GAME_START,
  }),
  stop: () => ({
    type: actionTypes.GAME_STOP,
  }),
};

const initialState = {
  running: false,
  speed: env.initialSpeed,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GAME_START: {
      return { ...initialState, running: true };
    }
    case actionTypes.GAME_STOP: {
      return { ...state, running: false };
    }
    default: {
      return state;
    }
  }
}

export default {
  actions,
  actionTypes,
  reducer,
};
