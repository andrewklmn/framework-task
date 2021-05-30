/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { NUMBER_OF_TOP_WORDS } from '../constants';
import { getTopWords, removeArticleMakerSignFromTitle } from '../utils';
import { keywordClass, contentClass } from '../style.css';

import performSearch from '../data/performSearch';
import filterByKeyword from '/./data/filterByKeyword';

export function ResetSearchButton(props) {
  const { setSearchWord } = props;
  return <input type="button" onclick={() => setSearchWord('')} value="Reset search" />;
}

export function KeyWordButton(props) {
  const { word, setFilterWord } = props;
  return (
    <input
      class={keywordClass}
      type="button"
      onclick={e => setFilterWord(e.target.value)}
      value={word}
    />
  );
}

export function RefreshButton(props) {
  const { searchWord, setSearchWord } = props;
  return <input type="button" onclick={() => setSearchWord(searchWord)} value="Refresh" />;
}

export function TopWordsButtons(props) {
  const { articles, searchWord, setFilterWord } = props;
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
        <KeyWordButton word={word} setFilterWord={setFilterWord} />
      ))}
    </div>
  );
}
