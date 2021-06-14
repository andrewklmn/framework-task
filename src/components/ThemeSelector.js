import React from 'react';
import { containerClass, day, night } from './../style.css';
import Checkbox from './Checkbox';

export default function ThemeSelector() {
  const handleChangeTheme = ({ target }) => {
    if (target.checked) {
      document.body.className = night;
    } else {
      document.body.className = day;
    }
  };

  return (
    <div className={containerClass}>
      <Checkbox label='Night mode' onChange={handleChangeTheme} /> //TODO
    </div>
  );
}
