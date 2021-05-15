import NewsItem from './NewsItem';
import { filterArticleByWord } from './../utils';

export default function NewsList({ articles, filterWord, newsItemsToShow }) {
  const list = articles
    .filter(article => filterArticleByWord(article, filterWord))
    .splice(0, newsItemsToShow)
    .map(article => `${NewsItem(article)}`)
    .join('');

  return `
    ${list}
  `;
}
