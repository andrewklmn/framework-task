/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import NewsItem from './NewsItem';
import { filterArticleByWord } from './../utils';
import { NUMBER_OF_SHOWED_NEWS_ITEMS } from './../constants';

export default function NewsList(props) {
  const { articles, filterWord } = props;
  const list = articles
    .filter(article => filterArticleByWord(article, filterWord))
    .splice(0, NUMBER_OF_SHOWED_NEWS_ITEMS);

  return (
    <>
      {list.map(article => (
        <NewsItem article={article} />
      ))}
    </>
  );
}
