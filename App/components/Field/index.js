import React from 'react';
import { env } from '../../lib';
import styles from './styles';

const { colors, field } = env;

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
              {'[]'}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
