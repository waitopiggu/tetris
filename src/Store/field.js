export const actionTypes = {
  FIELD_INITIALIZE: 'FIELD_INITIALIZE',
  FIELD_UPDATE: 'FIELD_UPDATE',
};

const FIELD_COLS = 10;
const FIELD_ROWS = 20;

const initialState = Array(FIELD_ROWS).fill(Array(FIELD_COLS).fill(0));

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FIELD_INITIALIZE: {
      return initialState;
    }
    case actionTypes.FIELD_UPDATE: {
      const { field } = action.payload;
      return field;
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
