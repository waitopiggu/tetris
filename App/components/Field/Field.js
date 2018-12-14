import React from 'react';
import { env } from '../../lib';
import styles from './styles';

const { colors } = env;

type Props = {
  field: Array<[]>,
  tetromino: any,
};

/**
 * Field Component
 * @param {Props} props
 */
export default ({ field, tetromino }: Props) => {
  const matrix = field.map(row => row.map(col => col));
  if (tetromino.current) {
    const { current, position, rotation } = tetromino;
    const block = current.rotations[rotation];
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        if (block[i][j] !== 0) {
          matrix[i + position.row][j + position.col] = block[i][j];
        }
      }
    }
  }
  return (
    <table className={styles.table}>
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i.toString()}>
            {row.map((col, j) => (
              <td key={j.toString()} style={{ color: colors[col] }}>
                {'[]'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
