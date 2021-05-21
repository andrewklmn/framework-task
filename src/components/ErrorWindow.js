/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { contentClass } from '../style.css';

export default function ErrorWindow(text) {
  return (
    <div class={contentClass} style="color: red;">
      {text}
    </div>
  );
}
