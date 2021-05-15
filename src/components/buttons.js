import { NUMBER_OF_TOP_WORDS } from '../constants';
import { getTopWords, removeArticleMakerSignFromTitle } from '../utils';
import { keywordClass, contentClass } from '../style.css';

export function ResetSearchButton() {
  return `
    <input type="button" onclick="performSearch('');" value="Reset search"/>
  `;
}

export function KeyWordButton(word) {
  return `
    <input class="${keywordClass}" type="button" onclick="filterByKeyword(this.value);" value="${word}"/>
  `;
}

export function RefreshButton() {
  return `
    <input type="button" onclick="performSearch(window.dataStore.searchWord);" value="Refresh"/>
  `;
}

export function TopWordsButtons({ articles, searchWord }) {
  if (!articles) {
    return '';
  }
  const wholeText = articles.reduce((acc, article) => {
    const { content, description, title } = article;
    return (acc += `${description} ${content} ${removeArticleMakerSignFromTitle(title)} `);
  }, '');
  const threeWord = getTopWords(wholeText, NUMBER_OF_TOP_WORDS, searchWord);

  return `
    <div class="${contentClass}">
      Filter result by most common word:<br/>
      ${threeWord.map(word => `${KeyWordButton(word)}`).join('')}
    </div>
  `;
}
