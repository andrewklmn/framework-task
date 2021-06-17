import React from 'react';
import classNames from 'classnames';
import { contentClass, preloader } from './../style.css';
import preloaderImage from './../img/preloader.gif';

export default function Preloader() {
  return (
    <div className={classNames(contentClass, preloader)}>
      <img src={preloaderImage} alt="News image" />
    </div>
  );
}
