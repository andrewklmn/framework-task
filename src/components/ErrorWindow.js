import React from 'react';
import classNames from 'classname';
import { contentClass, error } from '../style.css';

export default function ErrorWindow({ error }) {
  return <div className={classNames(contentClass, error)}>{error}</div>;
}
