import React from 'react';
import { colors } from '../../lib/tetrominos';
import styles from './styles';

type Props = {
  matrix: Array<[]>,
};

/**
 * Field Component
 * @param {Props} props
 */
export default ({ matrix }: Props) => (
  <table className={styles.table}>
    <tbody>
      {matrix.map((row, i) => (
        <tr key={i.toString()}>
          {row.map((col, j) => (
            <td key={j.toString()} style={{ color: colors[col] }}>
              {col ? '[]' : '..'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
