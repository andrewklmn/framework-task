import React from 'react';
import { containerClass } from './../style.css';
import Checkbox from './Checkbox';

export default function ThemeSelector() {
  const handleChangeTheme = ({ target }) => {
    if (target.checked) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    } else {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    }
  };

  return (
    <div className={containerClass}>
      <Checkbox label={'Night mode'} onChange={handleChangeTheme} />
    </div>
  );
}
