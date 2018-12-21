import { tetrominos, util } from '../lib';
import { field, game } from '.';

export const actionTypes = {
  TETROMINO_INIT: 'TETROMINO_INIT',
  TETROMINO_NEXT: 'TETROMINO_NEXT',
  TETROMINO_UPDATE: 'TETROMINO_UPDATE',
};

export const actions = {
  init: () => ({
    type: actionTypes.TETROMINO_INIT,
  }),
  next: () => ({
    type: actionTypes.TETROMINO_NEXT,
  }),
  update: props => ({
    type: actionTypes.TETROMINO_UPDATE,
    payload: { props },
  }),
};

const initialState = {
  current: null,
  landed: false,
  next: null,
  position: {},
  rotation: 0,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TETROMINO_INIT:
    case game.actionTypes.GAME_START: {
      const current = util.randomItem(tetrominos);
      return {
        ...initialState,
        current,
        next: util.randomItem(tetrominos),
        position: { ...current.position },
      };
    }
    case actionTypes.TETROMINO_NEXT: {
      const { next } = state;
      return {
        ...initialState,
        current: next,
        next: util.randomItem(tetrominos),
        position: { ...next.position },
      };
    }
    case actionTypes.TETROMINO_UPDATE: {
      const { props } = action.payload;
      return { ...state, ...props };
    }
    case field.actionTypes.FIELD_PLACE_BLOCK: {
      return { ...state, landed: true };
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
