import React from 'react';

import { newsItemClass, newsImageClass } from '../style.css';

export default function NewsItem({ article }) {
  const { title, urlToImage, description, url } = article;

  return (
    <div className={newsItemClass}>
      <h3>{title}</h3>
      {urlToImage ? (
        <img alt="Article illustration" className={newsImageClass} src={urlToImage} />
      ) : (
        ''
      )}
      <p>{description ? description : ''}</p>
      <a target="_blank" href={url}>
        Read more ...{' '}
      </a>
    </div>
  );
}
