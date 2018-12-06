export const FIELD_HEIGHT = 20;
export const FIELD_WIDTH = 10;

export const field = [];

/**
 * Initialize Field
 */
export function initialize() {
  for (let i = 0; i < FIELD_HEIGHT; i++) {
    field[i] = new Array(FIELD_WIDTH);
    for (let j = 0; j < FIELD_WIDTH; j++) {
      field[i][j] = 0;
    }
  }
}

initialize();

export default {
  field,
  FIELD_HEIGHT,
  FIELD_WIDTH,
  initialize,
};
