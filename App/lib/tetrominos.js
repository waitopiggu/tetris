import { cloneDeep } from 'lodash';

export const colors = [
  'dimgray',
  'cyan',
  'dodgerblue',
  'orange',
  'yellow',
  'lightgreen',
  'violet',
  'red',
];

export const tetrominos = [
  {
    name: 'I',
    piece: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    size: 4,
    spawn: {
      x: 3,
      y: 0,
    },
  },
  {
    name: 'J',
    piece: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    size: 3,
    spawn: {
      x: 3,
      y: 0,
    },
  },
  {
    name: 'L',
    piece: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    size: 3,
    spawn: {
      x: 3,
      y: 0,
    },
  },
  {
    name: 'O',
    piece: [
      [4, 4],
      [4, 4],
    ],
    size: 2,
    spawn: {
      x: 4,
      y: 0,
    },
  },
  {
    name: 'S',
    piece: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    size: 3,
    spawn: {
      x: 3,
      y: 0,
    },
  },
  {
    name: 'T',
    piece: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    size: 3,
    spawn: {
      x: 3,
      y: 0,
    },
  },
  {
    name: 'Z',
    piece: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    size: 3,
    spawn: {
      x: 3,
      y: 0,
    },
  },
];

/**
 * Get Random Tetromino
 */
export function getRandom() {
  const { length } = tetrominos;
  const index = Math.floor(Math.random() * length);
  return cloneDeep(tetrominos[index]);
}

/**
 * Rotate Tetromino
 * @param {any} tetromino
 * @param {?boolean} counterClockwise
 */
export function rotate(tetromino, counterClockwise = false) {
  const { piece, size } = tetromino;
  const rotated = cloneDeep(tetromino);
  for (let i = 0; i < size; i++) {
    rotated.piece[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      rotated.piece[i][j] = counterClockwise
        ? piece[j][size - i - 1]
        : piece[size - j - 1][i];
    }
  }
  return rotated;
}

export default {
  colors,
  getRandom,
  rotate,
  tetrominos,
};
