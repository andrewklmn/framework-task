import React from 'react';
import classNames from 'classnames';
import { contentClass, error } from '../style.css';

export default function ErrorWindow({ error }) {
  return <div className={classNames(contentClass, error)}>{error}</div>;
}
