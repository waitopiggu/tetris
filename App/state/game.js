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
  level: 0,
  running: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GAME_START: {
      const { level } = action.payload;
      return {
        level: level || 0,
        running: true,
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
