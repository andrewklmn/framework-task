import React from 'react';
import { useAppContext, useArticlesContext, useSettersContext } from '../context';
import { NUMBER_OF_TOP_WORDS, TIME_OF_LOADING_IMMITATION_MS } from '../constants';
import { getTopWords, removeArticleMakerSignFromTitle } from '../utils';
import { activeKeywordClass, keywordClass, contentClass, btn } from '../style.css';

export function ResetSearchButton() {
  const searchWord = useAppContext();
  const { setSearchWord, setFilterWord, setDataIsLoading } = useSettersContext();
  const handleClick = () => {
    if (searchWord !== '') {
      setDataIsLoading(true);
      setSearchWord('');
    }
    setFilterWord('');
  };

  return <input className={btn} type="button" onClick={handleClick} defaultValue="Reset search" />;
}

export function KeyWordButton({ word, active, setFilterWord }) {
  return (
    <input
      className={active ? activeKeywordClass : keywordClass}
      type="button"
      onClick={e => setFilterWord(e.target.value)}
      value={word}
    />
  );
}

export function RefreshButton() {
  const searchWord = useAppContext();
  const { setSearchWord, setFilterWord, setDataIsLoading } = useSettersContext();

  const handleClick = () => {
    setDataIsLoading(true);
    setFilterWord('');
    setSearchWord(searchWord);
    setDataIsLoading(false);
  };

  return <input className={btn} type="button" onClick={handleClick} value="Refresh" />;
}

export function TopWordsButtons({ filterWord, setFilterWord }) {
  const searchWord = useAppContext();
  const articles = useArticlesContext();

  if (!articles) {
    return '';
  }
  const wholeText = articles.reduce((acc, article) => {
    const { content, description, title } = article;
    return (acc += `${description} ${content} ${removeArticleMakerSignFromTitle(title)} `);
  }, '');
  const fewKeyWord = getTopWords(wholeText, searchWord);

  return (
    <div className={contentClass}>
      Filter result by most common word:
      <br />
      {fewKeyWord.map(word => (
        <KeyWordButton
          key={word}
          active={word === filterWord}
          word={word}
          setFilterWord={setFilterWord}
        />
      ))}
    </div>
  );
}
