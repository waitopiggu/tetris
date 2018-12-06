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
  },
  {
    name: 'J',
    piece: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
  },
  {
    name: 'L',
    piece: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
  },
  {
    name: 'O',
    piece: [
      [1, 1],
      [1, 1],
    ],
    size: 2,
  },
  {
    name: 'S',
    piece: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    size: 3,
  },
  {
    name: 'T',
    piece: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
  },
  {
    name: 'Z',
    piece: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    size: 3,
  },
];

/**
 * Rotate Tetromino
 * @param {any} tetromino
 * @param {boolean} counterClockwise
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
  tetrominos,
  rotate,
};
