import React from 'react';
import styles from './styles';

type Props = {
  matrix: Array<[]>,
  player: any,
};

/**
 * Field Component
 * @param {Props} props
 */
export default ({ matrix }: Props) => (
  <table className={styles.table}>
    <tbody>
      {matrix.map((row, i) => (
        <tr key={i}>
          {row.map((col, j) => (
            <td key={j}>
              {col ? '[]' : '..'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
