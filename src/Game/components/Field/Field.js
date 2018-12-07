import React from 'react';
import styles from './styles';

type Props = {
  field: Array<[]>,
};

/**
 * Field Component
 * @param {Props} props
 */
export default ({ field }: Props) => (
  <table className={styles.table}>
    <tbody>
      {field.map((row, i) => (
        <tr key={i}>
          {row.map((col, j) => (
          <td key={j}>
            {col ? '[' : '.'}
            {col ? ']' : '.'}
          </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
