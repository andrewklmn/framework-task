/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import NewsItem from './NewsItem';
import { filterArticleByWord } from './../utils';

export default function NewsList({ dataStore }) {
  const { articles, filterWord, newsItemsToShow } = dataStore;
  const list = articles
    .filter(article => filterArticleByWord(article, filterWord))
    .splice(0, newsItemsToShow);

  return (
    <>
      {list.map(article => (
        <NewsItem article={article} />
      ))}
    </>
  );
}
