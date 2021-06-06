import React from 'react';

import { contentClass } from './../style.css';
import preloaderImage from './../img/preloader.gif';

export default function Preloader() {
  return (
    <div className={contentClass} style={{ paddingTop: '50px' }}>
      <img src={preloaderImage} alt="News image" />
    </div>
  );
}
