/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { NUMBER_OF_TOP_WORDS } from '../constants';
import { getTopWords, removeArticleMakerSignFromTitle } from '../utils';
import { keywordClass, contentClass } from '../style.css';

export function ResetSearchButton() {
  return <input type="button" onclick={() => performSearch('')} value="Reset search" />;
}

export function KeyWordButton(props) {
  const { word } = props;
  return (
    <input
      class={keywordClass}
      type="button"
      onclick={e => window.filterByKeyword(e.target.value)}
      value={word}
    />
  );
}

export function RefreshButton() {
  return (
    <input
      type="button"
      onclick={() => performSearch(window.dataStore.searchWord)}
      value="Refresh"
    />
  );
}

export function TopWordsButtons({ dataStore }) {
  const { articles, searchWord } = dataStore;
  if (!articles) {
    return '';
  }
  const wholeText = articles.reduce((acc, article) => {
    const { content, description, title } = article;
    return (acc += `${description} ${content} ${removeArticleMakerSignFromTitle(title)} `);
  }, '');
  const fewKeyWord = getTopWords(wholeText, NUMBER_OF_TOP_WORDS, searchWord);

  return (
    <div className={contentClass}>
      Filter result by most common word:
      <br />
      {fewKeyWord.map(word => (
        <KeyWordButton word={word} />
      ))}
    </div>
  );
}
