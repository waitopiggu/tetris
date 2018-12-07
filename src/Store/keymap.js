export const actionTypes = {
  KEY_DOWN: 'KEY_DOWN',
  KEY_UP: 'KEY_UP',
};

export const KEY_CODE = {
  LEFT: 37,
  RIGHT: 39,
};

const initialState = {
  down: false,
  drop: false,
  left: false,
  right: false,
  rotateLeft: false,
  rotateRight: false,
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
  KEY_CODE,
};
