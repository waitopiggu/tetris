export const actionTypes = {
  GAME_START: 'GAME_START',
  GAME_STOP: 'GAME_STOP',
  GAME_UPDATE_SCORE: 'GAME_UPDATE_SCORE',
};

export const actions = {
  start: level => ({
    payload: { level },
    type: actionTypes.GAME_START,
  }),
  stop: () => ({
    type: actionTypes.GAME_STOP,
  }),
  updateScore: lines => ({
    type: actionTypes.GAME_UPDATE_SCORE,
    payload: { lines },
  }),
};

const initialState = {
  level: 0,
  running: false,
  score: 0,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GAME_START: {
      const { level } = action.payload;
      return {
        ...initialState,
        level: level || 0,
        running: true,
      };
    }
    case actionTypes.GAME_STOP: {
      return { ...state, running: false };
    }
    case actionTypes.GAME_UPDATE_SCORE: {
      const { lines } = action.payload;
      const n = state.level + 1;
      let { score } = state;
      if (lines.length === 1) {
        score += n * 40;
      }
      if (lines.length === 2) {
        score += n * 100;
      }
      if (lines.length === 3) {
        score += n * 300;
      }
      if (lines.length === 4) {
        score += n * 1200;
      }
      return { ...state, score };
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
