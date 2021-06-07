import React from 'react';

import { contentClass } from '../style.css';

export default function ErrorWindow({ error }) {
  return (
    <div className={contentClass} style={{ color: 'red' }}>
      {error}
    </div>
  );
}
