import { env } from '../lib';
import { game } from '.';

export const actionTypes = {
  FIELD_INIT: 'FIELD_INIT',
  FIELD_PLACE_BLOCK: 'FIELD_PLACE_BLOCK',
};

export const actions = {
  init: () => ({
    type: actionTypes.FIELD_INIT,
  }),
  placeBlock: (block, position) => ({
    type: actionTypes.FIELD_PLACE_BLOCK,
    payload: { block, position },
  }),
};

const initialState = Array(env.field.rows).fill(Array(env.field.cols).fill(0));

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FIELD_INIT:
    case game.actionTypes.GAME_START: {
      return state.map(row => row.map(() => 0));
    }
    case actionTypes.FIELD_PLACE_BLOCK: {
      const { block, position } = action.payload;
      const field = state.map(row => row.map(col => col));
      block.forEach((row, i) => row.forEach((col, j) => {
        if (col !== 0) {
          field[i + position.row][j + position.col] = col;
        }
      }));
      return field;
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
