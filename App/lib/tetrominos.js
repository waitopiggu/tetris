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
    spawn: [0, 3],
  },
  {
    name: 'J',
    piece: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    name: 'L',
    piece: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    name: 'O',
    piece: [
      [4, 4],
      [4, 4],
    ],
    size: 2,
    spawn: [0, 4],
  },
  {
    name: 'S',
    piece: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    name: 'T',
    piece: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    name: 'Z',
    piece: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
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
  const rotated = new Array(size);
  for (let i = 0; i < size; i++) {
    rotated[i] = new Array(size);
    for (let j = 0; j < size; j++) {
      rotated[i][j] = counterClockwise
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
