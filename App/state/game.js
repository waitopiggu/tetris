import { env } from '../lib';

export const actionTypes = {
  GAME_START: 'GAME_START',
  GAME_STOP: 'GAME_STOP',
};

export const actions = {
  start: level => ({
    payload: { level },
    type: actionTypes.GAME_START,
  }),
  stop: () => ({
    type: actionTypes.GAME_STOP,
  }),
};

const initialState = {
  running: false,
  speed: env.speed[0],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GAME_START: {
      const { level } = action.payload;
      return {
        ...initialState,
        running: true,
        speed: env.speed[level || 0],
      };
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
