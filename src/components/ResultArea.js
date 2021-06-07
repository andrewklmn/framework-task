import React from 'react';
import { useArticlesContext } from '../context';

import { containerClass } from './../style.css';
import { TopWordsButtons } from './../components/buttons';
import NewsList from './../components/NewsList';

export default function ResultArea(props) {
  const { filterWord, setFilterWord } = props;
  const articles = useArticlesContext();

  if (articles.length == 0) {
    return <div className={containerClass}>No news to show. Try to reduce search phrase...</div>;
  }

  return (
    <>
      <div className={containerClass}>
        <TopWordsButtons filterWord={filterWord} setFilterWord={setFilterWord} />
      </div>
      <div className={containerClass}>
        <NewsList filterWord={filterWord} />
      </div>
    </>
  );
}
