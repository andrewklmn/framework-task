import React from 'react';

import { useArticlesContext } from '../context';

import NewsItem from './NewsItem';
import { filterArticleByWord } from './../utils';
import { NUMBER_OF_SHOWED_NEWS_ITEMS } from './../constants';

export default function NewsList(props) {
  const { filterWord } = props;
  const articles = useArticlesContext();

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
