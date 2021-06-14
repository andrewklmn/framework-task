import React from 'react';
import classNames from 'classname'
import { contentClass } from '../style.css';

export default function ErrorWindow({ error }) {
  return (
    <div className={contentClass} style={{ color: 'red' }}> // TODO
      {error}
    </div>
  );
}
