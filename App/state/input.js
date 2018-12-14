export const actionTypes = {
  INPUT_KEY_DOWN: 'INPUT_KEY_DOWN',
  INPUT_KEY_UP: 'INPUT_KEY_UP',
};

export const actions = {
  keyDown: key => ({
    type: actionTypes.INPUT_KEY_DOWN,
    payload: { key },
  }),
  keyUp: key => ({
    type: actionTypes.INPUT_KEY_UP,
    payload: { key },
  }),
};

export function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.INPUT_KEY_DOWN: {
      const { key } = action.payload;
      return { ...state, [key]: true };
    }
    case actionTypes.INPUT_KEY_UP: {
      const { key } = action.payload;
      return { ...state, [key]: false };
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
