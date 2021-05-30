/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework/element';

import { NUMBER_OF_TOP_WORDS } from '../constants';
import { getTopWords, removeArticleMakerSignFromTitle } from '../utils';
import { keywordClass, contentClass } from '../style.css';

import filterByKeyword from '/./data/filterByKeyword';

export function ResetSearchButton(props) {
  const { searchWord, setSearchWord, filterWord, setFilterWord, setDataIsLoading } = props;

  const handleClick = () => {
    if (searchWord !== '') {
      setDataIsLoading(true);
      setFilterWord('');
      setSearchWord('');
    }

    if (filterWord !== '') {
      setFilterWord('');
    }
  };

  return <input type="button" onclick={handleClick} value="Reset search" />;
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
  const { searchWord, setSearchWord, setFilterWord } = props;
  const handleClick = () => {
    setFilterWord('');
    setSearchWord(searchWord);
  };

  return <input type="button" onclick={handleClick} value="Refresh" />;
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
