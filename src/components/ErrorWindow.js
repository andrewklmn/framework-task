import React from 'react';

import { contentClass } from '../style.css';

export default function ErrorWindow(text) {
  return (
    <div class={contentClass} style="color: red;">
      {text}
    </div>
  );
}
