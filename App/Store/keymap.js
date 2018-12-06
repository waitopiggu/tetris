export const actionTypes = {
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
};

const initialState = {
  left: false,
  right: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case (actionTypes.KEY_DOWN):
    case (actionTypes.KEY_UP): {
      const { payload } = action;
      return { ...state, ...payload };
    }
    default: {
      return state;
    }
  }
}

export default {
  actionTypes,
  reducer,
};
