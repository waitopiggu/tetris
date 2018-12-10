export const tetrominos = [
  {
    color: 'cyan',
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
    color: 'blue',
    name: 'J',
    piece: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    color: 'orange',
    name: 'L',
    piece: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    color: 'yellow',
    name: 'O',
    piece: [
      [1, 1],
      [1, 1],
    ],
    size: 2,
    spawn: [0, 4],
  },
  {
    color: 'green',
    name: 'S',
    piece: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    color: 'purple',
    name: 'T',
    piece: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
    spawn: [0, 3],
  },
  {
    color: 'red',
    name: 'Z',
    piece: [
      [1, 1, 0],
      [0, 1, 1],
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
  return tetrominos[index];
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
  getRandom,
  rotate,
  tetrominos,
};
