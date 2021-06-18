import React from 'react';
import classNames from 'classnames';
import styles from './Checkbox.css';

export default function Checkbox({ label = '', onChange = null }) {
  return (
    <label className={classNames(styles.check, styles.option)}>
      <input className={styles.check__input} type="checkbox" onChange={onChange} />
      <span className={styles.check__box}></span>
      {label}
    </label>
  );
}
